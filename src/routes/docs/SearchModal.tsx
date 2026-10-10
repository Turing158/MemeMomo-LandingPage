// 文档搜索弹窗：侧栏搜索按钮或 Ctrl/⌘+K 唤起，检索全部篇章（小节级命中 + 片段预览）。
// ↑↓ 选择、Enter 打开、Esc 关闭；命中项跳转对应篇章，带锚点时等新页面渲染完成后平滑定位。

import { useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { pageHref } from '../../lib/content'
import { searchDocs } from '../../lib/search'
import type { SearchHit } from '../../lib/search'
import { scrollToHeading } from '../../hooks/useScrollSpy'
import { cx } from '../../lib/utils'
import { IconSearch, IconX, IconFolder } from '../../components/icons'
import s from './SearchModal.module.css'

const MAX_RESULTS = 30

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** 命中词高亮：按查询词切分文本，命中片段包 <mark> */
function highlight(text: string, tokens: string[]): ReactNode {
  if (!tokens.length) return text
  const re = new RegExp(`(${tokens.map(escapeRegExp).join('|')})`, 'gi')
  return text.split(re).map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className={s.mark}>
        {part}
      </mark>
    ) : (
      part
    )
  )
}

/** 跨页跳转后正文随路由重挂载，rAF 重试等标题渲染出来再定位（同 ScrollManager 锚点思路） */
function scrollWhenReady(id: string) {
  let tries = 0
  const step = () => {
    if (document.getElementById(id)) {
      scrollToHeading(id, 96)
      return
    }
    if (tries++ < 20) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const tokens = useMemo(() => query.trim().toLowerCase().split(/\s+/).filter(Boolean), [query])
  const results = useMemo(() => searchDocs(query, MAX_RESULTS), [query])

  // 每次打开重置关键词与选中项；锁定正文滚动并聚焦输入框
  useEffect(() => {
    if (!open) return
    setQuery('')
    setActive(0)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    inputRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // 查询变化后选中项复位、结果区回顶
  useEffect(() => {
    setActive(0)
    listRef.current?.scrollTo({ top: 0 })
  }, [query])

  // Esc 全局可关（焦点不在输入框时输入框自身的监听收不到）
  useEffect(() => {
    if (!open) return
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // 键盘/悬停切换选中行后，让选中行保持在可视区内
  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  if (!open) return null

  const select = (hit: SearchHit) => {
    onClose()
    const href = pageHref(hit.page)
    if (pathname !== href) navigate(href)
    if (hit.slug) scrollWhenReady(hit.slug)
  }

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const hit = results[active]
      if (hit) select(hit)
    }
  }

  return createPortal(
    <div
      className={s.overlay}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={s.panel} role="dialog" aria-modal="true" aria-label="搜索文档">
        <div className={s.searchRow}>
          <IconSearch className={s.searchIcon} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="搜索文档..."
            aria-label="搜索文档"
            aria-controls="doc-search-list"
            aria-activedescendant={results[active] ? `doc-search-opt-${active}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <button type="button" className={s.closeBtn} onClick={onClose} aria-label="关闭搜索">
            <IconX />
          </button>
        </div>
        <div className={s.results} ref={listRef} id="doc-search-list" role="listbox" aria-label="搜索结果">
          {query.trim() ? (
            results.length ? (
              results.map((hit, i) => (
                <button
                  key={`${hit.page.path.join('/')}-${hit.slug ?? 'top'}-${i}`}
                  type="button"
                  role="option"
                  id={`doc-search-opt-${i}`}
                  data-index={i}
                  aria-selected={i === active}
                  className={cx(s.row, i === active && s.rowActive)}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => select(hit)}
                >
                  <span className={s.rowTitle}>{highlight(hit.title, tokens)}</span>
                  {hit.snippet && <span className={s.rowSnippet}>{highlight(hit.snippet, tokens)}</span>}
                  <span className={s.rowCrumb}>
                    <IconFolder className={s.rowCrumbIcon} />
                    <span className={s.rowCrumbText}>{hit.crumb}</span>
                  </span>
                </button>
              ))
            ) : (
              <p className={s.empty}>没有找到与 “{query.trim()}” 相关的内容</p>
            )
          ) : (
            <p className={s.empty}>输入关键词，搜索全部文档的标题与正文</p>
          )}
        </div>
        <div className={s.footer}>
          <span className={s.hintItem}>
            <kbd>↑</kbd>
            <kbd>↓</kbd> 选择
          </span>
          <span className={s.hintItem}>
            <kbd>↵</kbd> 打开
          </span>
          <span className={s.hintItem}>
            <kbd>Esc</kbd> 关闭
          </span>
        </div>
      </div>
    </div>,
    document.body
  )
}
