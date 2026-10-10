// 文档页正文：渲染当前选中的 content/ 篇章（markdown），底部为上一篇/下一篇切换。

import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { neighbors, pageHref, pageKey } from '../../lib/content'
import type { ContentPage } from '../../lib/content'
import { renderMarkdown } from '../../lib/markdown'
import { IconSquarePen, IconChevronLeft, IconChevronRight } from '../../components/icons'
import { GITHUB_URL, cx } from '../../lib/utils'
import s from './Article.module.css'
import m from './Md.module.css'

export default function Article({ page }: { page: ContentPage }) {
  const html = useMemo(() => renderMarkdown(page.raw), [page.raw])
  const { prev, next } = neighbors(page)

  // key 随篇章变化 → 切换时重挂载，避免上一篇的 DOM 残留
  return (
    <main className={s.main}>
      <article key={pageKey(page)} className={cx(s.article, m.md)}>
        <div className={s.body} dangerouslySetInnerHTML={{ __html: html }} />

        <div className={s.footer}>
          <div className={s.metaRow}>
            <div className={s.metaLeft}>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={s.editLink}>
                <IconSquarePen className={s.icon4} />
                编辑此页面
              </a>
            </div>
          </div>
          <div className={s.pager}>
            {prev ? (
              <Link to={pageHref(prev)} className={cx(s.pagerCard, s.pagerPrev)}>
                <span className={s.pagerLabel}>
                  <IconChevronLeft className={s.icon4} />
                  上一篇
                </span>
                <span className={s.pagerTitle}>{prev.name}</span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
            {next ? (
              <Link to={pageHref(next)} className={cx(s.pagerCard, s.pagerNext)}>
                <span className={s.pagerLabel}>
                  下一篇
                  <IconChevronRight className={s.icon4} />
                </span>
                <span className={s.pagerTitle}>{next.name}</span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
          </div>
        </div>
      </article>
    </main>
  )
}
