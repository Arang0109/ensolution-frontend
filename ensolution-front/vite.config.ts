import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@api': path.resolve(__dirname, './src/common/api'),
      '@model': path.resolve(__dirname, './src/common/model'),
      '@routes': path.resolve(__dirname, './src/common/routes'),
      '@utils': path.resolve(__dirname, './src/common/utils'),
      '@home': path.resolve(__dirname, './src/features/home'),
      '@auth': path.resolve(__dirname, './src/features/auth'),
      '@agency': path.resolve(__dirname, './src/features/agency'),
      '@company': path.resolve(__dirname, './src/features/company'),
      '@workplace': path.resolve(__dirname, './src/features/workplace'),
      '@stack': path.resolve(__dirname, './src/features/stack'),
      '@pollutant': path.resolve(__dirname, './src/features/pollutant'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
