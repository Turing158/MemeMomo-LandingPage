// 下载页：聚焦单一下载动作——左侧主下载卡（应用信息 + CTA + 安心清单），
// 右侧版本事实卡（虚线账目行），底部运行环境与帮助行。

import { Link } from 'react-router-dom'
import styles from './Download.module.css'
import { useReveal } from '../../hooks/useReveal'
import { usePageMeta } from '../../hooks/usePageMeta'
import { github } from '../../lib/utils'
import { SITE } from '../../lib/site'
import {
  IconArrowRight,
  IconBook,
  IconCpu,
  IconGithub,
  IconMonitor,
  IconShieldCheck,
} from '../../components/icons'
import appIcon from '../../assets/appicon.png'

const REASSURANCES = ['免安装 · 单文件', '免费 · MIT 开源', '本地保存 · 无需账号', '简中 · 繁中 · English']

const FACTS = [
  { label: '当前版本', value: SITE.version },
  { label: '发布形式', value: '单文件 exe · 免安装' },
  { label: '适用架构', value: 'x64 · x86' },
  { label: '界面语言', value: '简中 · 繁中 · English' },
  { label: '许可证', value: 'MIT License' },
]

export default function Download() {
  useReveal()
  usePageMeta({
    title: '下载 - MemeMomo',
    description:
      '获取 MemeMomo：单文件免安装，开箱即用。免费开源，数据全部保存在本机。',
  })

  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <div className="container">
          <p className="eyebrow" data-reveal>
            获取 MemeMomo
          </p>
          <h1 className={styles.title} data-reveal>
            把它
            <span className="marker">请上桌面</span>
          </h1>
          <p className={styles.lead} data-reveal>
            一个文件，双击就用。免费开源，数据永远留在你自己的电脑里。
          </p>
        </div>
      </header>

      <section className={`container ${styles.paths}`}>
        {/* 主下载卡 */}
        <article className={`${styles.downloadCard}`} data-reveal>
          <div className={styles.appRow}>
            <img src={appIcon} alt="MemeMomo 图标" className={styles.appIcon} />
            <div className={styles.appMeta}>
              <h2 className={styles.appName}>
                MemeMomo
                <span className={styles.versionBadge}>最新版本 {SITE.version}</span>
              </h2>
              <p className={styles.appDesc}>贴在桌面上的轻量 Markdown 备忘录 · 为 Windows 打造</p>
            </div>
          </div>

          <div className={styles.ctaRow}>
            <a href={github('/releases')} target="_blank" rel="noreferrer" className={`btn btnPrimary ${styles.bigCta}`}>
              <IconGithub size={18} />
              前往 GitHub Releases 下载
            </a>
            <Link to="/changelog" className="btn btnGhost">
              看看更新日志
            </Link>
          </div>

          <ul className={styles.reassureList}>
            {REASSURANCES.map((item) => (
              <li key={item} className={styles.reassureChip}>
                {item}
              </li>
            ))}
          </ul>

          <p className={styles.cardFoot}>
            安装包是否可用及具体版本，以 GitHub Releases 页面为准；也可以按下方说明从源码运行。
          </p>
        </article>

        {/* 版本事实卡 */}
        <aside className={styles.factsCard} data-reveal>
          <h3 className={styles.factsTitle}>关于这个版本</h3>
          <dl className={styles.factsList}>
            {FACTS.map((fact) => (
              <div key={fact.label} className={styles.factRow}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.factsFoot}>
            <IconShieldCheck size={16} />
            <span>备忘录内容保存在本机；检测更新和加载网络图片时会联网。</span>
          </div>
        </aside>
      </section>

      {/* 运行环境 */}
      <section className={`container ${styles.reqs}`} data-reveal>
        <h2 className={styles.reqsTitle}>运行环境</h2>
        <ul className={styles.reqsList}>
          <li>
            <IconMonitor size={17} />
            <div>
              <strong>Windows 10 / 11</strong>
              <span>支持 x64 与 x86 架构</span>
            </div>
          </li>
          <li>
            <IconCpu size={17} />
            <div>
              <strong>无需安装运行时</strong>
              <span>发布版已内置 .NET 8，开箱即用</span>
            </div>
          </li>
          <li>
            <IconShieldCheck size={17} />
            <div>
              <strong>本地运行</strong>
              <span>无联网依赖，数据存于 %AppData%/MemeMomo/</span>
            </div>
          </li>
        </ul>
      </section>

      {/* 帮助行 */}
      <footer className={`container ${styles.helpRow}`} data-reveal>
        <span className={styles.helpLabel}>接下来：</span>
        <Link to="/docs" className={styles.helpLink}>
          阅读文档
          <IconBook size={14} />
        </Link>
        <Link to="/changelog" className={styles.helpLink}>
          看看更新日志
          <IconArrowRight size={14} />
        </Link>
      </footer>
    </main>
  )
}
