// 数据路由（createHashRouter）：dist 可直接静态打开；
// 路由切换用 viewTransition 驱动页面过渡（动画见 base.css）。

import { Navigate, createHashRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './sections/Home'

function RouteLoading() {
  return <main className="route-loading" role="status">正在打开页面…</main>
}

export const router = createHashRouter([
  {
    element: <Layout />,
    HydrateFallback: RouteLoading,
    children: [
      { index: true, element: <Home /> },
      // docs/*：splat 为 content/ 里的章节路径，如 /docs/快速入门/安装与启动
      { path: 'docs/*', lazy: async () => ({ Component: (await import('./routes/docs/Docs')).default }) },
      { path: 'download', lazy: async () => ({ Component: (await import('./routes/download/Download')).default }) },
      { path: 'changelog', lazy: async () => ({ Component: (await import('./routes/changelog/Changelog')).default }) },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
