import type { CSSProperties, ReactNode } from 'react'
import appIcon from '../../assets/appicon.png'
import { TASK_STATUSES } from '../../data/product'
import type { TaskStatus } from '../../data/product'
import { NativeIcon, TaskIcon } from './NativeIcon'
import styles from './AppPreview.module.css'

export function MainChrome({ settings = false, recycle = false }: { settings?: boolean; recycle?: boolean }) {
  return <div className={styles.titlebar}>
    <img src={appIcon} width={18} height={18} alt="" draggable={false} />
    <span className={styles.windowTitle}>MemeMomo</span>
    <span className={styles.count}>{recycle ? 2 : 6}</span>
    <div className={styles.windowActions}>
      <span className={settings ? styles.activeIcon : ''}><NativeIcon name="settings" size={17} /></span>
      <span><NativeIcon name="pin" size={16} /></span>
      <span><NativeIcon name="minimize" size={15} /></span>
      <span className={styles.dangerIcon}><NativeIcon name="close" size={16} /></span>
    </div>
  </div>
}

export function NoteChrome({ draft = false, reminder = false }: { draft?: boolean; reminder?: boolean }) {
  return <div className={styles.titlebar + ' ' + styles.noteTitlebar}>
    <img src={appIcon} width={18} height={18} alt="" draggable={false} />
    <span className={styles.windowTitle}>{draft ? '快速添加' : '周末，去公园走走'}</span>
    <div className={styles.windowActions}>
      <span className={reminder ? styles.activeIcon : draft ? styles.disabled : ''}><NativeIcon name="reminder" size={13} /></span>
      <span className={reminder ? styles.disabled : ''}><NativeIcon name="toolbar" size={13} /></span>
      <span><NativeIcon name="pin" size={13} /></span>
      <span className={styles.dangerIcon}><NativeIcon name="close" size={13} /></span>
    </div>
  </div>
}

export function ReturnRow({ children }: { children: ReactNode }) {
  return <div className={styles.returnRow}><span><NativeIcon name="back" size={20} /></span><strong>{children}</strong></div>
}

export function taskStyle(status: TaskStatus): CSSProperties {
  const item = TASK_STATUSES.find((item) => item.id === status)!
  return { '--task-light': item.color, '--task-dark': item.darkColor } as CSSProperties
}

export function StatusSelector({ status = 'doing', full = false }: { status?: TaskStatus; full?: boolean }) {
  return <span className={styles.statusSelector} data-full={full || undefined} style={taskStyle(status)}>
    <TaskIcon status={status} size={14} />
    <span>{TASK_STATUSES.find((item) => item.id === status)?.label}</span>
    <NativeIcon name="down" size={12} />
  </span>
}

export function CheckMark({ checked = false }: { checked?: boolean }) {
  return <span className={styles.checkMark} data-checked={checked || undefined}>{checked && <svg width={12} height={12} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 8 3.2 3.2L13 4.4" /></svg>}</span>
}

export function ScrollThumb({ className = '' }: { className?: string }) {
  return <span className={styles.scrollThumb + ' ' + className} />
}
