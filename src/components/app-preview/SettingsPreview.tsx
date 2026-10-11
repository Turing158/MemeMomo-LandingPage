import { useId, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react'
import appIcon from '../../assets/appicon.png'
import { SETTINGS_PAGES } from '../../data/appPreviews'
import type { PreviewTheme, SettingsPreviewName } from '../../data/appPreviews'
import { IconGithub } from '../icons'
import { CheckMark, ReturnRow, ScrollThumb, StatusSelector } from './Chrome'
import { NativeIcon } from './NativeIcon'
import styles from './AppPreview.module.css'

function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={styles.settingsCard + ' ' + className}>{children}</div>
}

function Row({ label, children, narrow = false, compact = false }: { label: ReactNode; children: ReactNode; narrow?: boolean; compact?: boolean }) {
  return <div className={styles.settingsRow} data-narrow={narrow || undefined} data-small={compact || undefined}>
    <div className={styles.settingLabel}>{label}</div><div className={styles.settingControl}>{children}</div>
  </div>
}

function Segments({ options, selected, small = false }: { options: string[]; selected: number; small?: boolean }) {
  return <div className={styles.segments} data-small={small || undefined}>{options.map((label, index) => <span key={label} data-selected={index === selected || undefined}>{label}</span>)}</div>
}

function CheckRow({ title, description, checked = false }: { title: string; description: string; checked?: boolean }) {
  return <div className={styles.checkRow}><div><div>{title}</div><div className={styles.settingDescription}>{description}</div></div><CheckMark checked={checked} /></div>
}

function Action({ children, danger = false }: { children: ReactNode; danger?: boolean }) {
  return <span className={styles.settingAction} data-danger={danger || undefined}>{children}</span>
}

function GeneralSettings() {
  return <>
    <Card><Row label="语言"><Segments options={['简体中文', 'English', '繁體中文']} selected={0} /></Row></Card>
    <Card><Row label="关闭按钮操作"><Segments options={['最小化托盘', '关闭']} selected={0} /></Row></Card>
    <Card><div className={styles.quickMemoSettings}>
      <CheckRow title="快速添加剪贴板内容" description="通过快捷键将剪贴板内容快速添加为备忘录" checked />
      <CheckRow title="快速添加后自动显示便签" description="快速添加后在鼠标位置弹出便签窗口" checked />
    </div></Card>
    <Card><Row label="托盘图标点击习惯" compact><Segments options={['单击', '双击']} selected={1} small /></Row></Card>
  </>
}

const colors = [
  { label: '跟随主题', color: 'var(--app-bg)' }, { label: '炭黑（当前）', color: '#202225' },
  { label: '米白', color: '#f5f1e8' }, { label: '雾蓝', color: '#e9f0f6' },
  { label: '鼠尾草绿', color: '#eaf0e8' }, { label: '浅玫瑰', color: '#f5eaec' },
  { label: '淡紫', color: '#eeecf6' }, { label: '暖沙', color: '#f6efdd' },
]

function AppearanceSettings({ theme }: { theme: PreviewTheme }) {
  return <>
    <Card><Row label="主题颜色"><Segments options={['跟随系统', '亮色', '暗色']} selected={theme === 'light' ? 1 : 2} /></Row></Card>
    <Card>
      <div className={styles.settingLabel}>便签配色</div>
      <div className={styles.settingDescription}>标题栏与便签背景保持同色，边框自动搭配。</div>
      <div className={styles.colorGrid}>{colors.map((color, index) => <div key={color.label} className={styles.colorOption} data-selected={index === 0 || undefined}>
        <span className={styles.colorSwatch} style={{ background: color.color }} /><span>{color.label}</span>{index === 0 && <NativeIcon name="selection" size={14} />}
      </div>)}</div>
    </Card>
    <Card>
      <Row label="界面动效"><Segments options={['跟随系统', '始终开启', '关闭动画']} selected={2} /></Row>
      <div className={styles.settingDescription}>控制窗口和界面微交互动画</div>
    </Card>
  </>
}

function WindowsSettings() {
  return <>
    <Card><CheckRow title="重复便签" description="关闭时移动已有窗体，开启时总是创建新窗体" /></Card>
    <Card>
      <CheckRow title="启用贴边" description="拖动主窗口到屏幕边缘时收起为方块" checked />
      <div className={styles.settingLabel}>贴边方块大小</div>
      <div className={styles.settingDescription}>调整主窗口贴边收起后的方块尺寸</div>
      <div className={styles.slider}><div className={styles.sliderTrack}><span /><i /></div><div className={styles.sliderLimits}><span>30px</span><span>75px</span></div></div>
      <CheckRow title="便签贴边" description="拖动便签到屏幕左右边缘时收起为半圆标签" />
    </Card>
    <Card>
      <CheckRow title="主界面任务栏图标" description="主界面显示时在 Windows 任务栏中显示图标" />
      <CheckRow title="便签窗口任务栏图标" description="在标题栏显示按钮，可单独控制每个便签的任务栏图标" />
      <CheckRow title="新建便签默认置顶" description="新弹出的便签窗口自动置顶，可在标题栏用图钉单独关闭" />
    </Card>
  </>
}

function TaskSettings() {
  return <>
    <Card>
      <div className={styles.settingLabel}>任务与状态</div>
      <Row label="默认新建类型"><Segments options={['普通备忘', '任务备忘']} selected={0} /></Row>
      <Row label="新任务默认状态"><StatusSelector status="todo" full /></Row>
      <div className={styles.manageAction}><Action>管理状态</Action></div>
    </Card>
    <Card>
      <Row label="提醒方式"><Segments options={['系统通知', '应用内窗口', '两者']} selected={0} /></Row>
      <div className={styles.settingDescription}>系统通知会遵循 Windows 的免打扰设置</div>
    </Card>
  </>
}

function HotkeySettings() {
  return <Card>
    <div className={styles.settingLabel}>快捷键设置</div>
    <div className={styles.settingDescription}>点击后按快捷键，按 Esc 留空，右键取消</div>
    {['置顶', '最小化', '显示软件', '快速添加（剪贴板）', '快速添加'].map((label, index) =>
      <Row key={label} label={label} narrow><span className={styles.hotkeyField}>Ctrl + Alt + {['T', 'M', 'N', 'C', 'Q'][index]}</span></Row>)}
  </Card>
}

function AboutSettings() {
  return <>
    <Card>
      <div className={styles.settingLabel}>关于</div>
      <div className={styles.aboutIdentity}>
        <img src={appIcon} width={48} height={48} alt="" draggable={false} />
        <div><div className={styles.aboutName}><strong>MemeMomo</strong><IconGithub size={18} /></div><div className={styles.settingDescription}>贴在桌面上的轻量 Markdown 备忘录，让每条想法都随手可见。</div></div>
      </div>
      <div className={styles.aboutVersionRow}><Row label={<span className={styles.versionBadge}><i /><span>版本</span><strong>1.0.0</strong></span>} compact><Action>检查更新</Action></Row></div>
      <div className={styles.aboutFooter}>© StarFall · MIT License</div>
    </Card>
    <Card className={styles.aboutActionCard}><Row label="教程" compact><Action>教程</Action></Row></Card>
    <Card className={styles.aboutActionCard}><Row label={<><div>重置设置</div><div className={styles.settingDescription}>恢复关闭行为、快捷键和其它偏好默认值</div></>} compact><Action danger>重置</Action></Row></Card>
  </>
}

type SettingsPreviewProps = {
  screen: SettingsPreviewName
  theme: PreviewTheme
  onPageChange?: (screen: SettingsPreviewName) => void
}

export default function SettingsPreview({ screen, theme, onPageChange }: SettingsPreviewProps) {
  const id = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const [direction, setDirection] = useState(1)
  const selectedIndex = SETTINGS_PAGES.findIndex((page) => page.screen === screen)
  const panelId = id + '-panel'

  const changePage = (next: SettingsPreviewName) => {
    if (next === screen || !onPageChange) return
    const nextIndex = SETTINGS_PAGES.findIndex((page) => page.screen === next)
    setDirection(nextIndex > selectedIndex ? 1 : -1)
    onPageChange(next)
  }

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? SETTINGS_PAGES.length - 1
      : (index + (event.key === 'ArrowDown' ? 1 : -1) + SETTINGS_PAGES.length) % SETTINGS_PAGES.length
    changePage(SETTINGS_PAGES[next].screen)
    tabs.current[next]?.focus({ preventScroll: true })
  }

  const contents: Record<SettingsPreviewName, ReactNode> = {
    'settings-general': <GeneralSettings />,
    'settings-appearance': <AppearanceSettings theme={theme} />,
    'settings-windows': <WindowsSettings />,
    'settings-tasks': <TaskSettings />,
    'settings-hotkeys': <HotkeySettings />,
    'settings-about': <AboutSettings />,
  }
  return <div className={styles.settings} style={{ '--settings-index': selectedIndex, '--settings-direction': direction } as CSSProperties}>
    <ReturnRow>设置</ReturnRow>
    <div className={styles.settingsBody}>
      <div className={styles.settingsSidebar} role="tablist" aria-label="设置分类" aria-orientation="vertical">
        {SETTINGS_PAGES.map((page, index) => <button type="button" key={page.screen} role="tab" id={id + '-' + page.screen}
          ref={(node) => { tabs.current[index] = node }} aria-selected={screen === page.screen} aria-controls={panelId}
          tabIndex={screen === page.screen ? 0 : -1} disabled={!onPageChange}
          onClick={() => changePage(page.screen)} onKeyDown={(event) => onTabKeyDown(event, index)}>{page.label}</button>)}
      </div>
      <div className={styles.categorySelect}>
        <select aria-label="设置分类" aria-controls={panelId} value={screen} disabled={!onPageChange}
          onChange={(event) => changePage(event.target.value as SettingsPreviewName)}>
          {SETTINGS_PAGES.map((page) => <option key={page.screen} value={page.screen}>{page.label}</option>)}
        </select>
        <NativeIcon name="chevron" size={12} />
      </div>
      <div key={screen} className={styles.settingsViewport} role="tabpanel" id={panelId} aria-labelledby={id + '-' + screen}
        tabIndex={onPageChange ? 0 : undefined} data-interactive={!!onPageChange || undefined}>
        <div className={styles.settingsForm} data-settings-page={screen}>{contents[screen]}</div>
        {!onPageChange && screen === 'settings-appearance' && <ScrollThumb className={styles.settingsScroll} />}
      </div>
    </div>
  </div>
}

