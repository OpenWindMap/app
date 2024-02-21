import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": __dirname + '/src',
      "~src": __dirname + '/src',
      "~bulma": __dirname + '/node_modules/bulma',
      "~leaflet": __dirname + '/node_modules/leaflet',
      "~font-awesome": __dirname + '/node_modules/font-awesome',
    },
  }
})
