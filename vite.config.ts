import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      sonner: 'sonner', // Ensure Vite can locate this dependency
    },
  },
  build: {
    rollupOptions: {
      external: [], // optional safeguard
    },
  },
})
