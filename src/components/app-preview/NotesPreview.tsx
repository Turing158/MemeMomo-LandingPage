import { NoteChrome } from './Chrome'
import { NativeIcon } from './NativeIcon'
import styles from './AppPreview.module.css'

function Reminder() {
  return <div className={styles.reminderBody}>
    <div className={styles.reminderCard}>
      <div className={styles.quickTimes}>{['1分钟后', '10分钟后', '半小时后', '1小时后'].map((time) => <span key={time}>{time}</span>)}</div>
      <div className={styles.dateField}><span>2026-10-10</span><NativeIcon name="chevron" size={16} /></div>
      <div className={styles.timeWheels}>{[
        { label: '时', values: ['12', '13', '14'] },
        { label: '分', values: ['17', '18', '19'] },
        { label: '秒', values: ['55', '56', '57'] },
      ].map((wheel) => <div key={wheel.label} className={styles.timeWheel}>
        <div className={styles.timeLabel}>{wheel.label}</div>
        <div className={styles.wheelValues}>{wheel.values.map((value, index) => <span key={value} data-selected={index === 1 || undefined}>{value}</span>)}</div>
      </div>)}</div>
    </div>
    <div className={styles.reminderActions}><span>取消</span><span className={styles.primaryAction}>设置提醒</span></div>
  </div>
}

export default function NotesPreview({ screen }: { screen: 'note' | 'draft' | 'reminder' }) {
  const draft = screen === 'draft'
  return <>
    <NoteChrome draft={draft} reminder={screen === 'reminder'} />
    {screen === 'reminder' ? <Reminder /> : <div className={styles.noteBody}>
      <div className={styles.markdown}>
        {draft ? <><h1>一个突然冒出来的想法</h1><p>做一本自己的生活灵感集。</p><p>把路上遇见的好风景、读到的好句子，<br />还有想尝试的小事，都慢慢收集起来。</p></>
          : <><h1>周末，去公园走走</h1><p>带上相机，走一条没走过的小路。</p><ul><li>在树荫下读几页书</li><li>买一杯喜欢的咖啡</li><li>把好心情带回家</li></ul></>}
      </div>
      <time className={styles.noteTime}>{draft ? '15:25' : '12:46'}</time>
    </div>}
  </>
}
