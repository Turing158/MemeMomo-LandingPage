import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import AppPreview from '../components/app-preview/AppPreview'
import { SETTINGS_PAGES } from '../data/appPreviews'
import type { PreviewTheme, SettingsPreviewName } from '../data/appPreviews'
import { useResolvedTheme } from '../hooks/useResolvedTheme'
import { IconBell, IconListChecks, IconMoon, IconPencil, IconSettings, IconSun, IconTrash } from '../components/icons'
import styles from './Showcase.module.css'

const SCENES = [
  { id: 'workspace', label: '备忘与任务', icon: IconListChecks, screen: 'workspace', title: '记下来，也一步步做完。', description: '备忘录列表与 Markdown 编辑器相伴。任务状态标记进度，宽窗与窄窗各有合适的布局。' },
  { id: 'notes', label: '桌面便签', icon: IconPencil, screen: 'note', title: '一个小窗口，留住一个想法。', description: '拖出的备忘录可以独立放在桌面。灵感来了，用 Ctrl + Alt + Q 在鼠标旁打开草稿。' },
  { id: 'settings', label: '个性化设置', icon: IconSettings, screen: 'settings-appearance', title: '让每个细节，合乎你的习惯。', description: '外观、窗口、任务、提醒与快捷键，在主窗口里分门别类，随时调整。' },
  { id: 'statuses', label: '任务状态', icon: IconListChecks, screen: 'task-statuses', title: '给每一步，一个清晰的状态。', description: '待办、进行中、暂缓、已完成、已取消。还可以添加状态，选择喜欢的名称、颜色与图标。' },
  { id: 'recycle', label: '回收站', icon: IconTrash, screen: 'recycle', title: '暂时放下，也能重新找回。', description: '删除后的备忘录先进入回收站。原文可以预览，想法可以恢复，也可以彻底删除。' },
  { id: 'reminder', label: '便签提醒', icon: IconBell, screen: 'reminder', title: '到了时间，让它提醒你。', description: '提醒就在便签里。选择快捷时间，或设定日期与时、分、秒，让重要的事有个着落。' },
] as const

type SceneId = (typeof SCENES)[number]['id']

export default function Showcase() {
  const [view, setView] = useState<SceneId>('workspace')
  const [chosenTheme, setChosenTheme] = useState<PreviewTheme | null>(null)
  const [settingsPage, setSettingsPage] = useState<SettingsPreviewName>('settings-appearance')
  const siteTheme = useResolvedTheme()
  const theme = chosenTheme ?? siteTheme
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const scene = SCENES.find((item) => item.id === view) ?? SCENES[0]

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? SCENES.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + SCENES.length) % SCENES.length
    setView(SCENES[next].id)
    tabs.current[next]?.focus()
  }

  return (
    <section className={'section ' + styles.section} id="showcase">
      <div className="container">
        <header className="sectionHead center" data-reveal>
          <p className="eyebrow">界面一览</p>
          <h2 className="sectionTitle"><span className={styles.headingLead}>小小的窗口，</span><span className="marker">装下日常的点滴</span></h2>
          <p className="sectionDesc">写下想法、安排待办，把需要记住的事留在手边。</p>
        </header>
        <div className={styles.gallery} data-reveal>
          <div className={styles.toolbar}>
            <div className={styles.tabs} role="tablist" aria-label="查看软件界面">
              {SCENES.map((item, index) => <button type="button" key={item.id} role="tab" id={'screen-tab-' + item.id}
                ref={(node) => { tabs.current[index] = node }} aria-selected={view === item.id} aria-controls="app-gallery-panel"
                tabIndex={view === item.id ? 0 : -1} onClick={() => setView(item.id)} onKeyDown={(event) => onTabKeyDown(event, index)}>
                <item.icon size={16} /><span>{item.label}</span>
              </button>)}
            </div>
            <div className={styles.themeSwitch} role="group" aria-label="查看软件配色">
              <button type="button" aria-label="查看浅色界面" title="浅色" aria-pressed={theme === 'light'} onClick={() => setChosenTheme('light')}><IconSun size={17} /></button>
              <button type="button" aria-label="查看深色界面" title="深色" aria-pressed={theme === 'dark'} onClick={() => setChosenTheme('dark')}><IconMoon size={17} /></button>
            </div>
          </div>
          <div role="tabpanel" id="app-gallery-panel" aria-labelledby={'screen-tab-' + view}>
            {/* key 随场景重挂载，触发 panel-in 切换动画 */}
            <div key={view} className={styles.panelSwap}>
              <div className={styles.stage}>
                {view === 'notes'
                  ? <div className={styles.notePair}>
                      <figure><AppPreview screen="note" theme={theme} label="MemeMomo 独立便签窗口" /><figcaption>桌面便签</figcaption></figure>
                      <figure><AppPreview screen="draft" theme={theme} label="MemeMomo 快速添加草稿窗口" /><figcaption>快速添加</figcaption></figure>
                    </div>
                  : <AppPreview screen={view === 'settings' ? settingsPage : scene.screen} theme={theme} onSettingsPageChange={setSettingsPage} label={'MemeMomo ' + scene.label + (view === 'settings' ? '：' + SETTINGS_PAGES.find((page) => page.screen === settingsPage)?.label : '')} />}
              </div>
              <div className={styles.caption}><h3>{scene.title}</h3><p>{scene.description}</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
