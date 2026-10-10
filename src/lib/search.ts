// 文档搜索：全部 md 原文已在构建期打进 bundle（lib/content.ts），这里把每篇按标题
// 切成内容块建一份内存索引（首次查询时惰性构建）。查询是「多关键词 AND 的子串匹配」，
// 标题命中权重高于正文；文档量级（几十篇）下线性扫描即可，无需分词或倒排结构。

import { CONTENT_PAGES } from './content'
import type { ContentPage } from './content'
import { extractBlocks } from './markdown'

export interface SearchHit {
  page: ContentPage
  /** 结果标题：命中小节的最后一级标题文本（无标题内容则为页面名） */
  title: string
  /** 面包屑：目录 / 页名 / 上级标题（不含 title 自身） */
  crumb: string
  /** 命中小节的锚点 id（与正文渲染一致），null 表示定位页首 */
  slug: string | null
  /** 围绕首个命中词的上下文片段 */
  snippet: string
}

interface IndexedBlock {
  page: ContentPage
  pageOrder: number
  blockOrder: number
  headings: string[]
  slug: string | null
  lowerTitle: string
  body: string
  lowerBody: string
}

let index: IndexedBlock[] | null = null

function buildIndex(): IndexedBlock[] {
  const out: IndexedBlock[] = []
  CONTENT_PAGES.forEach((page, pageOrder) => {
    extractBlocks(page.raw).forEach((b, blockOrder) => {
      // 空块（纯标题间无内容、正文前无导语）不参与匹配
      if (!b.headings.length && !b.text) return
      const title = [page.name, ...b.headings].join(' ')
      out.push({
        page,
        pageOrder,
        blockOrder,
        headings: b.headings,
        slug: b.slug,
        lowerTitle: title.toLowerCase(),
        body: b.text,
        lowerBody: b.text.toLowerCase(),
      })
    })
  })
  return out
}

/** 围绕首个命中位置截取片段；标题命中而无正文命中时回退为正文开头 */
function makeSnippet(body: string, firstBodyHit: number): string {
  if (firstBodyHit < 0) return body.length > 140 ? body.slice(0, 140) + '…' : body
  const start = Math.max(0, firstBodyHit - 40)
  const end = Math.min(body.length, firstBodyHit + 140)
  return (start > 0 ? '…' : '') + body.slice(start, end).trim() + (end < body.length ? '…' : '')
}

/**
 * 检索全部文档篇章。limit 为返回条数上限；同一篇章最多保留 3 个命中块，
 * 避免单页长文霸屏。排序：标题命中多者在前，其次按侧栏与文档内的自然顺序。
 */
export function searchDocs(query: string, limit = 30): SearchHit[] {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  if (!tokens.length) return []
  index ??= buildIndex()

  interface Scored extends SearchHit {
    pageOrder: number
    blockOrder: number
    score: number
  }
  const scored: Scored[] = []
  for (const b of index) {
    let score = 0
    let titleHits = 0
    let firstBodyHit = -1
    let matched = true
    for (const t of tokens) {
      const inTitle = b.lowerTitle.includes(t)
      const bodyAt = b.lowerBody.indexOf(t)
      if (!inTitle && bodyAt < 0) {
        matched = false
        break
      }
      if (inTitle) titleHits++
      if (bodyAt >= 0) {
        score += 2
        if (firstBodyHit < 0 || bodyAt < firstBodyHit) firstBodyHit = bodyAt
      }
    }
    if (!matched) continue
    score += titleHits * 10 + (titleHits === tokens.length ? 15 : 0)

    const headings = b.headings
    scored.push({
      page: b.page,
      title: headings.length ? headings[headings.length - 1] : b.page.name,
      crumb: [...b.page.path.slice(0, -1), b.page.name, ...headings.slice(0, -1)].join(' / '),
      slug: b.slug,
      snippet: makeSnippet(b.body, firstBodyHit),
      pageOrder: b.pageOrder,
      blockOrder: b.blockOrder,
      score,
    })
  }
  scored.sort((a, z) => z.score - a.score || a.pageOrder - z.pageOrder || a.blockOrder - z.blockOrder)

  const perPage = new Map<string, number>()
  const hits: SearchHit[] = []
  for (const r of scored) {
    const key = r.page.path.join('/')
    const n = perPage.get(key) ?? 0
    if (n >= 3) continue
    perPage.set(key, n + 1)
    hits.push(r)
    if (hits.length >= limit) break
  }
  return hits
}
