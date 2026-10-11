// 站点内容配置：仓库地址、命令、数据路径等集中在这里维护。

export const SITE = {
  name: 'MemeMomo',
  tagline: '贴在桌面上的轻量 Markdown 备忘录',
  description:
    '支持任务状态、快速新建、回收站、便签弹窗和定时提醒 · 为 Windows 打造',
  // 项目公开仓库地址
  repoUrl: 'https://github.com/Turing158/MemeMomo',
  version: 'v1.0.0',
  stack: ['.NET 8', 'WPF', 'C#'],
  runCommand: 'dotnet run --project MemeMomo-wpf/MemeMomo.csproj',
  storagePath: '%AppData%/MemeMomo/',
} as const

// 与 WPF MemoWindowPalette.Options 同步（86c3620，2026-10-10）。
export const MEMO_COLORS = [
  { name: '跟随主题', bg: '#f6f3ec', dot: '#c06a48', capture: 'note-followtheme' },
  { name: '炭黑', bg: '#202225', dot: '#8fafd5', capture: 'note-charcoal' },
  { name: '米白', bg: '#f5f1e8', dot: '#c9b48f', capture: 'note-paper' },
  { name: '雾蓝', bg: '#e9f0f6', dot: '#7d97b8', capture: 'note-mistblue' },
  { name: '鼠尾草绿', bg: '#eaf0e8', dot: '#7ba288', capture: 'note-sage' },
  { name: '浅玫瑰', bg: '#f5eaec', dot: '#c98a8a', capture: 'note-rose' },
  { name: '淡紫', bg: '#eeecf6', dot: '#9c88bb', capture: 'note-lavender' },
  { name: '暖沙', bg: '#f6efdd', dot: '#c8a06a', capture: 'note-sand' },
] as const
