// 文档篇章数据源：构建期扫描项目根目录的 content/。
// - 目录可以任意层级嵌套（文件夹套文件夹），.md 文件就是可选择的篇章；
// - 目录里如果有 icon.*（svg / png / …），它就是该目录在侧栏里的图标；
//   svg 会内联渲染以继承主题色，其他格式按图片显示；
// - 静态构建（无后端），全靠 Vite 的 import.meta.glob 把文件编进产物。
// 注意：只有“含 .md 或 icon 的目录”会出现在树里；纯空文件夹无法被 glob 感知。

const mdModules = import.meta.glob<string>('/content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const iconUrlModules = import.meta.glob<string>('/content/**/icon.*', {
  query: '?url',
  import: 'default',
  eager: true,
})

// svg 额外拿一份源码，内联后颜色可跟随主题（currentColor）
const iconSvgModules = import.meta.glob<string>('/content/**/icon.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export interface ContentPage {
  /** 从 content 根算起的路径段（不含扩展名与前缀序号），如 ['快速入门', '安装并启动'] */
  path: string[]
  /** 文件名（去扩展名与序号前缀），即侧栏条目文案 */
  name: string
  /** `01.名称` 形式前缀里的数字，用作排序；无前缀为 null（排在有前缀的之后） */
  order: number | null
  /** 原始 markdown */
  raw: string
}

export interface ContentFolder {
  type: 'folder'
  name: string
  /** 从 content 根算起的路径段 */
  path: string[]
  /** `01.名称` 形式前缀里的数字，用作排序 */
  order: number | null
  /** icon.* 的资源地址（svg 之外的后备展示） */
  iconUrl?: string
  /** icon.svg 的源码，内联渲染以继承主题色 */
  iconSvg?: string
  children: ContentNode[]
  /** 子树内篇章总数（侧栏计数徽标） */
  pageCount: number
}

export interface ContentPageNode {
  type: 'page'
  page: ContentPage
}

export type ContentNode = ContentFolder | ContentPageNode

interface DirNode {
  name: string
  folders: Map<string, DirNode>
  pages: ContentPage[]
  iconUrl?: string
  iconSvg?: string
  order: number | null
}

/** 中文/字母数字混合的自然排序 */
const collator = new Intl.Collator(['zh-Hans-CN', 'en'], { numeric: true })

/** 目录/文件名支持 `01.名称` / `01-名称` / `01_名称` 序号前缀：决定排序，展示与路由用去掉序号的名字 */
const ORDER_PREFIX = /^(\d{1,3})[._-](.+)$/

function parseName(raw: string): { name: string; order: number | null } {
  const m = ORDER_PREFIX.exec(raw)
  return m ? { name: m[2], order: Number(m[1]) } : { name: raw, order: null }
}

function dirAt(root: DirNode, segs: string[]): DirNode {
  let cur = root
  for (const seg of segs) {
    const { name, order } = parseName(seg)
    let next = cur.folders.get(name)
    if (!next) {
      next = { name, folders: new Map(), pages: [], order }
      cur.folders.set(name, next)
    }
    cur = next
  }
  return cur
}

/** '/content/a/b/icon.svg' → 所属目录路径 ['a', 'b']；content 根下的 icon 忽略 */
function iconDirPath(key: string): string[] | null {
  if (!key.startsWith('/content/')) return null
  const segs = key.slice('/content/'.length).split('/')
  return segs.length < 2 ? null : segs.slice(0, -1)
}

const root: DirNode = { name: '', folders: new Map(), pages: [], order: null }

// 1. markdown 文件 → 目录树（dirAt 内部负责解析每段的序号前缀）
for (const [key, raw] of Object.entries(mdModules)) {
  const rel = key.slice('/content/'.length, -'.md'.length)
  const rawSegs = rel.split('/')
  const parsed = rawSegs.map((s) => parseName(s))
  const segs = parsed.map((p) => p.name)
  const last = parsed[parsed.length - 1]
  dirAt(root, rawSegs.slice(0, -1)).pages.push({
    path: segs,
    name: last.name,
    order: last.order,
    raw,
  })
}

// 2. icon.* → 所属目录图标（iconDirPath 给出原始段，dirAt 内部解析前缀；
//    先赋 url，svg 源码随后覆盖为内联展示）
for (const [key, url] of Object.entries(iconUrlModules)) {
  const segs = iconDirPath(key)
  if (segs) dirAt(root, segs).iconUrl = url
}
for (const [key, svg] of Object.entries(iconSvgModules)) {
  const segs = iconDirPath(key)
  if (segs) dirAt(root, segs).iconSvg = svg
}

/** 排序：有序号的排前面（按序号数字），同序号/无序号再按名称自然排序 */
function byOrderThenName(a: { name: string; order: number | null }, b: { name: string; order: number | null }): number {
  const av = a.order ?? Number.POSITIVE_INFINITY
  const bv = b.order ?? Number.POSITIVE_INFINITY
  return av !== bv ? av - bv : collator.compare(a.name, b.name)
}

function toNodes(dir: DirNode, path: string[]): ContentNode[] {
  const folders: ContentNode[] = [...dir.folders.values()]
    .sort((a, b) => byOrderThenName(a, b))
    .map((child) => {
      const childPath = [...path, child.name]
      const children = toNodes(child, childPath)
      const pageCount = children.reduce(
        (n, c) => n + (c.type === 'folder' ? c.pageCount : 1),
        0
      )
      return {
        type: 'folder' as const,
        name: child.name,
        path: childPath,
        order: child.order,
        iconUrl: child.iconUrl,
        iconSvg: child.iconSvg,
        children,
        pageCount,
      }
    })
  const pages: ContentNode[] = dir.pages
    .sort((a, b) => byOrderThenName(a, b))
    .map((page) => ({ type: 'page' as const, page }))
  return [...folders, ...pages]
}

export const CONTENT_TREE: ContentNode[] = toNodes(root, [])

/** 深度优先铺平的篇章列表（顺序即侧栏从上到下的顺序，用于上一篇/下一篇） */
export const CONTENT_PAGES: ContentPage[] = (function flatten(nodes: ContentNode[]): ContentPage[] {
  return nodes.flatMap((n) => (n.type === 'folder' ? flatten(n.children) : [n.page]))
})(CONTENT_TREE)

/** key = path.join('/')（未经 URL 编码） */
export const PAGE_BY_KEY = new Map(CONTENT_PAGES.map((p) => [p.path.join('/'), p]))

export function pageKey(page: ContentPage): string {
  return page.path.join('/')
}

/** 侧栏条目 / 正文路由的 href（逐段编码，保留 / 作分隔） */
export function pageHref(page: ContentPage): string {
  return `/docs/${page.path.map(encodeURIComponent).join('/')}`
}

export function neighbors(page: ContentPage): { prev?: ContentPage; next?: ContentPage } {
  const i = CONTENT_PAGES.indexOf(page)
  return { prev: i > 0 ? CONTENT_PAGES[i - 1] : undefined, next: i < CONTENT_PAGES.length - 1 ? CONTENT_PAGES[i + 1] : undefined }
}
