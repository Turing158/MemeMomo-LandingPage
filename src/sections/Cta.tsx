// 行动号召：暖色渐变卡 + 便签装饰 + GitHub 按钮。

import styles from './Cta.module.css'
import { Link } from 'react-router-dom'
import { SITE } from '../lib/site'
import { IconArrowRight, IconGithub } from '../components/icons'

export default function Cta() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.card} data-reveal>
          <div className={styles.dots} aria-hidden />
          <div className={styles.noteA} aria-hidden>
            今天也要<br />开心鸭
          </div>
          <div className={styles.noteB} aria-hidden>
            momo~
          </div>

          <div className={styles.inner}>
            <h2 className={styles.title}>
              准备好让想法
              <span className={styles.highlight}>停在桌面上</span>了吗？
            </h2>
            <p className={styles.desc}>
              从一条便签到一个完成的待办。免费、开源，记录留在你自己的电脑里。
            </p>
            <div className={styles.row}>
              <a className={`btn btnPrimary ${styles.btn}`} href={SITE.repoUrl} target="_blank" rel="noreferrer">
                <IconGithub size={17} />
                在 GitHub 查看源码
              </a>
              <Link className={styles.link} to="/#quickstart">
                先看快速开始
                <IconArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
