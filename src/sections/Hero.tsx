// Hero：居中文案 + 应用窗口拼贴。
// 拼贴 = 主窗口居中，便签弹窗（左斜叠）、提醒卡片（右斜叠）、
// 贴边方块（右下，可沿边线拖动）围绕；背景点阵纸纹 + 两团暖色光晕。

import { useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import styles from './Hero.module.css'
import { AppWindow, PopoutNote, ReminderToast, DockSquare } from '../components/AppWindow'
import { SITE } from '../lib/site'
import { IconArrowRight, IconGithub, IconStickyNote } from '../components/icons'

const STATS = [
  { value: '10+', label: '桌面特性' },
  { value: '8 款', label: '便签配色' },
  { value: '5 组', label: '全局快捷键' },
  { value: '100%', label: '本地存储' },
]

const DOCK_SIZE = 44 // 与 .dock 的固定尺寸一致
const FILLET = 12 // 过渡弧伸出方块外沿的高度（上、下各 12px）

export default function Hero() {
  // 贴边方块沿边线的位置（距 .edge 底部的 px），可拖动。
  // 范围按过渡弧外沿钳制：拖到尽头时弧形恰好与线的端头对齐。
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
      <div className={styles.bg} aria-hidden>
        <div className={`${styles.blob} ${styles.blobA}`} />
        <div className={`${styles.blob} ${styles.blobB}`} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={`${styles.copy} reveal visible`}>
          <p className={styles.badge}>
            <IconStickyNote size={14} />
            为 Windows 打造 · .NET 8 + WPF
          </p>
          <h1 className={styles.title}>
            把每一个想法，
            <br />
            <span className="marker">贴在桌面上</span>
          </h1>
          <p className={styles.subtitle}>
            MemeMomo 是一款轻量的桌面 Markdown 备忘录：随手记下，
            让它安静地停在屏幕边缘，或变成一张独立便签。
            不上云、不打扰，全部数据留在你的电脑里。
          </p>

          <div className={styles.ctaRow}>
            <a className={`btn btnPrimary ${styles.cta}`} href={SITE.repoUrl} target="_blank" rel="noreferrer">
              <IconGithub size={17} />
              在 GitHub 查看源码
            </a>
            <a className="btn btnGhost" href="#quickstart">
              三步快速上手
              <IconArrowRight size={16} />
            </a>
          </div>

          <p className={styles.hint}>
            按下 <span className="kbd">Ctrl</span>
            <span className="kbd">Alt</span>
            <span className="kbd">N</span> 随时唤起主窗口
          </p>
        </div>

        {/* 应用拼贴 */}
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
              style={{ '--dock-bottom': `${dockBottom}px` } as React.CSSProperties}
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

        <ul className={styles.stats} data-reveal>
          {STATS.map((stat) => (
            <li key={stat.label} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
