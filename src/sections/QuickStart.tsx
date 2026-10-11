// 快速开始：左侧三步时间线，右侧命令行窗口（可复制）。

import { useEffect, useRef, useState } from 'react'
import styles from './QuickStart.module.css'
import { SITE } from '../lib/site'
import { IconCheck, IconTerminal } from '../components/icons'

const STEPS = [
  {
    title: '安装 .NET 8 SDK',
    desc: '从源码运行需要 .NET 8 SDK。自包含发布版无需另装 .NET；框架依赖版需要 .NET 8 Desktop Runtime。',
  },
  {
    title: '一条命令启动',
    desc: '在仓库根目录执行下面的命令，应用会以紧凑的无边框窗口出现。',
  },
  {
    title: '写下第一条备忘录',
    desc: '在编辑器输入内容，按 Ctrl + Enter 新增。也可以按 Ctrl + Alt + Q 在鼠标旁打开草稿，选好类型与状态后保存。',
  },
]

export default function QuickStart() {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const copyTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(copyTimer.current), [])

  const copy = async () => {
    setCopyError(false)
    try {
      await navigator.clipboard.writeText(SITE.runCommand)
      setCopied(true)
      window.clearTimeout(copyTimer.current)
      copyTimer.current = window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopyError(true)
    }
  }

  return (
    <section className={`section ${styles.section}`} id="quickstart">
      <div className="container">
        <header className="sectionHead" data-reveal>
          <p className="eyebrow">快速开始</p>
          <h2 className="sectionTitle">
            三步，
            <span className="marker">把它请上桌面</span>
          </h2>
        </header>

        <div className={styles.grid}>
          <ol className={styles.steps} data-reveal>
            {STEPS.map((step, index) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepIndex}>{index + 1}</span>
                <div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.terminal} data-reveal>
            <div className={styles.terminalBar}>
              <span className={styles.terminalDot} />
              <span className={styles.terminalDot} />
              <span className={styles.terminalDot} />
              <span className={styles.terminalTitle}>
                <IconTerminal size={13} />
                PowerShell
              </span>
            </div>
            <div className={styles.terminalBody}>
              <p className={styles.terminalLine}>
                <span className={styles.prompt}>PS D:\MemeMomo&gt;</span> {SITE.runCommand}
                <span className={styles.cursor} aria-hidden />
              </p>
              <p className={styles.terminalOut}>首次运行会还原依赖并编译项目</p>
              <p className={styles.terminalOut}>MemeMomo {SITE.version} · 让每条想法随手可见</p>
              <button type="button" className={styles.copyBtn} onClick={copy}>
                {copied ? <IconCheck size={14} /> : '复制命令'}
                {copied ? '已复制' : ''}
              </button>
              {copyError && <p className={styles.terminalOut} role="status">复制未成功，请选中上方命令手动复制。</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
