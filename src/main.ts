/*
 * @Author: ChenYu
 * @Date: 2022-03-03 23:38:18
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-11 18:19:34
 * @FilePath: \vue3_vite3_elementPlus_admin\src\main.ts
 * @Description: vue main.ts 入口加载文件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import { directives } from '@/directives'
import i18n from '@/locales'
import '@/styles/index.scss'
import * as Icons from '@element-plus/icons-vue'
import '@purge-icons/generated'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import { s_appStore } from '_store/app'
import App from './App.vue'
import './mock'
import './permission'
import router from './router'
import { _app_use } from './utils'
// 打印指令
import installDirective from '@/directives/install'

console.log('Icons ==>', Icons)

const app = createApp(App)

installDirective(app)

// 全局批量注册指令
_app_use(app, 'directive', directives)

// 全批量注册ICON组件
_app_use(app, 'component', Icons, 'ElIcon')

app
  .use(router)
  .use(createPinia())
  // FIXME: 目前elmentPlus暂不支持i18集成方案，无法做到实时同步切换
  .use(ElementPlus, { locale: s_appStore().language === 'en' ? en : zhCn })
  .use(i18n)
  .mount('#app')
