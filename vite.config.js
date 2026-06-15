import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Handle client-side routing in dev
    historyApiFallback: true,
  },
  preview: {
    port: 5000,
  },
})
