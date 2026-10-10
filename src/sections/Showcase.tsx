// 界面一览：并排复刻应用的浅色 / 深色设置窗口（取自真实 WPF 设置界面），
// 下方是可交互的自定义组件演示（分段选择器 / 动画滑块 / 任务复选框）。

import { useState } from 'react'
import styles from './Showcase.module.css'

const COLOR_PRESETS = [
  { name: '跟随主题', bg: '#f6f3ec', border: '#e5ddd1' },
  { name: '炭黑', bg: '#23262a', border: '#3a3f45' },
  { name: '米白', bg: '#f7f3ea', border: '#e5ddd1' },
  { name: '雾蓝', bg: '#dfe7f0', border: '#b3c4d8', selected: true },
  { name: '鼠尾草绿', bg: '#e5ede6', border: '#bfd2c4' },
  { name: '浅玫瑰', bg: '#f3e4e4', border: '#dcbcbc' },
  { name: '淡紫', bg: '#eae4f1', border: '#cfc2de' },
  { name: '暖沙', bg: '#f2e9d8', border: '#dcc9a8' },
]

const HOTKEY_ROWS = [
  { label: '置顶', keys: 'Ctrl + Alt + T' },
  { label: '最小化', keys: 'Ctrl + Alt + M' },
  { label: '显示软件', keys: 'Ctrl + Alt + N' },
  { label: '快速添加（剪贴板）', keys: 'Ctrl + Alt + C' },
]

const MOTION_OPTIONS = ['跟随系统', '始终开启', '关闭动画']

function SettingsMock({ variant }: { variant: 'light' | 'dark' }) {
  return (
    <div className={`${styles.settings} ${variant === 'dark' ? styles.settingsDark : ''}`}>
      <div className={styles.settingsBar}>
        <span className={styles.settingsTitle}>设置</span>
        <span className={styles.settingsClose} aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </span>
      </div>

      <div className={styles.settingsBody}>
        <section className={styles.settingsGroup}>
          <p className={styles.groupTitle}>便签配色</p>
          <p className={styles.groupHint}>标题栏与便签背景保持同色，边框自动适配。</p>
          <div className={styles.swatchGrid}>
            {COLOR_PRESETS.map((preset) => (
              <div
                key={preset.name}
                className={`${styles.swatch} ${preset.selected ? styles.swatchSelected : ''}`}
              >
                <span
                  className={styles.swatchDot}
                  style={{ background: preset.bg, borderColor: preset.border }}
                />
                <span className={styles.swatchName}>
                  {preset.name}
                  {preset.selected && '（当前）'}
                </span>
                {preset.selected && (
                  <svg
                    className={styles.swatchCheck}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.settingsGroup}>
          <p className={styles.groupTitle}>界面动效</p>
          <p className={styles.groupHint}>控制窗口和界面微交互动画</p>
          <div className={styles.segmented}>
            {MOTION_OPTIONS.map((label, index) => (
              <span
                key={label}
                className={`${styles.segment} ${index === 0 ? styles.segmentActive : ''}`}
              >
                {label}
              </span>
            ))}
          </div>
          <p className={styles.groupFoot}>系统当前已开启动画</p>
        </section>

        <section className={styles.settingsGroup}>
          <p className={styles.groupTitle}>快捷键设置</p>
          <p className={styles.groupHint}>点击后按下按键，按 Esc 留空，右键取消</p>
          <div className={styles.keyRows}>
            {HOTKEY_ROWS.map((row) => (
              <div key={row.label} className={styles.keyRow}>
                <span className={styles.keyLabel}>{row.label}</span>
                <span className={styles.keyValue}>{row.keys}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default function Showcase() {
  const [motion, setMotion] = useState(0)
  const [dockSize, setDockSize] = useState(52)
  const [tasks, setTasks] = useState([true, false, false])

  const toggleTask = (index: number) =>
    setTasks((prev) => prev.map((done, i) => (i === index ? !done : done)))

  return (
    <section className={`section ${styles.section}`} id="showcase">
      <div className="container">
        <header className="sectionHead center" data-reveal>
          <p className="eyebrow">界面一览</p>
          <h2 className="sectionTitle">
            浅色深色，
            <span className="marker">都长在桌面上</span>
          </h2>
          <p className="sectionDesc">
            下面是应用「设置」窗口在两种主题下的原样复刻，配色、间距与真实界面一致。
          </p>
        </header>

        <div className={styles.dualGrid} data-reveal>
          <figure className={styles.dualItem}>
            <SettingsMock variant="light" />
            <figcaption className={styles.dualCaption}>浅色 · 暖纸米白</figcaption>
          </figure>
          <figure className={styles.dualItem}>
            <SettingsMock variant="dark" />
            <figcaption className={styles.dualCaption}>深色 · 静谧炭黑</figcaption>
          </figure>
        </div>

        {/* 可交互组件 */}
        <div className={styles.controlsGrid} data-reveal>
          <article className={styles.controlCard}>
            <h3 className={styles.controlTitle}>分段选择器</h3>
            <p className={styles.controlDesc}>设置窗口里的三态切换，试试点一下。</p>
            <div className={styles.demoSegmented}>
              {MOTION_OPTIONS.map((label, index) => (
                <button
                  key={label}
                  type="button"
                  className={`${styles.demoSegment} ${motion === index ? styles.demoSegmentActive : ''}`}
                  onClick={() => setMotion(index)}
                  aria-pressed={motion === index}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className={styles.controlFoot}>
              当前选择：<strong>{MOTION_OPTIONS[motion]}</strong>
            </p>
          </article>

          <article className={styles.controlCard}>
            <h3 className={styles.controlTitle}>贴边方块大小</h3>
            <p className={styles.controlDesc}>
              拖动滑块试试：<strong className={styles.demoValue}>{dockSize}px</strong>（30–75px 实时生效）
            </p>
            <input
              type="range"
              min={30}
              max={75}
              value={dockSize}
              onChange={(event) => setDockSize(Number(event.target.value))}
              className={styles.slider}
              style={{ '--val': dockSize } as React.CSSProperties}
              aria-label="贴边方块大小"
            />
            <div
              className={styles.sliderPreview}
              style={{ '--dock-px': `${dockSize * 0.7}px` } as React.CSSProperties}
            >
              <span className={styles.sliderDock} />
              <span className={styles.sliderEdge} aria-hidden />
            </div>
          </article>

          <article className={styles.controlCard}>
            <h3 className={styles.controlTitle}>任务项复选框</h3>
            <p className={styles.controlDesc}>Markdown 任务项渲染成可勾选的动画复选框。</p>
            <ul className={styles.taskList}>
              {['回复评审意见', '给便签加呼吸灯', '整理发布说明'].map((label, index) => (
                <li key={label}>
                  <button
                    type="button"
                    className={styles.taskRow}
                    onClick={() => toggleTask(index)}
                    aria-pressed={tasks[index]}
                  >
                    <span
                      className={`${styles.taskBox} ${tasks[index] ? styles.taskBoxOn : ''}`}
                      aria-hidden
                    >
                      {tasks[index] && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.4"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      )}
                    </span>
                    <span className={`${styles.taskText} ${tasks[index] ? styles.taskTextDone : ''}`}>
                      {label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
