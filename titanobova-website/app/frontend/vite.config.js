import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'api': ['axios'],
        },
      },
    },
    // Minify and optimize
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    // Optimize for production
    target: 'ES2020',
  },
  server: {
    // Dev server settings
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
      },
    },
  },
  preview: {
    port: 5173,
  },
})
