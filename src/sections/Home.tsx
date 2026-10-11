// 主页：软件界面与产品能力（Hero → Showcase → Features → Marquee → QuickStart
//   → Shortcuts → Faq → Cta），作为站点的 index 路由。

import { useReveal } from '../hooks/useReveal'
import { usePageMeta } from '../hooks/usePageMeta'
import Hero from './Hero'
import Features from './Features'
import Marquee from './Marquee'
import Showcase from './Showcase'
import QuickStart from './QuickStart'
import Shortcuts from './Shortcuts'
import Faq from './Faq'
import Cta from './Cta'

export default function Home() {
  useReveal()
  usePageMeta({
    title: 'MemeMomo - 贴在桌面上的轻量 Markdown 备忘录',
    description:
      'MemeMomo 官方展示页。为 Windows 打造的桌面 Markdown 备忘录：任务状态、快速新建、回收站、便签提醒、双栏工作区与贴边收起。数据保存在本机。',
  })

  return (
    <main>
      <Hero />
      <Showcase />
      <Features />
      <Marquee />
      <QuickStart />
      <Shortcuts />
      <Faq />
      <Cta />
    </main>
  )
}
