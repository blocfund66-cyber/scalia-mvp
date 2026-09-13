import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/pay-gateway': {
        target: 'https://pay.reeserva.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/pay-gateway/, ''),
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            delete proxyRes.headers['x-frame-options'];
            delete proxyRes.headers['content-security-policy'];
          });
        }
      },
      '/_next': {
        target: 'https://pay.reeserva.com',
        changeOrigin: true,
        secure: true,
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            delete proxyRes.headers['x-frame-options'];
            delete proxyRes.headers['content-security-policy'];
          });
        }
      },
      '/api/webhook': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/api/payout': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/api': {
        target: 'https://pay.reeserva.com',
        changeOrigin: true,
        secure: true
      }
    }
  }
})
