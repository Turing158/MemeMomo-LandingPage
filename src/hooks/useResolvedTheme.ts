import { useSyncExternalStore } from 'react'

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

function snapshot() {
  return document.documentElement.classList.contains('dark') ? 'dark' as const : 'light' as const
}

// Observe the applied site theme, including system changes and the navbar toggle.
export function useResolvedTheme() {
  return useSyncExternalStore(subscribe, snapshot, () => 'light' as const)
}
