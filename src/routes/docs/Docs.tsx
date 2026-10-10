// 文档页：三列正文（侧栏 / 正文 / 本页目录）。
// 侧栏与正文由 content/ 目录驱动：/docs/<章节路径> 定位到一篇 .md，
// 未指定或路径无效时自动落到第一篇；content/ 为空时显示引导空状态。
// 右侧“本页内容”目录跟随当前篇章的标题树。

import { Navigate, useParams } from 'react-router-dom'
import { cx } from '../../lib/utils'
import { useReveal } from '../../hooks/useReveal'
import { usePageMeta } from '../../hooks/usePageMeta'
import { CONTENT_PAGES, PAGE_BY_KEY, pageHref } from '../../lib/content'
import type { ContentPage } from '../../lib/content'
import Sidebar from './Sidebar'
import Article from './Article'
import Toc from './Toc'
import { IconFolder } from '../../components/icons'
import s from './Docs.module.css'

export default function Docs() {
  useReveal()
  usePageMeta({
    title: '文档 - MemeMomo',
    description:
      'MemeMomo 官方文档：安装与启动、写下第一条备忘录、Markdown 编辑、便签与提醒、贴边收起、托盘与全局快捷键、常见问题。',
  })

  const { '*': splat } = useParams()
  const selectedKey = splat ? splat.replace(/\/+$/, '') : null
  const page: ContentPage | undefined = selectedKey ? PAGE_BY_KEY.get(selectedKey) : undefined

  const columns = (current?: ContentPage) => (
    <div className={s.columns}>
      <Sidebar activePage={current} />
      {current ? (
        <Article page={current} />
      ) : (
        <main className={s.emptyMain}>
          <div className={s.empty}>
            <span className={s.emptyIcon}><IconFolder /></span>
            <h2 className={s.emptyTitle}>文档目录还是空的</h2>
            <p className={s.emptyText}>
              在项目根目录的 <code>content/</code> 里添加 <code>.md</code> 篇章即可出现在左侧导航：
              支持文件夹套文件夹的多级目录，目录里放一个 <code>icon.*</code> 文件（如 icon.svg）就是该目录的图标。
            </p>
          </div>
        </main>
      )}
      <Toc page={current} />
    </div>
  )

  // content/ 没有任何篇章：留在空状态，不做跳转
  if (!CONTENT_PAGES.length) {
    return (
      <div className={s.page}>
        <div className={cx('container', s.container)}>{columns()}</div>
      </div>
    )
  }

  // 未指定章节或路径无效：自动落到第一篇（或就近可用的第一篇）
  if (!page) return <Navigate to={pageHref(CONTENT_PAGES[0])} replace />

  return (
    <div className={s.page}>
      <div className={cx('container', s.container)}>{columns(page)}</div>
    </div>
  )
}
