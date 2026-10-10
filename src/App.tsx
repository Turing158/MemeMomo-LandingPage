// 数据路由（createHashRouter）：dist 可直接静态打开；
// 路由切换用 viewTransition 驱动页面过渡（动画见 base.css）。

import { Navigate, createHashRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './sections/Home'
import Docs from './routes/docs/Docs'
import Download from './routes/download/Download'
import Changelog from './routes/changelog/Changelog'

export const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      // docs/*：splat 为 content/ 里的章节路径，如 /docs/快速入门/安装与启动
      { path: 'docs/*', element: <Docs /> },
      { path: 'download', element: <Download /> },
      { path: 'changelog', element: <Changelog /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
