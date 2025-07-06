import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  server: {
    proxy: {
      '/v1': {
        target: 'http://localhost:4000/api',
        changeOrigin: true
      }
    }
  },
  plugins: [react(),
  tailwindcss(),
  ],

  esbuild: {
    drop: ['console', 'debugger'],
  },



})
