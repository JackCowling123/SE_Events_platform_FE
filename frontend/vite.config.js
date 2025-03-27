import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/SE_Events_platform_FE/',
  build: {
    outDir: 'dist'
  },
  server: {
    historyApiFallback: true,
  },
});
