# MemeMomo-ps · MemeMomo 项目展示站

为 **[MemeMomo](D:\EducationalData\c#\MemeMomo)**（WPF + C# 桌面 Markdown 备忘录）制作的官方风格展示站。

技术栈与 `CodeCraft-ps` 同构：**Vite + React 19 + TypeScript + CSS Modules + HashRouter**（纯前端 SPA，构建产物可静态托管）。

## 快速开始

```powershell
npm install
npm run dev        # 开发服务器
npm run build      # 产出 dist/（base: './'，可直接静态打开）
npm run preview    # 预览构建产物
```

## 页面

| 路由 | 说明 |
| --- | --- |
| `/` | 主页：Hero（应用窗口拼贴）→ 特性 Bento → 配色跑马灯 → 界面一览 → 快速开始 → 快捷键 → FAQ → CTA |
| `/docs/*` | 文档：`content/` 目录驱动的多篇章文档（侧栏 + Ctrl/⌘K 搜索 + 本页目录 + 上下篇），实现与 CodeCraft-ps 一致 |
| `/download` | 下载：双路径卡片（发布版 / 源码运行）+ 运行环境 + 帮助行 |
| `/changelog` | 更新日志：账本收据风版本卡（新增/改进/修复分组）+ 规划中便签墙 |

## 设计说明

- **主题：「暖纸 × 陶土」** —— 与 CodeCraft-ps 的冷蓝体系刻意区分：
  - 浅色 = 温暖米纸底（HSL 41°）+ 陶土橙强调（HSL 19°，取自应用真实 AccentPrimary `#C06A48`）
  - 深色 = 暖夜棕黑底（HSL 22°）+ 提亮陶土
  - 便利贴琥珀（44°）作荧光笔划线与装饰，鼠尾草绿作成功/勾选色
- **字体**：Nunito（圆润亲和，区别于 Inter）+ JetBrains Mono（键位/代码）
- **深浅双主题 + 跟随系统**：`src/lib/theme.ts`，localStorage 持久化，`index.html` 内联脚本防首帧闪烁
- **布局差异化**（文档页除外，按需求与 CodeCraft-ps 一致）：悬浮胶囊导航、居中 Hero + 窗口拼贴、Bento 网格、账本收据风更新日志、双路径下载卡，均为独立设计，不与 CodeCraft-ps 的元素/布局重复
- **应用界面复刻**：主页窗口拼贴与设置窗口复刻均按 WPF 真实实现（`MainWindow.xaml` 尺寸、`ThemePreferences` 调色板、真实截图排版）还原

## 结构

```
content/            文档篇章（01.快速入门 / 02.功能指南 / 03.设置 / 04.常见问题，每章一个 icon.svg）
src/
  components/       Navbar、Footer、Layout、AppWindow（应用窗口复刻）、icons（内联 SVG）
  sections/         主页各区块：Hero / Features / Marquee / Showcase / QuickStart / Shortcuts / Faq / Cta
  routes/docs/      文档页（移植自 CodeCraft-ps：Docs / Sidebar / Toc / SearchModal + Markdown 渲染）
  routes/download/  下载页（原创设计）
  routes/changelog/ 更新日志页（原创设计）
  data/             changelog.ts（版本数据）
  lib/              site.ts（站点配置）、theme.ts（主题）、content/markdown/search（文档系统）、utils
  hooks/            useReveal（滚动显现）、useScrollSpy、usePageMeta
  styles/           tokens.css（设计令牌）、base.css（基础样式 + 页面过渡）
```

## 待办

- [ ] 更新日志页当前使用本地数据（`src/data/changelog.ts`）；仓库公开 Release 后可改接 GitHub Releases API
