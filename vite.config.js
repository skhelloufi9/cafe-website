import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ESM Vite config. package.json sets "type": "module" so .js files are ESM.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000'
    }
  }
})
