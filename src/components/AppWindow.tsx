// MemeMomo 应用界面复刻：主窗口 / 便签弹窗 / 提醒卡片 / 贴边方块。
// 颜色取自 WPF LightPalette（tokens.css 的 --app-*），保证与真实应用一致。

import type { HTMLAttributes } from 'react'
import styles from './AppWindow.module.css'
import appIcon from '../assets/appicon.png'

/* ---------- 主窗口 ---------- */

const MEMOS = [
  {
    color: 'var(--app-accent)',
    title: '周五 20:00 · 团建报名截止',
    subtitle: '记得在群里接龙，带上口味偏好',
    time: '2 分钟前',
    reminder: true,
  },
  {
    color: '#7ba288',
    title: '博客选题：无边框窗口的圆角与阴影',
    subtitle: 'WPF WindowChrome + DWM 的坑',
    time: '1 小时前',
    reminder: false,
  },
  {
    color: '#c9a06a',
    title: '买菜：鸡蛋、牛奶、西红柿',
    subtitle: '- [x] 领快递　- [ ] 充值交通卡',
    time: '昨天',
    reminder: false,
  },
]

export function AppWindow() {
  return (
    <div className={styles.window} role="img" aria-label="MemeMomo 主窗口示意">
      {/* 标题栏：图标 + 名称 + 数量角标 + 右侧按钮（设置/置顶/最小化/关闭） */}
      <div className={styles.titleBar}>
        <img src={appIcon} alt="" className={styles.titleIcon} />
        <span className={styles.titleName}>MemeMomo</span>
        <span className={styles.countBadge}>4</span>
        <span className={styles.titleSpacer} />
        <span className={`${styles.titleBtn} ${styles.btnGear}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
          </svg>
        </span>
        <span className={styles.titleBtn}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 17v5M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1Z" />
          </svg>
        </span>
        <span className={styles.titleBtn}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14" />
          </svg>
        </span>
        <span className={`${styles.titleBtn} ${styles.btnClose}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </span>
      </div>

      <div className={styles.body}>
        {/* 顶部 Markdown 编辑器 */}
        <div className={styles.editor}>
          <div className={styles.editorToolbar}>
            {['B', 'I', 'U', 'H', '“', '•', '✓', '@', '❝'].map((ch, i) => (
              <span key={i} className={styles.toolChar} aria-hidden>
                {ch}
              </span>
            ))}
          </div>
          <p className={styles.editorTitle}>## 周末计划</p>
          <p className={styles.editorText}>
            给<span className={styles.inlineCode}>MemeMomo</span> 写发布说明…
          </p>
          <div className={styles.editorHint}>
            <span className={styles.kbdChip}>Ctrl</span>
            <span className={styles.kbdChip}>Enter</span>
            <span>新增备忘录</span>
          </div>
        </div>

        {/* 备忘录卡片列表 */}
        <div className={styles.list}>
          {MEMOS.map((memo) => (
            <div key={memo.title} className={styles.card}>
              <span
                className={styles.cardBar}
                style={{ background: memo.color }}
                aria-hidden
              />
              <div className={styles.cardMain}>
                <div className={styles.cardTitleRow}>
                  <span className={styles.cardTitle}>{memo.title}</span>
                  {memo.reminder && (
                    <svg
                      className={styles.cardBell}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                    >
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                  )}
                </div>
                <div className={styles.cardSubRow}>
                  <span className={styles.cardSub}>{memo.subtitle}</span>
                  <span className={styles.cardTime}>{memo.time}</span>
                </div>
              </div>
            </div>
          ))}
          <div className={styles.cardGhost} aria-hidden>
            <span className={styles.cardBar} style={{ background: '#c98a8a' }} />
            <div className={styles.cardMain}>
              <div className={styles.cardTitleRow}>
                <span className={styles.cardTitle}>想法：给便签加呼吸灯动画</span>
              </div>
              <div className={styles.cardSubRow}>
                <span className={styles.cardSub}>按住卡片拖到窗口外…</span>
                <span className={styles.cardTime}>3 天前</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- 便签弹窗（MemoPopoutWindow 复刻） ---------- */

export function PopoutNote() {
  return (
    <div className={styles.popout} role="img" aria-label="独立便签窗口示意">
      <div className={styles.popoutBar}>
        <img src={appIcon} alt="" className={styles.titleIcon} />
        <span className={styles.popoutTitle}>今日小记</span>
        <span className={styles.titleSpacer} />
        <span className={`${styles.titleBtn} ${styles.pinActive}`}>
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M16 3v2l-1 1v5l3 2v2h-5v6l-1 1-1-1v-6H6v-2l3-2V6L8 5V3h8Z" />
          </svg>
        </span>
        <span className={styles.titleBtn}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </span>
      </div>
      <div className={styles.popoutBody}>
        <p className={styles.mdH1}>今日小记</p>
        <p className={styles.mdH2}>柔和的颜色，让思维慢下来。</p>
        <p className={styles.mdText}>
          <span className={styles.mdLink}>阅读链接</span> 与{' '}
          <span className={styles.inlineCode}>一段代码</span>
        </p>
        <div className={styles.mdQuote}>记录值得停留的灵感。</div>
        <div className={styles.mdCodeBlock}>
          <span className={styles.mdCodeLang}>csharp</span>
          <code>var idea = "Hello";</code>
        </div>
      </div>
      <div className={styles.popoutFooter}>
        <span className={styles.mdTime}>10:24</span>
      </div>
    </div>
  )
}

/* ---------- 提醒卡片（ReminderWindow 复刻） ---------- */

export function ReminderToast() {
  return (
    <div className={styles.reminder} role="img" aria-label="定时提醒示意">
      <div className={styles.reminderIcon}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
      </div>
      <div className={styles.reminderMain}>
        <p className={styles.reminderTitle}>备忘录提醒</p>
        <p className={styles.reminderText}>周五 20:00 · 团建报名截止</p>
      </div>
      <div className={styles.reminderActions}>
        <span className={styles.reminderBtn}>稍后</span>
        <span className={`${styles.reminderBtn} ${styles.reminderBtnPrimary}`}>完成</span>
      </div>
    </div>
  )
}

/* ---------- 贴边收起方块 ---------- */

export function DockSquare({
  className,
  ...rest
}: { className?: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.dock} ${className ?? ''}`} {...rest} aria-hidden>
      <img src={appIcon} alt="" className={styles.dockIcon} draggable={false} />
    </div>
  )
}
