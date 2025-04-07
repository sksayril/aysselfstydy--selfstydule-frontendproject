import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://7cvccltb-3100.inc1.devtunnels.ms',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    }
  }
});