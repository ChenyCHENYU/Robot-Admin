/*
 * @Author: ChenYu
 * @Date: 2022-03-03 23:38:18
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-18 08:58:14
 * @FilePath: \vue3_vite3_elementPlus_admin\vite.config.ts
 * @Description: vite 配置文件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
//配置使用 jsx
import vueJsx from '@vitejs/plugin-vue-jsx'
// 扩展 setup语法糖，使其识别
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// 自动按需引入组件，替代手动封装的方式，性能更好
import autoInstallComponents from 'unplugin-vue-components/vite'
// 处理外部图标库图标的自动引入
import iconsResolver from 'unplugin-icons/resolver'
import iconifys from 'unplugin-icons/vite'
// 自动引入
import autoImport from 'unplugin-auto-import/vite'

// 处理自定义svg icon 咱设计师自己设计的个性化 icon
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 启动优化配置
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
// 第三方图标库封装动态使用
import PurgeIcons from 'vite-plugin-purge-icons'

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  // TODO: 可以通过 env 获取到所有环境定义的环境变量
  const env = loadEnv(mode, __dirname)
  console.log('env=>', env)
  return {
    // base: '/', // 开发获生产环境服务的公共基础路径
    plugins: [
      vue(),
      vueJsx(),
      vueSetupExtend(),
      autoImport({
        dts: './src/auto-imports.d.ts',
        // 这里除了引入 vue 以外还可以引入pinia、vue-router、vueuse等，
        // 甚至你还可以使用自定义的配置规则，见 https://github.com/antfu/unplugin-auto-import#configuration
        imports: [
          'vue',
          'vue-router',
          'pinia',
          // {
          //   '@vueuse/core': ['useStorage', 'useStorageAsync'],
          // },
        ],
        // 第三方组件库的解析器
        // resolvers: [],
        // Generate corresponding .eslintrc-auto-import.json file.
        // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
      autoInstallComponents({
        dirs: ['src/components'], // 按需加载的文件夹
        dts: './src/components.d.ts',
        resolvers: [iconsResolver()],
      }),
      iconifys({
        compiler: 'vue3',
        autoInstall: true,
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
        // 指定symbolId格式
        symbolId: 'i-[dir]-[name]',
      }),
      PkgConfig(),
      OptimizationPersist(),
      PurgeIcons({
        /* PurgeIcons Options */
      }),
    ],
    server: {
      port: 8888,
      open: true,
      proxy: {
        '^/api': {
          target: 'http://121.89.210.252:3000/mock/2228/', //代理接口
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        _c: fileURLToPath(new URL('./src/components', import.meta.url)),
        _views: fileURLToPath(new URL('./src/views', import.meta.url)),
        _hooks: fileURLToPath(new URL('./src/hooks', import.meta.url)),
        _utils: fileURLToPath(new URL('./src/utils', import.meta.url)),
        _store: fileURLToPath(new URL('./src/store', import.meta.url)),
        _api: fileURLToPath(new URL('./src/api', import.meta.url)),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      },
    },
  }
})
