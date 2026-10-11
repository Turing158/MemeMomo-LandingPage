// 常见问题：手风琴（便签纸样式），单开模式。

import { useState } from 'react'
import styles from './Faq.module.css'
import { SITE } from '../lib/site'
import { IconChevronDown } from '../components/icons'

const FAQS = [
  {
    q: '我的数据会上传到云端吗？',
    a: '不会上传备忘录内容。备忘录、任务状态、设置和图片保存在本机 %AppData%/MemeMomo/。检测更新时会访问 GitHub，添加网络图片时会请求对应的 HTTPS 地址。',
  },
  {
    q: '任务状态和 Markdown 里的勾选项有什么区别？',
    a: '任务状态用于整条备忘录，支持待办、进行中、暂缓、已完成和已取消，也能自定义名称、颜色与图标。Markdown 勾选项是正文里的清单项，两者可以配合使用。任务完成或取消时，会自动取消这条备忘录的提醒。',
  },
  {
    q: '快速新建和剪贴板收集有什么不同？',
    a: 'Ctrl + Alt + Q 在鼠标位置打开空白草稿，按 Ctrl + Enter 后保存为正式备忘录；关闭未保存的草稿时，可以选择保存、放弃或取消关闭。Ctrl + Alt + C 则直接把剪贴板文本添加为备忘录。',
  },
  {
    q: '删除的备忘录还能找回来吗？',
    a: '可以。内容会先进入回收站，你可以预览原文，再恢复到备忘录列表。彻底删除或清空回收站前，请确认内容不再需要；恢复任务后，如需提醒，要重新安排时间。',
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
    a: '支持标题、强调、列表、任务项、引用、链接、代码块、表格和图片等。可以编辑表格单元格、调整图片宽度、选择代码语言与复制代码，也支持基础 HTML 样式。底层保存为 Markdown 文本。',
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
                  aria-controls={'faq-answer-' + index}
                >
                  <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.q}>{item.q}</span>
                  <IconChevronDown size={18} className={styles.chevron} />
                </button>
                <div id={'faq-answer-' + index} className={styles.answerWrap} aria-hidden={!expanded}>
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
