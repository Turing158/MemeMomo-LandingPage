import { useEffect, useState } from 'react'

/**
 * 滚动到某标题附近时高亮对应条目（docs 目录 / changelog 版本列表共用）。
 * ids 为标题 id 数组；offset 为滚动补偿像素。
 *
 * 用 rAF 帧循环比较 scrollY，而不是监听 scroll 事件：
 * 部分内嵌 webview 不向 window/document 派发 scroll 事件，帧循环在所有环境都可靠，
 * 且 offsetTop 读取在布局干净时开销极小。
 */
export function useScrollSpy(ids: string[], offset: number): string {
  const [active, setActive] = useState(ids[0] ?? '')
  const key = ids.join(',')

  useEffect(() => {
    const els = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (!els.length) return

    const compute = () => {
      const pos = window.scrollY + offset
      let cur = els[0]
      els.forEach((el) => {
        if (el.offsetTop <= pos) cur = el
      })
      setActive(cur.id)
    }
    // 挂载/切换篇章时先同步算一次，高亮即刻正确
    compute()

    let raf = 0
    let lastPos = window.scrollY + offset
    const tick = () => {
      const pos = window.scrollY + offset
      if (pos !== lastPos) {
        lastPos = pos
        compute()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [key, offset])

  return active
}

/** 平滑滚动到指定标题，留出固定导航高度 */
export function scrollToHeading(id: string, offset = 96): void {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' })
}
