// 更新日志数据源：本地维护（仓库尚未公开 Release，暂不接 GitHub Releases API）。
// kind: feature=新增 improve=改进 fix=修复 note=说明

export type ChangeKind = 'feature' | 'improve' | 'fix' | 'note'

export interface ChangeEntry {
  kind: ChangeKind
  text: string
}

export interface ReleaseEntry {
  version: string
  date: string
  /** latest=最新版 beta=预发布 */
  badge?: 'latest' | 'beta'
  title: string
  entries: ChangeEntry[]
}

export const RELEASES: ReleaseEntry[] = [
  {
    version: 'v0.0.1',
    date: '2026-09-30',
    badge: 'latest',
    title: '第一个公开版本：备忘录、便签与桌面集成全部就位',
    entries: [
      { kind: 'feature', text: '快速记录：顶部 Markdown 编辑器，Ctrl + Enter 立即新增，约 500ms 自动保存' },
      { kind: 'feature', text: '所见即所得 Markdown 编辑：标题、强调、删除线、列表、任务项、引用、链接、代码、表格、分隔线与图片' },
      { kind: 'feature', text: '拖拽重排：按住卡片调整顺序，拖出主窗口就地弹出独立便签' },
      { kind: 'feature', text: '独立便签：可编辑、可置顶、可隐藏任务栏按钮，时间戳支持相对/完整时间切换' },
      { kind: 'feature', text: '定时提醒：精确到秒，托盘驻留时照常触发，下次启动补触发到期提醒' },
      { kind: 'feature', text: '贴边收起：四边与角落吸附成小方块，方块大小 30–75px 实时可调' },
      { kind: 'feature', text: '桌面集成：系统托盘、全局快捷键、窗口置顶、无边框圆角窗口、单实例唤起' },
      { kind: 'feature', text: '五组全局快捷键，均可在设置中改绑，冲突组合自动拒绝' },
      { kind: 'feature', text: '界面偏好：浅色/深色/跟随系统主题，动效三档可调，八款便签配色' },
      { kind: 'feature', text: '本地存储：备忘录、设置与图片保存在 %AppData%/MemeMomo/，不上传任何数据' },
      { kind: 'improve', text: '无边框窗口支持边缘与角落缩放，圆角在系统层面裁切' },
      { kind: 'improve', text: '首次启动提供内置教程，快捷键与窗口操作随时可查' },
      { kind: 'note', text: '当前为早期版本，安装包与签名分发方式仍在准备中，推荐先从源码运行' },
    ],
  },
]

export const ROADMAP = [
  '便签分组与搜索',
  '自定义主题强调色',
  '提醒重复规则（每天/每周）',
  '多语言界面',
  '数据自动备份',
  'Windows 应用商店分发',
] as const
