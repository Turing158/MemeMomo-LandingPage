import { TASK_STATUSES } from '../../data/product'
import { NativeIcon, TaskIcon } from './NativeIcon'
import { ReturnRow, ScrollThumb, taskStyle } from './Chrome'
import styles from './AppPreview.module.css'

export default function StatusPreview() {
  return <div className={styles.settings}>
    <ReturnRow>管理状态</ReturnRow>
    <div className={styles.managerViewport}>
      <div className={styles.managerForm}>
        <div className={styles.settingsCard}>
          <div className={styles.managerHeading}><strong>状态列表</strong><span>{TASK_STATUSES.length} 个状态</span></div>
          <p className={styles.managerDescription}>选择状态，编辑名称、颜色和图标。</p>
          <div className={styles.statusList}>
            {/* The captured scroll position shows four rows; the fifth is below the viewport. */}
            <div className={styles.statusListClip}>{TASK_STATUSES.slice(0, 4).map((status, index) => <div key={status.id} className={styles.statusRow} style={taskStyle(status.id)} data-selected={index === 0 || undefined}>
              <span className={styles.statusGlyph}><TaskIcon status={status.id} /></span>
              <div><strong>{status.label}</strong><p>内置状态 · 1 条任务</p></div>
              {index === 0 && <NativeIcon name="selection" size={14} />}
            </div>)}</div>
            <ScrollThumb className={styles.statusListScroll} />
          </div>
          <div className={styles.statusActions}><span className={styles.settingAction}>新增状态</span><span className={styles.moveUp}><NativeIcon name="down" /></span><span><NativeIcon name="down" /></span></div>
        </div>
        <div className={styles.settingsCard + ' ' + styles.statusDetails}>
          <strong className={styles.settingLabel}>状态详情</strong>
          <p className={styles.managerDescription}>内置状态的名称和类别不能修改。</p>
          <div className={styles.detailLabel}>状态名称</div><div className={styles.detailField + ' ' + styles.nameField}>待办</div>
          <div className={styles.detailLabel}>基础类别</div><div className={styles.detailField + ' ' + styles.disabled}><span>待办</span><NativeIcon name="down" size={12} /></div>
          <div className={styles.detailPair}><div><div className={styles.detailLabel}>颜色</div><div className={styles.detailField}><span className={styles.detailColor} />蓝色<NativeIcon name="down" size={12} /></div></div><div><div className={styles.detailLabel}>图标</div><div className={styles.detailField}><TaskIcon status="todo" />圆圈<NativeIcon name="down" size={12} /></div></div></div>
        </div>
      </div>
      <ScrollThumb className={styles.managerScroll} />
    </div>
  </div>
}
