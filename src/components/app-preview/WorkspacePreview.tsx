import type { TaskStatus } from '../../data/product'
import { CheckMark, ReturnRow, ScrollThumb, StatusSelector, taskStyle } from './Chrome'
import { NativeIcon, TaskIcon } from './NativeIcon'
import styles from './AppPreview.module.css'

const memos: { title: string; subtitle: string; time: string; status?: TaskStatus }[] = [
  { title: '把今天，慢慢整理好', subtitle: '先把脑海里的想法写下来，再一件件完成。', time: '13:03', status: 'doing' },
  { title: '周末，去公园走走', subtitle: '带上相机，走一条没走过的小路。', time: '12:46' },
  { title: '整理本周的读书笔记', subtitle: '把书里的好句子留在手边。', time: '12:23', status: 'done' },
  { title: '做一个自己的小工具', subtitle: '从一个简单的想法开始。', time: '11:38', status: 'todo' },
  { title: '等灵感再发芽', subtitle: '想法先放一放，也没有关系。', time: '10:58', status: 'paused' },
  { title: '关于生活的小清单', subtitle: '记得喝水，也记得抬头看看窗外。', time: '09:38' },
]
const deletedMemos = [
  { title: '留给下次的旅行计划', subtitle: '有些计划，只是暂时搁置。', time: '12:08' },
  { title: '上一版的周末清单', subtitle: '给新的安排腾一点位置。', time: '昨天 13:08' },
]

function EditorToolbar() {
  return <div className={styles.editorToolbar}>
    <StatusSelector />
    <span className={styles.quickComplete}><NativeIcon name="selection" size={16} /></span>
    <div className={styles.formatTools}>
      <span className={styles.boldTool}>B</span><span className={styles.italicTool}>I</span>
      <span className={styles.boldTool}>h</span><span className={styles.strikeTool}>S</span><span className={styles.underlineTool}>U</span>
      <span className={styles.extendedTool}><NativeIcon name="table" /></span>
      <span className={styles.extendedTool}><NativeIcon name="list" /></span>
      <span className={styles.extendedTool + ' ' + styles.monoTool}>1.</span>
      <span className={styles.extendedTool + ' ' + styles.monoTool}>[ ]</span>
      <span className={styles.extendedTool}>&gt;</span>
      <span className={styles.extendedTool + ' ' + styles.codeTool}>&lt;/&gt;</span>
      <span className={styles.extendedTool + ' ' + styles.monoTool}>{'```'}</span>
      <span className={styles.extendedTool + ' ' + styles.monoTool}>---</span>
      <span className={styles.extendedTool}><NativeIcon name="link" /></span>
      <span className={styles.extendedTool}><NativeIcon name="image" /></span>
      <span className={styles.extendedTool}><NativeIcon name="remoteImage" /></span>
    </div>
    <div className={styles.editorActions}>
      <span className={styles.extendedTool + ' ' + styles.monoTool}>MD</span>
      <span className={styles.compactMore}><NativeIcon name="more" /></span>
      <span className={styles.saveTool}><NativeIcon name="save" /></span>
      <span><NativeIcon name="plus" size={21} /></span>
    </div>
  </div>
}

function WorkspaceDocument() {
  return <div className={styles.markdown}>
    <h1>把今天，慢慢整理好</h1>
    <p>先把脑海里的想法写下来，再一件件完成。</p>
    <h2>今天的小计划</h2>
    <div className={styles.taskList}>
      <div><CheckMark checked /><span>整理本周的读书笔记</span></div>
      <div><CheckMark /><span>完成桌面备忘录的界面设计</span></div>
      <div><CheckMark /><span>傍晚出去走一走</span></div>
    </div>
    <blockquote>留一点空间，给突然到来的灵感。</blockquote>
    <h2>随手记</h2>
    <p className={styles.beforeTable}>用 <strong>Markdown</strong> 记录重点，用任务状态安排进度。</p>
    <div className={styles.tableFrame}>
      <table><colgroup><col style={{ width: '37%' }} /><col /></colgroup><thead><tr><th>时间</th><th>安排</th></tr></thead>
        <tbody><tr><td>上午</td><td>专注写作</td></tr><tr><td>下午</td><td>整理与回顾</td></tr></tbody>
      </table>
    </div>
  </div>
}

function RecycleDocument() {
  return <div className={styles.markdown + ' ' + styles.recycleDocument}>
    <h1>留给下次的旅行计划</h1>
    <p>有些计划，只是暂时搁置。</p>
    <ul><li>找一家安静的咖啡馆</li><li>去看看清晨的海</li><li>寄一张写满近况的明信片</li></ul>
    <blockquote>想起的时候，还可以接着写。</blockquote>
  </div>
}

export default function WorkspacePreview({ recycle = false }: { recycle?: boolean }) {
  return <div className={styles.workspace} data-recycle={recycle || undefined}>
    <div className={styles.memoPane}>
      {recycle && <div className={styles.recycleTools}><ReturnRow>回收站（2）</ReturnRow><span><NativeIcon name="trash" size={18} /></span></div>}
      <div className={styles.memoList}>
        {(recycle ? deletedMemos : memos).map((memo: (typeof memos)[number], index) =>
          <div key={memo.title} className={styles.memoCard} data-selected={index === 0 || undefined} data-task={memo.status || undefined} style={memo.status ? taskStyle(memo.status) : undefined}>
            <i className={styles.cardStripe} />
            {recycle && <span className={styles.restoreIcon}><NativeIcon name="restore" size={14} /></span>}
            <div className={styles.cardContent}>
              <div className={styles.cardHeading}>
                <span className={styles.cardTitle} data-task={memo.status || undefined}>{memo.title}</span>
                {memo.status && <span className={styles.cardStatus}><TaskIcon status={memo.status} size={16} /></span>}
                {recycle && <span className={styles.cardDelete}><NativeIcon name="delete" size={12} /></span>}
              </div>
              <div className={styles.cardSubline}><span>{memo.subtitle}</span><time>{memo.time}</time></div>
            </div>
          </div>)}
      </div>
      {!recycle && <ScrollThumb className={styles.memoScroll} />}
    </div>
    <div className={styles.editor}>
      {!recycle && <EditorToolbar />}
      <div className={styles.documentViewport}>{recycle ? <RecycleDocument /> : <WorkspaceDocument />}</div>
      {!recycle && <ScrollThumb className={styles.editorScroll} />}
    </div>
  </div>
}
