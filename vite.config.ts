import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' 让 dist 可以直接以 file:// 或任意子路径打开（与 CodeCraft-ps 一致）
export default defineConfig({
  base: './',
  plugins: [react()],
})
