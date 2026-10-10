// 特性区：Bento 网格（12 列，大小混排），每张卡片一个场景化小演示。

import styles from './Features.module.css'
import type { ReactNode } from 'react'
import {
  IconClock,
  IconFolderLock,
  IconListChecks,
  IconMagnet,
  IconMonitor,
  IconPencil,
  IconStickyNote,
} from '../components/icons'

const MD_CHIPS = [
  '标题',
  '强调',
  '删除线',
  '列表',
  '任务项',
  '引用',
  '链接',
  '代码',
  '表格',
  '分隔线',
  '图片',
]

const HOTKEY_CHIPS = ['Ctrl + Alt + T', 'Ctrl + Alt + M', 'Ctrl + Alt + N', 'Ctrl + Alt + C']

function Card(props: {
  className: string
  icon: ReactNode
  title: string
  desc: string
  visual?: ReactNode
}) {
  return (
    <article className={`${styles.card} ${props.className}`} data-reveal>
      <div className={styles.cardTop}>
        <span className={styles.cardIcon}>{props.icon}</span>
        <div>
          <h3 className={styles.cardTitle}>{props.title}</h3>
          <p className={styles.cardDesc}>{props.desc}</p>
        </div>
      </div>
      {props.visual && <div className={styles.visual}>{props.visual}</div>}
    </article>
  )
}

export default function Features() {
  return (
    <section className={`section ${styles.section}`} id="features">
      <div className="container">
        <header className="sectionHead" data-reveal>
          <p className="eyebrow">它能帮你做什么</p>
          <h2 className="sectionTitle">
            小小的窗口，
            <span className="marker">满满的桌面感</span>
          </h2>
          <p className="sectionDesc">
            从记录到提醒、从摆放到收纳，每一个能力都围绕「随手可见」设计。
          </p>
        </header>

        <div className={styles.grid}>
          {/* 快速记录 */}
          <Card
            className={styles.span7}
            icon={<IconPencil size={20} />}
            title="快速记录，自动保存"
            desc="在顶部编辑器写下内容，按 Ctrl + Enter 立即新增；停止输入约 500ms 后自动保存，Esc 可恢复本次载入的内容。"
            visual={
              <div className={styles.editorDemo} aria-hidden>
                <p className={styles.editorLine1}>
                  明天上午 10 点站会
                  <span className={styles.caret} />
                </p>
                <p className={styles.editorLine2}>带上迭代 burndown 截图</p>
                <div className={styles.editorMeta}>
                  <span className={styles.saveChip}>
                    <span className={styles.saveDot} />
                    已自动保存
                  </span>
                  <span className="kbd">Ctrl</span>
                  <span className="kbd">Enter</span>
                  <span className={styles.saveHint}>立即新增</span>
                </div>
              </div>
            }
          />

          {/* 独立便签 */}
          <Card
            className={styles.span5}
            icon={<IconStickyNote size={20} />}
            title="每条备忘录都能变成便签"
            desc="把卡片拖出主窗口，就地弹出一张独立便签：可编辑、可置顶、可隐藏任务栏按钮，时间戳可在相对与完整时间间切换。"
            visual={
              <div className={styles.chipRow} aria-hidden>
                <span className={styles.featureChip}>
                  <span className={styles.pinDot} />图钉置顶
                </span>
                <span className={styles.featureChip}>任务栏按钮</span>
                <span className={styles.featureChip}>时间戳切换</span>
                <span className={styles.featureChip}>关闭动画</span>
              </div>
            }
          />

          {/* 定时提醒 */}
          <Card
            className={styles.span4}
            icon={<IconClock size={20} />}
            title="精确到秒的提醒"
            desc="应用驻留托盘时依然触发；错过开机时段，下次启动会补触发到期提醒。"
            visual={
              <div className={styles.wheelDemo} aria-hidden>
                <div className={styles.wheelGroup}>
                  {[
                    { label: '时', value: '20' },
                    { label: '分', value: '00' },
                    { label: '秒', value: '00' },
                  ].map((wheel) => (
                    <div key={wheel.label} className={styles.wheel}>
                      <span className={styles.wheelValue}>{wheel.value}</span>
                      <span className={styles.wheelLabel}>{wheel.label}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.quickChips}>
                  <span className={styles.quickChip}>1 分钟后</span>
                  <span className={styles.quickChip}>10 分钟后</span>
                  <span className={styles.quickChip}>半小时后</span>
                  <span className={styles.quickChip}>1 小时后</span>
                </div>
              </div>
            }
          />

          {/* 贴边收起 */}
          <Card
            className={styles.span4}
            icon={<IconMagnet size={20} />}
            title="贴边收起"
            desc="靠近屏幕四边或角落约 40px 时收成小方块，拖回内侧即恢复；方块大小 30–75px 可实时调整。"
            visual={
              <div className={styles.snapDemo} aria-hidden>
                <div className={styles.snapScreen}>
                  <span className={styles.snapWindow} />
                  <span className={styles.snapArrow}>→</span>
                  <span className={styles.snapDock} />
                </div>
              </div>
            }
          />

          {/* 桌面集成 */}
          <Card
            className={styles.span4}
            icon={<IconMonitor size={20} />}
            title="深度桌面集成"
            desc="系统托盘、无边框圆角窗口、窗口置顶、边缘缩放与单实例唤起，像一个原生部件。"
            visual={
              <div className={styles.trayDemo} aria-hidden>
                <div className={styles.tray}>
                  <span className={styles.trayIcon} />
                  <span className={styles.trayIcon} />
                  <span className={`${styles.trayIcon} ${styles.trayActive}`} />
                </div>
                <div className={styles.trayKeys}>
                  {HOTKEY_CHIPS.map((keys) => (
                    <span key={keys} className={styles.trayKey}>
                      {keys}
                    </span>
                  ))}
                </div>
              </div>
            }
          />

          {/* 本地优先 */}
          <Card
            className={styles.span5}
            icon={<IconFolderLock size={20} />}
            title="本地优先，隐私无忧"
            desc="不上传任何内容。备忘录、设置与图片都保存在本机，退出应用也不会丢失。"
            visual={
              <div className={styles.pathDemo} aria-hidden>
                <code className={styles.path}>
                  <span className={styles.pathDisk}>C:</span>
                  \Users\你\AppData\Roaming\<span className={styles.pathApp}>MemeMomo</span>\
                </code>
                <p className={styles.pathNote}>memos · settings · images —— 换机时整目录拷走即可迁移。</p>
              </div>
            }
          />

          {/* Markdown 支持 */}
          <Card
            className={styles.span7}
            icon={<IconListChecks size={20} />}
            title="完整 Markdown，底层纯文本"
            desc="所见即所得编辑，保存的仍是标准 Markdown 文本——随时可以被其他编辑器接管。"
            visual={
              <div className={styles.chipRow} aria-hidden>
                {MD_CHIPS.map((chip) => (
                  <span key={chip} className={styles.mdChip}>
                    {chip}
                  </span>
                ))}
              </div>
            }
          />
        </div>
      </div>
    </section>
  )
}
