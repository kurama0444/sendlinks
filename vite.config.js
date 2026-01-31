import { defineConfig } from 'vite';

export default defineConfig({
  base: '/sendlinks/', // Add this line for GitHub Pages deployment
  build: {
    outDir: 'dist',
  },
});
