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
    sourcemap: false,
    target: 'es2015'
  },
  server: {
    host: '0.0.0.0',
    port: process.env.NODE_ENV === 'production' ? 80 : 5173,
    hmr: {
      port: process.env.NODE_ENV === 'production' ? 80 : 5173
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 80,
    cors: true,
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  }
});