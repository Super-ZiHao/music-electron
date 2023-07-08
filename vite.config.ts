import { defineConfig } from 'vite';
import { RENDERER_CONFIG } from './electron.vite.config';
// https://vitejs.dev/config/
export default defineConfig({
  mode: 'development',
  root: './src/renderer',
  base: './',
  ...RENDERER_CONFIG,
  server: {
    open: true,
  },
});
