// 文档页右侧目录（xl 起显示）：跟随当前篇章的标题树，竖向进度线 + 滚动高亮 + 回到顶部。
// 样式只有两级：树顶层级用一级样式（加粗），第二层用二级样式，
// 更深的等级沿用二级样式，文字前挂一个方形 hN 标签标明真实等级。

import { useCallback, useEffect, useMemo, useRef } from 'react'
import type { CSSProperties } from 'react'
import type { ContentPage } from '../../lib/content'
import { extractHeadings } from '../../lib/markdown'
import { useScrollSpy, scrollToHeading } from '../../hooks/useScrollSpy'
import { IconListTree, IconArrowUp } from '../../components/icons'
import { cx } from '../../lib/utils'
import s from './Toc.module.css'

/** 缩进最大步数：再深的层级靠 hN 标签区分，不再继续右移 */
const MAX_INDENT = 4

export default function Toc({ page }: { page?: ContentPage }) {
  // 归一化：篇章没有一级标题时，树顶层级（如二级）顶替一级样式；
  // norm 为归一化后的层级（1 = 树顶），超过 2 即挂 hN 标签
  const rows = useMemo(() => {
    const heads = page ? extractHeadings(page.raw) : []
    const top = heads.length ? Math.min(...heads.map((h) => h.level)) : 1
    return heads.map((h) => {
      const norm = h.level - top + 1
      return { ...h, norm, badge: norm > 2 ? `h${h.level}` : null }
    })
  }, [page])

  const ids = rows.map((r) => r.slug)
  const active = useScrollSpy(ids, 120)
  const activeIndex = Math.max(0, ids.indexOf(active))
  const navRef = useRef<HTMLElement>(null)

  // 进度线的几何完全按节点圆的真实位置量取：轨道线从首个圆心贯穿到末个圆心，
  // 蓝色填充线的终点精确落在当前激活条目的圆心上。条目高度不均（换行、分组间距），
  // 无法用百分比推算，所以逐个 getBoundingClientRect 实测。
  const measure = useCallback(() => {
    const nav = navRef.current
    if (!nav || nav.offsetParent === null) return
    const dots = Array.from(nav.querySelectorAll<HTMLElement>(`.${s.dot}`))
    if (!dots.length) return
    const navTop = nav.getBoundingClientRect().top
    const centers = dots.map((d) => {
      const r = d.getBoundingClientRect()
      return r.top + r.height / 2 - navTop
    })
    const first = centers[0]
    const last = centers[centers.length - 1]
    const fill = centers[Math.min(activeIndex, centers.length - 1)]
    nav.style.setProperty('--toc-line-top', `${first}px`)
    nav.style.setProperty('--toc-line-h', `${Math.max(0, last - first)}px`)
    nav.style.setProperty('--toc-fill-h', `${Math.max(0, fill - first)}px`)
  }, [activeIndex])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    measure()
    // 条目换行、字体加载等导致 nav 尺寸变化时重新量取
    const ro = new ResizeObserver(measure)
    ro.observe(nav)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  return (
    <div className={s.wrap}>
      <div className={s.sticky}>
        <nav className={s.nav} ref={navRef} aria-label="本页内容">
          <h4 className={s.title}>
            <IconListTree className={s.titleIcon} />
            本页内容
          </h4>
          {rows.length ? (
            <ul className={s.list}>
              {rows.map((r) => (
                <li
                  key={r.slug}
                  className={cx(s.entry, r.norm === 1 && s.groupStart)}
                  style={{ '--lvl': Math.min(r.norm, MAX_INDENT) } as CSSProperties}
                >
                  <span className={cx(s.dot, active === r.slug && s.dotActive)} aria-hidden="true" />
                  <button
                    type="button"
                    className={cx(s.entryBtn, r.norm === 1 && s.entryLv1, active === r.slug && s.entryActive)}
                    onClick={() => scrollToHeading(r.slug, 96)}
                  >
                    {r.badge && <span className={s.badge}>{r.badge}</span>}
                    {r.text}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={s.none}>本页暂无标题</p>
          )}
        </nav>
        <button type="button" className={s.backTop} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <IconArrowUp className={s.backTopIcon} />
          回到顶部
        </button>
      </div>
    </div>
  )
}
