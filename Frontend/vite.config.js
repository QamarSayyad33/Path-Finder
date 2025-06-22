import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',  // Your backend URL
        changeOrigin: true,  // Ensures correct origin headers
        secure: false,  // Set this to true if you're using HTTPS in the backend
      },
    },
  },
})
