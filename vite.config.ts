import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import fs from 'fs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// Custom plugin to copy index.html to 404.html after build
function copy404Plugin() {
  return {
    name: 'copy-404',
    closeBundle() {
      const dist = path.resolve(__dirname, 'dist')
      const indexPath = path.join(dist, 'index.html')
      const notFoundPath = path.join(dist, '404.html')
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/thrive-board/',
  plugins: [vue(), vueDevTools(), tailwindcss(), copy404Plugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
