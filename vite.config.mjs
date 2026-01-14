import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ESM Vite config. Using .mjs avoids changing package.json "type".
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000'
    }
  }
})
