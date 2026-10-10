// markdown-it 渲染封装：给标题补 id（锚点）、外链新窗口打开。
// 篇章是构建期打包的本地 md，html: false 防止内容里混入原始标签。

import MarkdownIt, { type Token } from 'markdown-it'

const md = new MarkdownIt({ html: false, linkify: true, breaks: false })

/** 标题 slug：保留中英文与数字，空白转连字符 */
function slugify(text: string): string {
  const s = text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]+/gu, '')
    .replace(/\s+/g, '-')
  return s || 'heading'
}

/** 同一篇内 slug 去重计数 */
const usedSlugs = new Map<string, number>()

function uniqueSlug(base: string): string {
  const n = (usedSlugs.get(base) ?? 0) + 1
  usedSlugs.set(base, n)
  return n === 1 ? base : `${base}-${n}`
}

md.renderer.rules.heading_open = (tokens, idx) => {
  const inline = tokens[idx + 1]
  const text = (inline?.children ?? [])
    .filter((t) => t.type === 'text' || t.type === 'code_inline')
    .map((t) => t.content)
    .join('')
  const id = uniqueSlug(slugify(text))
  const tag = tokens[idx].tag
  return `<${tag} id="${id}">`
}

const defaultLinkOpen = md.renderer.rules.link_open
md.renderer.rules.link_open = (tokens, idx, opts, env, self) => {
  const href = String(tokens[idx].attrGet('href') ?? '')
  if (/^https?:\/\//i.test(href)) {
    tokens[idx].attrSet('target', '_blank')
    tokens[idx].attrSet('rel', 'noopener noreferrer')
  }
  return defaultLinkOpen ? defaultLinkOpen(tokens, idx, opts, env, self) : self.renderToken(tokens, idx, opts)
}

// 表格外包一层滚动容器：表格 width:100% 撑满剩余宽度，宽表仍可横向滚动
const defaultTableOpen = md.renderer.rules.table_open
md.renderer.rules.table_open = (tokens, idx, opts, env, self) => {
  const inner = defaultTableOpen ? defaultTableOpen(tokens, idx, opts, env, self) : self.renderToken(tokens, idx, opts)
  return `<div class="table-scroll">${inner}`
}

const defaultTableClose = md.renderer.rules.table_close
md.renderer.rules.table_close = (tokens, idx, opts, env, self) => {
  const inner = defaultTableClose ? defaultTableClose(tokens, idx, opts, env, self) : self.renderToken(tokens, idx, opts)
  return `${inner}</div>`
}

export function renderMarkdown(src: string): string {
  usedSlugs.clear()
  return md.render(src)
}

export interface HeadingInfo {
  /** 标题等级 1-6 */
  level: number
  /** 纯文本标题（去掉行内标记） */
  text: string
  /** 与渲染结果一致的锚点 id */
  slug: string
}

/** 抽取标题树：slug 计算与 heading_open 规则同源同序，保证与正文锚点一一对应 */
export function extractHeadings(src: string): HeadingInfo[] {
  usedSlugs.clear()
  const out: HeadingInfo[] = []
  const tokens = md.parse(src, {})
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type !== 'heading_open') continue
    const inline = tokens[i + 1]
    const text = (inline?.children ?? [])
      .filter((t) => t.type === 'text' || t.type === 'code_inline')
      .map((t) => t.content)
      .join('')
    out.push({ level: Number(tokens[i].tag.slice(1)), text, slug: uniqueSlug(slugify(text)) })
  }
  return out
}

export interface ContentBlock {
  /** 该块的标题路径（按层级截断的各级标题文本），首个标题之前的内容为 [] */
  headings: string[]
  /** 块内最近一个标题的锚点 id（与渲染一致）；首个标题之前的内容为 null */
  slug: string | null
  /** 块内可见文本（含代码块与图片 alt） */
  text: string
}

/** inline token 的可见文本：text/code_inline/图片 alt，换行转空格 */
function inlineTextOf(token: Token | undefined): string {
  return (token?.children ?? [])
    .map((c) => {
      if (c.type === 'text' || c.type === 'code_inline' || c.type === 'image') return c.content
      if (c.type === 'softbreak' || c.type === 'hardbreak') return ' '
      return ''
    })
    .join('')
}

/** 按标题把整篇切成内容块（搜索索引用）：slug 与 extractHeadings/渲染规则同源同序，可作直达锚点 */
export function extractBlocks(src: string): ContentBlock[] {
  usedSlugs.clear()
  const tokens = md.parse(src, {})
  const blocks: ContentBlock[] = []
  let headings: string[] = []
  let slug: string | null = null
  let text = ''
  const push = () => blocks.push({ headings: [...headings], slug, text: text.trim() })

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]
    if (t.type === 'heading_open') {
      push()
      const level = Number(t.tag.slice(1))
      const h = inlineTextOf(tokens[i + 1])
      slug = uniqueSlug(slugify(h))
      headings = [...headings.slice(0, level - 1), h]
    } else if (t.type === 'inline') {
      text += inlineTextOf(t) + '\n'
    } else if (t.type === 'fence' || t.type === 'code_block') {
      text += t.content + '\n'
    }
  }
  push()
  return blocks
}
