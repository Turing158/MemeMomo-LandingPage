// 快捷键：全局快捷键 + 编辑器按键两张表，键位胶囊样式。

import styles from './Shortcuts.module.css'
import { IconKeyboard, IconMonitor, IconPencil } from '../components/icons'
import { GLOBAL_SHORTCUTS } from '../data/product'

const EDITOR_KEYS = [
  { action: '新增备忘录', keys: ['Ctrl', 'Enter'], note: '顶部编辑器中立即创建' },
  { action: '保存新草稿', keys: ['Ctrl', 'Enter'], note: '将快速新建的草稿保存为正式备忘录' },
  { action: '立即保存', keys: ['Ctrl', 'Enter'], note: '编辑已有备忘录时保持编辑状态' },
  { action: '恢复内容', keys: ['Esc'], note: '回到本次载入时的内容' },
  { action: '插入换行', keys: ['Enter'], note: '编辑状态中直接换行' },
  { action: '粗体 / 斜体 / 链接', keys: ['Ctrl', 'B / I / K'], note: 'Markdown 工具栏快捷方式' },
]

export default function Shortcuts() {
  return (
    <section className={`section ${styles.section}`} id="shortcuts">
      <div className="container">
        <header className="sectionHead" data-reveal>
          <p className="eyebrow">
            <IconKeyboard size={14} />
            键盘操作
          </p>
          <h2 className="sectionTitle">
            手不离键盘，
            <span className="marker">一路到底</span>
          </h2>
          <p className="sectionDesc">
            所有全局快捷键都可以在「设置 → 快捷键设置」中改绑，被占用的组合会被拒绝。
          </p>
        </header>

        <div className={styles.grid}>
          <div className={styles.panel} data-reveal>
            <h3 className={styles.panelTitle}>
              <IconMonitor size={17} />
              全局快捷键
            </h3>
            <ul className={styles.list}>
              {GLOBAL_SHORTCUTS.map((row) => (
                <li key={row.action} className={styles.row}>
                  <div className={styles.rowMain}>
                    <span className={styles.action}>{row.action}</span>
                    <span className={styles.note}>{row.note}</span>
                  </div>
                  <span className={styles.keys}>
                    {row.keys.map((key) => (
                      <kbd key={key} className="kbd">
                        {key}
                      </kbd>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.panel} data-reveal>
            <h3 className={styles.panelTitle}>
              <IconPencil size={16} />
              编辑器按键
            </h3>
            <ul className={styles.list}>
              {EDITOR_KEYS.map((row) => (
                <li key={row.action} className={styles.row}>
                  <div className={styles.rowMain}>
                    <span className={styles.action}>{row.action}</span>
                    <span className={styles.note}>{row.note}</span>
                  </div>
                  <span className={styles.keys}>
                    {row.keys.map((key) => (
                      <kbd key={key} className="kbd">
                        {key}
                      </kbd>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
