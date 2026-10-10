// 站点内容配置：仓库地址、命令、数据路径等集中在这里维护。

export const SITE = {
  name: 'MemeMomo',
  tagline: '贴在桌面上的轻量 Markdown 备忘录',
  description:
    '支持便签弹窗、定时提醒、全局快捷键和贴边收起 · 为 Windows 打造',
  // 项目公开仓库地址
  repoUrl: 'https://github.com/Turing158/MemeMomo',
  version: 'v0.0.1',
  stack: ['.NET 8', 'WPF', 'C#'],
  runCommand: 'dotnet run --project MemeMomo-wpf/MemeMomo.csproj',
  storagePath: '%AppData%/MemeMomo/',
} as const

export const MEMO_COLORS = [
  { name: '跟随主题', bg: '#f6f3ec', dot: '#c06a48' },
  { name: '炭黑', bg: '#23262a', dot: '#8fafd5' },
  { name: '米白', bg: '#f7f3ea', dot: '#c9b48f' },
  { name: '雾蓝', bg: '#e3e9f0', dot: '#7d97b8' },
  { name: '鼠尾草绿', bg: '#e5ede6', dot: '#7ba288' },
  { name: '浅玫瑰', bg: '#f3e4e4', dot: '#c98a8a' },
  { name: '淡紫', bg: '#eae4f1', dot: '#9c88bb' },
  { name: '暖沙', bg: '#f2e9d8', dot: '#c8a06a' },
] as const
