// 全站共享布局：固定导航 + 页面出口 + 页脚。
// 页面组件只管自己的 <main>，导航/页脚/滚动恢复在这里统一挂载。

import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollManager from './ScrollManager'

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <ScrollManager />
      <Navbar />
      {/* key 随路径重挂载页面容器：驱动不支持 View Transitions 浏览器的兜底入场动画 */}
      <div className="page-outlet" key={pathname}>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
