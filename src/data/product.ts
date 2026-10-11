// 产品事实取自 MemeMomo WPF 86c3620（2026-10-10）：
// Services/TaskStatusCatalog.cs、UI/TaskStatusAppearance.cs、Models/AppSettings.cs。
export const TASK_STATUSES = [
  { id: 'todo', label: '待办', color: '#2b5f91', darkColor: '#9ac8f2' },
  { id: 'doing', label: '进行中', color: '#684797', darkColor: '#cdb0f1' },
  { id: 'paused', label: '暂缓', color: '#78540c', darkColor: '#e8c176' },
  { id: 'done', label: '已完成', color: '#216846', darkColor: '#91d5ac' },
  { id: 'cancelled', label: '已取消', color: '#595d65', darkColor: '#bfc5ce' },
] as const

export type TaskStatus = (typeof TASK_STATUSES)[number]['id']

export const GLOBAL_SHORTCUTS = [
  { action: '快速新建', keys: ['Ctrl', 'Alt', 'Q'], note: '在鼠标位置打开空白草稿，Ctrl + Enter 保存' },
  { action: '快速添加剪贴板', keys: ['Ctrl', 'Alt', 'C'], note: '将剪贴板文本直接新增为备忘录' },
  { action: '显示主窗口', keys: ['Ctrl', 'Alt', 'N'], note: '唤起或恢复主窗口' },
  { action: '切换置顶', keys: ['Ctrl', 'Alt', 'T'], note: '最近激活的主窗口、便签或教程窗口' },
  { action: '切换便签任务栏图标', keys: ['Ctrl', 'Alt', 'B'], note: '显示或隐藏最近激活便签的任务栏按钮' },
  { action: '最小化到托盘', keys: ['Ctrl', 'Alt', 'M'], note: '隐藏主窗口，托盘继续驻留' },
] as const
