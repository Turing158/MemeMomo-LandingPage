# 基础 HTML 显示

编辑器可显示部分 HTML 标签及内联样式，并保留原始源码。通过“编辑源码”输入或调整 HTML，应用后继续遵循当前备忘录的保存规则。

## 支持的常用内容

| 内容 | 示例或范围 |
| --- | --- |
| 文字强调 | `b/strong`、`i/em`、`s/del/strike`、`u/ins`、`mark` |
| 字号与上下标 | `small`、`big`、`sub`、`sup`，以及 `font-size` |
| 文字样式 | `span`、`font` 等支持的容器中的颜色、背景色、字体、字重、斜体和文字装饰 |
| 段落与对齐 | `p`、`div`、`center` 等容器；支持的 `align` 或 `text-align` |
| 标题、引用和代码 | `h1`–`h6`（后三种使用 H4 级别外观）、`blockquote`、`code`、`pre` |
| 列表 | `ul`、`ol`、`li`；有序列表可使用起始值、编号类型和倒序属性 |
| 链接 | `a href`，打开地址仍按应用允许的协议校验 |
| 图片 | `img src/alt/title`，以及支持的宽度、高度和百分比宽度 |
| 换行、分隔线与实体 | `br`、`hr`、`&amp;` 等实体 |

例如在源码中输入：

```html
<p style="text-align:center;color:#336699;font-size:20px">项目进度</p>
<p><mark>今天确认</mark>，记录 H<sub>2</sub>O 与 x<sup>2</sup>。</p>
<img src="assets/example.png" alt="本地示例" width="50%">
```

示例图片路径需替换为实际存在的资产路径；网络图片使用 HTTPS 地址。编辑单张图片可用[图片编辑对话框](/#/docs/功能指南/图片编辑对话框)，代码语言可用[代码语言对话框](/#/docs/功能指南/代码语言对话框)。

## 范围与限制

这是 Markdown 编辑器中的有限显示支持，不是浏览器。不会执行脚本，也不支持完整网页、外部样式表、布局框架或任意 CSS；不受支持的标签、属性和样式不保证按网页效果显示。HTML 表格不替代现有的 Markdown 表格编辑功能。

基础样式映射到本地文字和控件；颜色、字体和尺寸仍受可用字体、窗口宽度及支持规则影响。应用源码前可保留副本，需要完整网页排版时使用浏览器或网页编辑工具。

回收站预览沿用这些显示规则，但内容只读。

## 核对源码

[标签与属性校验](https://github.com/Turing158/MemeMomo/blob/main/MemeMomo-wpf/Markdown/MarkdownDocumentModel.cs)、[HTML 解析](https://github.com/Turing158/MemeMomo/blob/main/MemeMomo-wpf/Markdown/MarkdownDocumentModel.Html.cs)、[样式解释](https://github.com/Turing158/MemeMomo/blob/main/MemeMomo-wpf/Markdown/HtmlPresentation.cs)、[文字呈现](https://github.com/Turing158/MemeMomo/blob/main/MemeMomo-wpf/Editor/HtmlTextStyle.cs)、[段落对齐](https://github.com/Turing158/MemeMomo/blob/main/MemeMomo-wpf/Editor/HtmlAlignmentLayout.cs)。
