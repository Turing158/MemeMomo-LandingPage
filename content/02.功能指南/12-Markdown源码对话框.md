# Markdown 源码对话框

## 入口与用途

点击编辑器工具栏的 `MD`，或“更多格式 → 编辑源码”。此窗口展示当前正文的原始 Markdown，适合复制完整标记、检查链接与图片地址、修改表格结构或处理工具栏没有的格式。

## 界面布局

上方显示“编辑 Markdown 源码”、应用图标和关闭按钮。中央是纯文本输入区，顶部显示行数和字符数，底部提供“取消”和“应用”。

源码区使用等宽字体，长行不自动折行，可横向或纵向滚动。行数是总量统计，不是逐行行号栏。窗口可以拖动并从边缘缩放，默认 680 × 520，最小 460 × 340，尺寸为逻辑单位。

## 操作

| 操作 | 结果 |
| --- | --- |
| 输入、粘贴或删除 | 只修改对话框中的源码副本，统计随之更新。 |
| `Enter` | 在源码中换行。 |
| 点击“应用”或按 `Ctrl + Enter` | 用整个输入区内容替换父编辑器正文，然后关闭窗口。 |
| 点击“取消”、右上角关闭或按 `Esc` | 放弃本次源码修改，保留父编辑器原内容。 |

打开时光标放在源码末尾；可用 `Ctrl + A` 全选、`Ctrl + C` 复制。受支持的基础 HTML 也在此编辑，应用后按[HTML 显示规则](/#/docs/功能指南/基础HTML显示)呈现。回收站预览隐藏源码入口，需先恢复记录。

应用前可直接修正任意原始标记，窗口本身没有格式预览或 Markdown 语法检查按钮。

## 应用与保存的区别

“应用”将修改交回父编辑器：已有备忘录随后按自动保存规则处理，也可立即保存；新建备忘录仍需回到正文后提交。空源码也可以应用，但空的新建记录无法成功提交。

此窗口没有文件路径、另存为或 `.md` 导出按钮。复制源码到外部编辑器可以另行保存文件；包含本地图片时，还需考虑 `assets` 相对路径。

## 核对源码

[界面](https://github.com/Turing158/MemeMomo/blob/main/MemeMomo-wpf/Components/Dialogs/MarkdownSourceDialog.xaml)、[按键及统计](https://github.com/Turing158/MemeMomo/blob/main/MemeMomo-wpf/Components/Dialogs/MarkdownSourceDialog.xaml.cs)、[应用到正文](https://github.com/Turing158/MemeMomo/blob/main/MemeMomo-wpf/Components/MarkdownEditor.xaml.cs)。
