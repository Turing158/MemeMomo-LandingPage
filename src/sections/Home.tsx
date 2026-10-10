// 主页：原单页展示（Hero → Features → Marquee → Showcase → QuickStart
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
      'MemeMomo 官方展示页。一款为 Windows 打造的桌面 Markdown 备忘录：便签弹窗、定时提醒、全局快捷键、贴边收起，数据全部保存在本机。.NET 8 + WPF。',
  })

  return (
    <main>
      <Hero />
      <Features />
      <Marquee />
      <Showcase />
      <QuickStart />
      <Shortcuts />
      <Faq />
      <Cta />
    </main>
  )
}
