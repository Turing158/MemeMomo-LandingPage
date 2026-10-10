// 页脚：简约单行布局 —— 品牌 + 导航 + GitHub，下面一行版权。

import styles from './Footer.module.css'
import { Link } from 'react-router-dom'
import { SITE } from '../lib/site'
import { IconGithub } from './icons'
import appIcon from '../assets/appicon.png'

const NAV = [
  { to: '/', label: '首页' },
  { to: '/docs', label: '文档' },
  { to: '/download', label: '下载' },
  { to: '/changelog', label: '更新日志' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <Link to="/" className={styles.brand}>
            <img src={appIcon} alt="MemeMomo 图标" className={styles.logo} />
            <span className={styles.name}>MemeMomo</span>
          </Link>

          <nav className={styles.nav} aria-label="页脚导航">
            {NAV.map((link) => (
              <Link key={link.to} to={link.to} className={styles.link}>
                {link.label}
              </Link>
            ))}
          </nav>

          <a
            href={SITE.repoUrl}
            className={styles.iconBtn}
            aria-label="GitHub 仓库"
            title="GitHub 仓库"
            target="_blank"
            rel="noreferrer"
          >
            <IconGithub size={17} />
          </a>
        </div>

        <p className={styles.copyright}>
          © 2026 MemeMomo · MIT License · {SITE.version}
        </p>
      </div>
    </footer>
  )
}
