import { defineConfig } from 'vite';

export default defineConfig({
  base: '/SE_Events_platform_FE/', // Add this line
  build: {
    outDir: 'dist', // Ensure it's using the correct folder
  }
});