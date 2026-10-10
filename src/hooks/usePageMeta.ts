import { useEffect } from 'react'

export interface PageMeta {
  title: string
  description: string
}

/**
 * SPA 只有一个 HTML 壳，每个页面挂载时改写 <title> 与 meta description，
 * 卸载时不还原（下一个页面会立刻覆盖）。
 */
export function usePageMeta({ title, description }: PageMeta): void {
  useEffect(() => {
    document.title = title

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = description
  }, [title, description])
}
