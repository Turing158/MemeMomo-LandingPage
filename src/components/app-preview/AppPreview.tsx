import { useLayoutEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { APP_PREVIEWS, isSettingsPreview } from '../../data/appPreviews'
import type { AppPreviewName, PreviewTheme, SettingsPreviewName } from '../../data/appPreviews'
import { MainChrome } from './Chrome'
import NotesPreview from './NotesPreview'
import SettingsPreview from './SettingsPreview'
import StatusPreview from './StatusPreview'
import WorkspacePreview from './WorkspacePreview'
import styles from './AppPreview.module.css'

type AppPreviewProps = {
  screen: AppPreviewName
  theme: PreviewTheme
  label: string
  onSettingsPageChange?: (screen: SettingsPreviewName) => void
}

export default function AppPreview({ screen, theme, label, onSettingsPageChange }: AppPreviewProps) {
  const frame = useRef<HTMLDivElement>(null)
  const size = APP_PREVIEWS[screen]
  const settings = isSettingsPreview(screen)
  const interactive = settings && !!onSettingsPageChange
  const note = screen === 'note' || screen === 'draft' || screen === 'reminder'

  useLayoutEffect(() => {
    const element = frame.current
    if (!element) return
    // Match the original logical window size, then fit it into the gallery.
    // CSS reserves the aspect ratio before paint and switches to the native
    // 420 × 680 layout on phones, rather than shrinking a desktop layout.
    const fit = () => {
      const logicalWidth = Number(getComputedStyle(element).getPropertyValue('--window-width'))
      element.style.setProperty('--preview-scale', String(element.getBoundingClientRect().width / logicalWidth))
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(element)
    return () => observer.disconnect()
  }, [screen])

  return <div ref={frame} className={styles.preview} role={interactive ? 'group' : 'img'} aria-label={label}
    data-app-preview={screen} data-theme={theme} data-responsive={size.responsive || undefined}
    style={{ '--base-width': size.width, '--base-height': size.height } as CSSProperties}>
    <div className={styles.window} aria-hidden={interactive ? undefined : true}>
      {note ? <NotesPreview screen={screen} /> : <>
        <MainChrome settings={settings || screen === 'task-statuses'} recycle={screen === 'recycle'} />
        {settings ? <SettingsPreview screen={screen} theme={theme} onPageChange={onSettingsPageChange} />
          : screen === 'task-statuses' ? <StatusPreview /> : <WorkspacePreview recycle={screen === 'recycle'} />}
      </>}
    </div>
  </div>
}
