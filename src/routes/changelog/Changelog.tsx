// 更新日志页：「账本收据」设计——单列收据卡版本流 + 顶部版本跳转 chips + 规划中便签墙。
// 与 CodeCraft-ps 的「渐变页头 + 左版本轨道 + 右时间线」刻意区分。

import styles from './Changelog.module.css'
import { useReveal } from '../../hooks/useReveal'
import { usePageMeta } from '../../hooks/usePageMeta'
import { github } from '../../lib/utils'
import { RELEASES, ROADMAP, type ChangeKind } from '../../data/changelog'
import {
  IconCalendar,
  IconGithub,
  IconHistory,
  IconPlus,
  IconRocket,
  IconSparkles,
  IconTag,
  IconWrench,
} from '../../components/icons'

const KIND_META: Record<ChangeKind, { label: string; Icon: typeof IconPlus; cls: string } | null> = {
  feature: { label: '新增', Icon: IconPlus, cls: styles.kindFeature },
  improve: { label: '改进', Icon: IconSparkles, cls: styles.kindImprove },
  fix: { label: '修复', Icon: IconWrench, cls: styles.kindFix },
  note: null,
}

export default function Changelog() {
  useReveal()
  usePageMeta({
    title: '更新日志 - MemeMomo',
    description: 'MemeMomo 更新日志：每个版本的新功能、改进与修复，以及接下来的规划。',
  })

  return (
    <main className={styles.page}>
      {/* 页头：点阵纸纹，不做大面积渐变 */}
      <header className={styles.head}>
        <div className="container">
          <p className="eyebrow" data-reveal>
            <IconHistory size={14} />
            更新日志
          </p>
          <h1 className={styles.title} data-reveal>
            每一版，
            <span className="marker">都记在小本本上</span>
          </h1>
          <p className={styles.lead} data-reveal>
            新功能、改进和修复，一条不落。仓库公开后将同步 GitHub Releases。
          </p>

          {/* 版本快速跳转 */}
          <nav className={styles.versionChips} aria-label="版本列表" data-reveal>
            {RELEASES.map((release) => (
              <a key={release.version} href={`#v-${release.version}`} className={styles.chip}>
                <IconTag size={13} />
                {release.version}
              </a>
            ))}
            <a href="#roadmap" className={`${styles.chip} ${styles.chipRoadmap}`}>
              <IconRocket size={13} />
              规划中
            </a>
          </nav>
        </div>
      </header>

      {/* 收据卡版本流 */}
      <section className={`container ${styles.stream}`}>
        {RELEASES.map((release) => (
          <article key={release.version} id={`v-${release.version}`} className={styles.receipt} data-reveal>
            <header className={styles.receiptHead}>
              <div className={styles.receiptTitle}>
                <h2 className={styles.version}>{release.version}</h2>
                {release.badge === 'latest' && (
                  <span className={styles.badgeLatest}>
                    <IconSparkles size={12} />
                    最新版本
                  </span>
                )}
              </div>
              <p className={styles.receiptDate}>
                <IconCalendar size={13} />
                {release.date}
              </p>
            </header>

            <div className={styles.perf} aria-hidden>
              {Array.from({ length: 48 }, (_, i) => (
                <span key={i} className={styles.perfDot} />
              ))}
            </div>

            <p className={styles.receiptSummary}>{release.title}</p>

            <div className={styles.groups}>
              {(['feature', 'improve', 'fix'] as const).map((kind) => {
                const items = release.entries.filter((entry) => entry.kind === kind)
                if (!items.length) return null
                const meta = KIND_META[kind]!
                const { Icon, label, cls } = meta
                return (
                  <section key={kind} className={`${styles.group} ${cls}`}>
                    <h3 className={styles.groupLabel}>
                      <Icon size={13} />
                      {label}
                      <span className={styles.groupCount}>{items.length}</span>
                    </h3>
                    <ul className={styles.list}>
                      {items.map((entry) => (
                        <li key={entry.text}>{entry.text}</li>
                      ))}
                    </ul>
                  </section>
                )
              })}

              {release.entries
                .filter((entry) => entry.kind === 'note')
                .map((entry) => (
                  <p key={entry.text} className={styles.note}>
                    {entry.text}
                  </p>
                ))}
            </div>

            <footer className={styles.receiptFoot}>
              <a href={github('/releases')} target="_blank" rel="noreferrer" className={styles.footLink}>
                <IconGithub size={14} />
                在 GitHub 查看该版本
              </a>
            </footer>
          </article>
        ))}

        {/* 规划中：便签墙 */}
        <section id="roadmap" className={styles.roadmap} data-reveal>
          <h2 className={styles.roadmapTitle}>
            <IconRocket size={18} />
            接下来想做的
          </h2>
          <p className={styles.roadmapDesc}>
            以下只是想法，不代表承诺的发布顺序；欢迎到仓库提 Issue 影响它们的优先级。
          </p>
          <ul className={styles.roadmapWall}>
            {ROADMAP.map((idea) => (
              <li key={idea} className={styles.idea}>
                {idea}
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  )
}
