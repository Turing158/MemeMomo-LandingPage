import styles from './Features.module.css'
import { IconClock, IconFolderLock, IconListChecks, IconMagnet, IconPencil, IconTable, IconTrash } from '../components/icons'

const FEATURES = [
  { icon: IconListChecks, title: '给待办，一个清晰的状态', description: '备忘录可以转换为任务，五类状态串起进度。自定义名称、颜色与图标，按类型和状态筛选，让未结束的事排在前面。', span: 'wide' },
  { icon: IconPencil, title: '灵感来了，在鼠标旁记下', description: 'Ctrl + Alt + Q 打开便签草稿，Ctrl + Enter 保存。剪贴板里的好内容，也能用 Ctrl + Alt + C 一步收集。', span: 'small' },
  { icon: IconTable, title: '写 Markdown，更顺手', description: '标题、列表、引用和表格自然排版。图片支持粘贴与拖入，代码块可选语言，让记录保持自己的样子。', span: 'third' },
  { icon: IconTrash, title: '想找回来？去回收站看看', description: '删除的内容先收进回收站，预览原文后再恢复。也支持单条彻底删除与全部清空，重要想法多一份余地。', span: 'third' },
  { icon: IconClock, title: '提醒，和任务一起走', description: '在便签里设置日期与时、分、秒。完成或取消任务时，关联提醒自动取消；重新打开后可以再次安排。', span: 'third' },
  { icon: IconMagnet, title: '在眼前，也在屏幕边缘', description: '卡片拖出即成独立便签，贴边时收成标签。置顶、任务栏按钮和窗口位置，都可以按自己的习惯安排。', span: 'small' },
  { icon: IconFolderLock, title: '想法在手边，数据在本机', description: '保存后的备忘录在停止编辑后自动保存，并保留备份。备忘录、任务状态、设置和图片，都留在自己的电脑里。', span: 'wide' },
] as const

export default function Features() {
  return (
    <section className={'section ' + styles.section} id="features">
      <div className="container">
        <header className="sectionHead" data-reveal>
          <p className="eyebrow">为日常，添一点顺手</p>
          <h2 className="sectionTitle">从随手一记，<span className="marker">到一件件完成</span></h2>
          <p className="sectionDesc">记录、安排、提醒、找回。小小的桌面空间，也能照顾想法的每一步。</p>
        </header>
        <div className={styles.grid}>
          {FEATURES.map((item) => <article className={styles.card + ' ' + styles[item.span]} key={item.title} data-reveal>
            <span className={styles.icon}><item.icon size={21} /></span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>)}
        </div>
      </div>
    </section>
  )
}
