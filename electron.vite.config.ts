import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import vue from '@vitejs/plugin-vue';
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import viteEslint from 'vite-plugin-eslint';
import viteStylelint from 'vite-plugin-stylelint';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { UserConfigExport } from 'vite';

export const RENDERER_CONFIG: UserConfigExport = {
  resolve: {
    alias: {
      '@renderer': resolve(__dirname, 'src/renderer/src/'),
      '@typings': resolve(__dirname, 'src/renderer/src/typings/'),
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    optimizeCssModules(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: '../typings/auto-imports.d.ts', // 用于生成自动导入到类型，方便代码提示
      imports: ['vue', 'pinia', 'vue-router'],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ['src/no-use'], // 除了 element-plus 其余不使用
      dts: '../typings/components.d.ts'
    }),
    viteEslint(),
    viteStylelint(),
  ],
};

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@renderer': resolve(__dirname, 'src/renderer/src'),
        '@typings': resolve(__dirname, 'src/renderer/src/typings/'),
    }
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    ...RENDERER_CONFIG,
  }
});
