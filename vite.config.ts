import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import viteEslint from 'vite-plugin-eslint';
import viteStylelint from 'vite-plugin-stylelint';
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules';
import vueJsx from '@vitejs/plugin-vue-jsx';
// https://vitejs.dev/config/
export default defineConfig({
  mode: 'development',
  root: './src/renderer',
  base: './',
  plugins: [
    vue(),
    vueJsx(),
    optimizeCssModules(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: 'src/types/auto-imports.d.ts', // 用于生成自动导入到类型，方便代码提示
      imports: ['vue', 'pinia', 'vue-router'],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ['src/no-use'], // 除了 element-plus 其余不使用
      dts: 'src/types/components.d.ts'
    }),
    viteEslint(),
    viteStylelint()
  ],
  resolve: {
    alias: {
      '@renderer': resolve(__dirname, 'src/renderer/src'),
    }
  },
  server: {
    open: true,
  },
});
