// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'auth/login.html'),
        join: resolve(__dirname, 'auth/join.html'),
        app: resolve(__dirname, 'learn/app.html'),
        configure: resolve(__dirname, 'learn/create/configure.html'),
      },
    },
  },
})