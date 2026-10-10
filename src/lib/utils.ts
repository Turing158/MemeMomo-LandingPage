// 通用工具：类名拼接 + 项目仓库链接。

import { SITE } from './site'

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ')
}

export const GITHUB_URL = SITE.repoUrl

/** 拼接 GitHub 相关链接 */
export function github(path = ''): string {
  return `${SITE.repoUrl}${path}`
}
