import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  // Relative asset paths so the built gallery works from any subpath
  // (GitHub Pages serves it under /way2-static-frontend-prototype/ui/).
  base: './'
});
