// 便签配色跑马灯：应用内置的 8 款便签颜色，做成无缝滚动色卡。
// 纯 CSS 动画，悬停时暂停以便查看单个色卡。

import styles from './Marquee.module.css'
import { MEMO_COLORS } from '../lib/site'

export default function Marquee() {
  const cards = [...MEMO_COLORS, ...MEMO_COLORS]
  return (
    <section className={styles.section} aria-label="便签配色一览">
      <div className={styles.strip}>
        <div className={styles.track}>
          {cards.map((color, index) => (
            <div
              key={`${color.name}-${index}`}
              className={styles.card}
              style={{ background: color.bg, borderColor: color.dot }}
            >
              <span className={styles.pin} style={{ background: color.dot }} />
              <span
                className={styles.name}
                style={{ color: index % MEMO_COLORS.length === 1 ? '#e1e4e8' : undefined }}
              >
                {color.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className={styles.caption}>8 款便签配色 · 设置里一键切换，标题栏与便签同色</p>
    </section>
  )
}
