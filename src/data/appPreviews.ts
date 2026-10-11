// Logical window sizes and settings categories from MemeMomo WPF 86c3620.
// Reference captures live in tools/CaptureScreenshots/reference/ (not shipped).
const mainWindow = { width: 1080, height: 720, responsive: true } as const

export const SETTINGS_PAGES = [
  { screen: 'settings-general', label: '通用' },
  { screen: 'settings-appearance', label: '外观' },
  { screen: 'settings-windows', label: '窗口与便签' },
  { screen: 'settings-tasks', label: '任务与提醒' },
  { screen: 'settings-hotkeys', label: '快捷键' },
  { screen: 'settings-about', label: '关于与维护' },
] as const

export type SettingsPreviewName = (typeof SETTINGS_PAGES)[number]['screen']
export type PreviewTheme = 'light' | 'dark'

export const APP_PREVIEWS = {
  workspace: mainWindow,
  recycle: mainWindow,
  'settings-general': mainWindow,
  'settings-appearance': mainWindow,
  'settings-windows': mainWindow,
  'settings-tasks': mainWindow,
  'settings-hotkeys': mainWindow,
  'settings-about': mainWindow,
  'task-statuses': mainWindow,
  note: { width: 420, height: 320, responsive: false },
  draft: { width: 460, height: 320, responsive: false },
  reminder: { width: 460, height: 480, responsive: false },
} as const

export type AppPreviewName = keyof typeof APP_PREVIEWS

export function isSettingsPreview(screen: AppPreviewName): screen is SettingsPreviewName {
  return screen.startsWith('settings-')
}
