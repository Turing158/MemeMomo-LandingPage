import { useRef, useState } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import { Link } from 'react-router-dom'
import styles from './Hero.module.css'
import { AppWindow, PopoutNote, ReminderToast, DockSquare } from '../components/AppWindow'
import { GLOBAL_SHORTCUTS, TASK_STATUSES } from '../data/product'
import { MEMO_COLORS } from '../lib/site'
import { IconArrowRight, IconDownload } from '../components/icons'

const STATS = [
  { value: TASK_STATUSES.length + ' 类', label: '任务状态，可自定义' },
  { value: MEMO_COLORS.length + ' 款', label: '随心选择的便签配色' },
  { value: GLOBAL_SHORTCUTS.length + ' 组', label: '可改绑的全局快捷键' },
  { value: '100%', label: '数据保存在本机' },
]

const DOCK_SIZE = 44
const FILLET = 12

export default function Hero() {
  const edgeRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ startY: number; startBottom: number; min: number; max: number } | null>(null)
  const [dockBottom, setDockBottom] = useState(FILLET)

  const onDockPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const edge = edgeRef.current
    if (!edge) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = {
      startY: e.clientY,
      startBottom: dockBottom,
      min: FILLET,
      max: edge.getBoundingClientRect().height - DOCK_SIZE - FILLET,
    }
  }

  const onDockPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag) return
    const next = drag.startBottom + (drag.startY - e.clientY)
    setDockBottom(Math.min(drag.max, Math.max(drag.min, next)))
  }

  const endDrag = () => {
    dragRef.current = null
  }

  return (
    <section className={styles.hero} id="top">
      <div className={styles.bg} aria-hidden><div className={styles.blobA} /><div className={styles.blobB} /></div>
      <div className={'container ' + styles.inner}>
        <div className={styles.copy}>
          <p className={styles.badge}><span className={styles.dot} />为 Windows 打造的桌面备忘录</p>
          <h1 className={styles.title}>把想法和待办，<br /><span className="marker">一起贴在桌面上</span></h1>
          <p className={styles.subtitle}>随手写下 Markdown，把备忘变成任务，让重要的事停在眼前。<br className={styles.desktopBreak} />从一闪而过的灵感，到一件件完成的小事，MemeMomo 都在手边。</p>
          <div className={styles.ctaRow}>
            <Link className="btn btnPrimary" to="/download"><IconDownload size={17} />获取 MemeMomo</Link>
            <Link className="btn btnGhost" to="/#showcase">界面一览<IconArrowRight size={16} /></Link>
          </div>
          <p className={styles.hint}><span className="kbd">Ctrl</span><span className="kbd">Alt</span><span className="kbd">Q</span><span>在鼠标旁，接住一个新想法</span></p>
        </div>
        <div className={styles.collage} aria-hidden>
          <div className={styles.stage}>
            <div className={`${styles.float} ${styles.floatMain}`}>
              <AppWindow />
            </div>
            <div className={`${styles.float} ${styles.floatNote}`}>
              <PopoutNote />
            </div>
            <div className={`${styles.float} ${styles.floatToast}`}>
              <ReminderToast />
            </div>
            <div
              className={styles.edge}
              ref={edgeRef}
              style={{ '--dock-bottom': `${dockBottom}px` } as CSSProperties}
            >
              <DockSquare
                className={styles.dockHandle}
                title="拖动可沿边线移动"
                onPointerDown={onDockPointerDown}
                onPointerMove={onDockPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
              />
            </div>
          </div>
        </div>
        <ul className={styles.stats} data-reveal>{STATS.map((stat) => <li key={stat.label}><span className={styles.statValue}>{stat.value}</span><span className={styles.statLabel}>{stat.label}</span></li>)}</ul>
        <p className={styles.platform}>为 Windows 打造<span>·</span>免费开源<span>·</span>无需注册</p>
      </div>
    </section>
  )
}
