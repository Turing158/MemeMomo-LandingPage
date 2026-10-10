// 常见问题：手风琴（便签纸样式），单开模式。

import { useState } from 'react'
import styles from './Faq.module.css'
import { SITE } from '../lib/site'
import { IconChevronDown } from '../components/icons'

const FAQS = [
  {
    q: '我的数据会上传到云端吗？',
    a: '不会。MemeMomo 没有任何联网功能，备忘录、设置和图片全部保存在本机 %AppData%/MemeMomo/ 目录下，退出应用也不会丢失。',
  },
  {
    q: '完全退出后，提醒还会触发吗？',
    a: '不会。提醒由应用内计时器触发，完全退出后不在后台驻留。不过已到期但未触发的提醒会在下次启动时补触发。',
  },
  {
    q: '便签可以一直钉在桌面上吗？',
    a: '可以。便签窗口的标题栏里有图钉按钮可单独置顶；Ctrl + Alt + B 还能切换它的任务栏按钮，让它更「隐形」。',
  },
  {
    q: '支持哪些 Markdown 语法？',
    a: '标题、强调、删除线、列表、任务项、引用、链接、代码、表格、分隔线和图片。底层始终保存为纯 Markdown 文本，随时可被其他编辑器接管。',
  },
  {
    q: '如何从源码运行？',
    a: `安装 .NET 8 SDK 后，在仓库根目录执行：${SITE.runCommand}。首次编译约需一分钟。`,
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number>(0)

  return (
    <section className={`section ${styles.section}`} id="faq">
      <div className="container">
        <header className="sectionHead center" data-reveal>
          <p className="eyebrow">常见问题</p>
          <h2 className="sectionTitle">你可能想问</h2>
        </header>

        <div className={styles.list} data-reveal>
          {FAQS.map((item, index) => {
            const expanded = open === index
            return (
              <div key={item.q} className={`${styles.item} ${expanded ? styles.open : ''}`}>
                <button
                  type="button"
                  className={styles.question}
                  onClick={() => setOpen(expanded ? -1 : index)}
                  aria-expanded={expanded}
                >
                  <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.q}>{item.q}</span>
                  <IconChevronDown size={18} className={styles.chevron} />
                </button>
                <div className={styles.answerWrap} aria-hidden={!expanded}>
                  <p className={styles.answer}>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
