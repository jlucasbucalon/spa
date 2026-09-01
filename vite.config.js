import { defineConfig } from 'vite'

export default defineConfig({
  appType: 'spa',
  base: './',
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: false,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    target: 'esnext',
    cssCodeSplit: true,
  },
})
