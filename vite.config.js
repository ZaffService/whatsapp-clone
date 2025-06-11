
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    cssMinify: false, // Désactive la minification CSS temporairement
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['json-server']
        }
      }
    }
  },
  server: {

    port: 5173,











    open: true
  }
})
