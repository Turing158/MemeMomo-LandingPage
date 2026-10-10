// 文档页侧边栏：搜索（Ctrl/⌘+K 唤起弹窗）+ 依据 content/ 目录树生成的多级折叠导航。
// 目录 = 可折叠分组（icon.* 是目录图标，没有则用后备文件夹图标），.md = 可选择篇章，
// 选中态由当前路由（/docs/<章节路径>）决定。条目点击后跳转对应路由。
// 页内锚点统一走 scrollToHeading（HashRouter 下裸 #id 会被当成路由跳转）。

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { cx } from '../../lib/utils'
import { CONTENT_TREE, pageHref, pageKey } from '../../lib/content'
import type { ContentFolder, ContentNode, ContentPage } from '../../lib/content'
import { IconSearch, IconChevronRight, IconFolder } from '../../components/icons'
import SearchModal from './SearchModal'
import s from './Sidebar.module.css'

/** 目录图标：icon.svg 内联（跟随主题色）→ icon.<其他> 图片 → 后备文件夹图标 */
function FolderIcon({ folder }: { folder: ContentFolder }) {
  if (folder.iconSvg) {
    return (
      <span
        className={s.groupIconSvg}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: folder.iconSvg }}
      />
    )
  }
  if (folder.iconUrl) {
    return <img src={folder.iconUrl} alt="" className={s.groupIconImg} />
  }
  return <IconFolder />
}

// 折叠状态存模块级（以目录路径为键）：Layout 以 pathname 为 key 重挂载整页驱动入场动画兜底，
// 每次选篇都会重挂载侧栏；组件内 useState 会复位成顶层默认展开，导致“选任意篇章全部展开”。
const expandedFolders = new Map<string, boolean>()

function containsKey(folder: ContentFolder, key: string | null): boolean {
  return folder.children.some((c) =>
    c.type === 'folder' ? containsKey(c, key) : pageKey(c.page) === key
  )
}

/** 折叠动画：高度 auto → 0 → 目标值 → auto */
function animateCollapse(el: HTMLDivElement, open: boolean) {
  if (open) {
    el.style.height = 'auto'
    const h = `${el.scrollHeight}px`
    el.style.height = '0px'
    void el.offsetHeight
    el.style.height = h
    const settle = () => {
      el.style.height = 'auto'
      el.removeEventListener('transitionend', settle)
    }
    el.addEventListener('transitionend', settle)
  } else {
    el.style.height = `${el.scrollHeight}px`
    void el.offsetHeight
    el.style.height = '0px'
  }
}

function NavFolder({
  folder,
  depth,
  activeKey,
}: {
  folder: ContentFolder
  depth: number
  activeKey: string | null
}) {
  const hasActive = containsKey(folder, activeKey)
  const pathKey = folder.path.join('/')
  // 顶层默认展开；嵌套目录收起，但当前篇章所在路径自动展开；用户开合过的目录沿用记录
  const [open, setOpen] = useState(
    () => expandedFolders.get(pathKey) ?? (depth === 0 || hasActive)
  )
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hasActive) {
      expandedFolders.set(pathKey, true)
      setOpen(true)
    }
  }, [activeKey, hasActive, pathKey])

  const toggle = () => {
    const el = itemsRef.current
    const next = !open
    expandedFolders.set(pathKey, next)
    setOpen(next)
    if (el) animateCollapse(el, next)
  }

  return (
    <div className={cx(s.group, open && s.groupOpen)}>
      <button
        type="button"
        className={cx(s.groupToggle, hasActive && s.groupToggleActive)}
        aria-expanded={open}
        onClick={toggle}
      >
        <span className={s.groupIcon}>
          <FolderIcon folder={folder} />
        </span>
        <span className={s.groupLabel}>{folder.name}</span>
        <span className={s.groupCount}>{folder.pageCount}</span>
        <IconChevronRight className={s.groupChevron} />
      </button>
      <div className={s.groupItems} ref={itemsRef}>
        <div className={s.groupItemsInner}>
          {folder.children.map((child) => (
            <NavNode key={nodeKey(child)} node={child} depth={depth + 1} activeKey={activeKey} />
          ))}
        </div>
      </div>
    </div>
  )
}

function NavPage({ page, activeKey }: { page: ContentPage; activeKey: string | null }) {
  const key = pageKey(page)
  const active = key === activeKey
  return (
    <Link
      to={pageHref(page)}
      className={cx(s.item, active && s.itemActive)}
      aria-current={active ? 'page' : undefined}
    >
      <span className={s.itemMark} aria-hidden="true" />
      {page.name}
    </Link>
  )
}

function NavNode({ node, depth, activeKey }: { node: ContentNode; depth: number; activeKey: string | null }) {
  return node.type === 'folder' ? (
    <NavFolder folder={node} depth={depth} activeKey={activeKey} />
  ) : (
    <NavPage page={node.page} activeKey={activeKey} />
  )
}

/** 按平台显示快捷键提示：Mac 用 ⌘K，其余用 Ctrl K */
function useSearchKbdLabel(): string {
  const [label, setLabel] = useState('Ctrl K')
  useEffect(() => {
    setLabel(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? '⌘K' : 'Ctrl K')
  }, [])
  return label
}

function nodeKey(node: ContentNode): string {
  return node.type === 'folder' ? `f:${node.path.join('/')}` : `p:${pageKey(node.page)}`
}

/** Layout 以 pathname 为 key 重挂载整页：卸载时 DOM 已分离、scrollTop 读数为 0，
 *  因此用 scroll 监听在滚动过程中持续记录位置，挂载时再恢复。 */
let savedCardScrollTop = 0

export default function Sidebar({ activePage }: { activePage?: ContentPage }) {
  const activeKey = activePage ? pageKey(activePage) : null
  const [searchOpen, setSearchOpen] = useState(false)
  const kbdLabel = useSearchKbdLabel()
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    if (savedCardScrollTop > 0) card.scrollTop = savedCardScrollTop
    const onScroll = () => {
      savedCardScrollTop = card.scrollTop
    }
    card.addEventListener('scroll', onScroll, { passive: true })
    return () => card.removeEventListener('scroll', onScroll)
  }, [])

  // Ctrl/⌘+K 开关搜索弹窗（侧栏只在 /docs 渲染，故快捷键仅文档页生效）
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className={s.wrap}>
      <div className={s.card} ref={cardRef}>
        <button type="button" className={s.search} onClick={() => setSearchOpen(true)}>
          <IconSearch className={s.searchIcon} />
          <span className={s.searchLabel}>搜索文档...</span>
          <kbd className={s.searchKbd}>{kbdLabel}</kbd>
        </button>
        <aside className={s.aside}>
          <nav className={s.nav} aria-label="文档篇章">
            {CONTENT_TREE.map((node) => (
              <NavNode key={nodeKey(node)} node={node} depth={0} activeKey={activeKey} />
            ))}
          </nav>
        </aside>
      </div>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
