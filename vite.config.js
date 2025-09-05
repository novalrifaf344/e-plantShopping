// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set GitHub Pages base path in production (change if your repo name differs)
const repoName = 'e-plantShopping';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? `/${repoName}/` : '/',
  plugins: [react()],
}));
