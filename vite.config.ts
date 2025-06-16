import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
    sourcemap: false,
    target: 'es2015'
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      port: 5173
    },
    proxy: {
      '/api': {
        target: '0.0.0.0:3001',
        changeOrigin: true,
        secure: false, // setează false dacă ai certificat self-signed
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 8080,
    cors: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'triplefunn.ro',
      'www.triplefunn.ro',
      '*.triplefunn.ro'
    ],
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  }
});
