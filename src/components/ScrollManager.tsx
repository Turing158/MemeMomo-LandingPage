// 路由切换的全局副作用：
// 1. 路径变化 → 瞬时回到顶部（布局期执行，View Transitions 截取新页快照前就已就位）
// 2. hash 变化 → 滚动到对应锚点（留出固定导航高度）
// 注意：HashRouter 下 useLocation().hash 是路由 hash（/#/docs#faq 的第二段），
// 跨页锚点（/#faq）需要等新页面挂载完成后再定位，用双 rAF + 兜底重试。
// 由 Layout 挂载，随路由树常驻。

import { useLayoutEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

export default function ScrollManager() {
  const { pathname, hash } = useLocation()
  const navType = useNavigationType()

  useLayoutEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      let tries = 0
      let timer: number | undefined
      const scrollToAnchor = () => {
        const el = document.getElementById(id)
        if (el) {
          window.scrollTo({ top: el.offsetTop - 88, behavior: 'smooth' })
        } else if (tries++ < 10) {
          // 目标还没渲染出来（页面切换中），下一帧再试
          timer = requestAnimationFrame(scrollToAnchor)
        }
      }
      const raf = requestAnimationFrame(scrollToAnchor)
      return () => {
        cancelAnimationFrame(raf)
        if (timer !== undefined) cancelAnimationFrame(timer)
      }
    }
    // 无锚点的路由切换（含 POP 回退）瞬时回顶；html 的 scroll-behavior: smooth 会让
    // scrollTo(0, 0) 变成滚动动画，切页时显式 instant 避免"旧滚动位置平滑上滑"的闪跳
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash, navType])

  return null
}
