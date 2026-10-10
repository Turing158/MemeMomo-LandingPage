// 顶部导航：悬浮胶囊（与 CodeCraft-ps 的全宽顶栏区分），
// 毛玻璃 + 圆角 + 顶部留白；主题按钮在 浅色/深色/跟随系统 间循环。

import styles from './Navbar.module.css'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTheme, type ThemeMode } from '../lib/theme'
import { SITE } from '../lib/site'
import { IconGithub, IconMonitor, IconMoon, IconSun } from './icons'
import appIcon from '../assets/appicon.png'

const LINKS = [
  { to: '/', label: '首页', end: true },
  { to: '/docs', label: '文档', end: false },
  { to: '/download', label: '下载', end: false },
  { to: '/changelog', label: '更新日志', end: false },
]

const THEME_ICON: Record<ThemeMode, typeof IconSun> = {
  light: IconSun,
  dark: IconMoon,
  system: IconMonitor,
}

const THEME_LABEL: Record<ThemeMode, string> = {
  light: '浅色主题',
  dark: '深色主题',
  system: '跟随系统',
}

export default function Navbar() {
  const { mode, cycle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const ThemeIcon = THEME_ICON[mode]

  return (
    <header className={`${styles.wrap} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.bar} aria-label="站内导航">
        <Link to="/" className={styles.brand}>
          <img src={appIcon} alt="MemeMomo 图标" className={styles.logo} />
          <span className={styles.name}>MemeMomo</span>
          <span className={styles.version}>{SITE.version}</span>
        </Link>

        <ul className={styles.links}>
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                viewTransition={link.to !== pathname}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.linkActive : ''}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={cycle}
            aria-label={`切换主题，当前：${THEME_LABEL[mode]}`}
            title={`主题：${THEME_LABEL[mode]}（点击切换）`}
          >
            <ThemeIcon size={17} />
          </button>
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
      </nav>
    </header>
  )
}
