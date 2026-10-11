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
| `/` | 主页：主窗口与独立便签、提醒、贴边方块组合展示 → 界面一览 → 产品特性 → 便签配色 → 快速开始 → 快捷键 → FAQ → CTA |
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
- **展示布局**：悬浮胶囊导航、居中 Hero、软件界面画廊、功能卡片、配色滚动条、账本风更新日志与双路径下载卡。Hero 沿用原有暖纸色窗口拼贴，包括浮动便签、提醒卡片和可沿边线拖动的方块。
- **产品同步基准**：MemeMomo WPF `86c3620`（2026-10-10，`v1.0.0`）。图标与便签配色同步自源项目；任务状态和六组全局快捷键集中维护在 `src/data/product.ts`。
- **软件界面**：`src/components/app-preview/` 使用 React 输出静态 HTML、内联 SVG 和 CSS，覆盖主窗口、六类设置、状态管理、回收站、提醒、独立便签与快速草稿。颜色、尺寸和图标参考原软件源码；正文复用截图工具里的示例内容。只有小尺寸应用图标使用图片，不加载整张界面截图，也不引入 Vue 或额外 UI 依赖。
- **展示与主题**：窗口内容不可操作；画廊标签、设置分类和配色按钮保留交互，标签支持方向键。默认跟随网站主题，手动选择画廊配色后单独生效，快速添加使用同一套主题变量。预览提供整体替代说明，不把静态控件加入键盘焦点序列。
- **窗口比例**：主窗口按 1080 × 720 逻辑像素绘制；视口不超过 639px 时，使用原软件 420 × 680 的紧凑布局。便签、草稿和提醒保持各自的原始比例。CSS 预留高度，`ResizeObserver` 只计算适配展示区的缩放值。

## 更新界面与参考截图

`tools/CaptureScreenshots/reference/` 保存原始 WPF 截图，供 HTML 组件校对使用；这些图片不进入 `public/`，也不会复制到生产构建。目录中的 `capture-manifest.json` 记录源码提交、截图时间和原始尺寸。`tools/CaptureScreenshots/` 调用应用自身的页面与主题，使用独立临时目录和示例内容，不读取个人笔记。重新截图需要 Windows 和 .NET 8 SDK。

```powershell
$appRepo = 'D:\EducationalData\c#\MemeMomo'
dotnet build tools/CaptureScreenshots/CaptureScreenshots.csproj "-p:MemeMomoProject=$appRepo/MemeMomo-wpf/MemeMomo.csproj"
$appCommit = git -C $appRepo rev-parse HEAD
dotnet tools/CaptureScreenshots/bin/Debug/net8.0-windows/MemeMomo.Wpf.Tests.dll tools/CaptureScreenshots/reference $appCommit
```

工具复用应用已有的内部界面访问声明，因此输出程序集名为 `MemeMomo.Wpf.Tests`；它只生成参考截图，不运行测试套件。软件界面变化后，对照截图更新 `src/components/app-preview/`，分类和尺寸维护在 `src/data/appPreviews.ts`。检查深浅主题、宽窄布局和画廊切换后运行 `npm run build`；浏览器网络面板应没有界面截图请求。

## 同步文档

`content/02.功能指南/` 与 `content/03.设置/` 从源项目 `doc/panel/`、`doc/setting/` 生成：

```powershell
node tools/sync-docs.mjs            # 源目录默认 'D:\EducationalData\c#\MemeMomo\doc'，可传参覆盖
```

脚本删除「返回目录」导航行、把篇章互链改写为站内 `/#/docs/...` 路由（按名称解析，源文档旧序号断链自动修复）、把 `../../MemeMomo-wpf/**` 源码链接指向 GitHub，未收录 `README.md` 目录页与 `快速使用.md`。`01.快速入门/` 与 `04.常见问题/` 为展示页原创内容，手工维护；幂等可重复运行。

## 结构

```
content/            文档篇章（01.快速入门 / 02.功能指南 / 03.设置 / 04.常见问题，每章一个 icon.svg）
tools/CaptureScreenshots/ Windows 截图生成工具与 reference/ 原始截图
tools/sync-docs.mjs  从源项目 doc/ 同步功能指南与设置篇章
src/
  components/       Navbar、Footer、Layout、AppWindow（主页拼贴）、app-preview/（静态 HTML 软件界面）、icons（内联 SVG）
  sections/         主页各区块：Hero / Features / Marquee / Showcase / QuickStart / Shortcuts / Faq / Cta
  routes/docs/      文档页（移植自 CodeCraft-ps：Docs / Sidebar / Toc / SearchModal + Markdown 渲染）
  routes/download/  下载页（原创设计）
  routes/changelog/ 更新日志页（原创设计）
  data/             版本数据、产品数据与界面预览配置
  lib/              site.ts（站点配置）、theme.ts（主题）、content/markdown/search（文档系统）、utils
  hooks/            useReveal（滚动显现）、useScrollSpy、usePageMeta
  styles/           tokens.css（设计令牌）、base.css（基础样式 + 页面过渡）
```

## 待办

- [ ] 更新日志页当前使用本地数据（`src/data/changelog.ts`）；仓库公开 Release 后可改接 GitHub Releases API
