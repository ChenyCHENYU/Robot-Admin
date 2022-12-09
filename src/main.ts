/*
 * @Author: ChenYu
 * @Date: 2022-03-03 23:38:18
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-09 15:20:46
 * @FilePath: \vue3_vite3_elementPlus_admin\src\main.ts
 * @Description: vue main.ts 入口加载文件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import directives from '@/directives/index'
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
import './permission'
import router from './router'
import { _app_use } from './utils'
// 打印指令
import installDirective from '@/directives/install'
// 处理控制台出现 Added non-passive event listener to a scroll-blocking 'touchstart' event. Consider marking event handler as 'passive' to make the page more responsive 的异常
import 'default-passive-events'

const app = createApp(App)

installDirective(app)

// 全局批量注册指令
// _app_use(app, 'directive', directives)

// 全批量注册ICON组件
_app_use(app, 'component', Icons, 'ElIcon')

app
  .use(router)
  .use(createPinia())
  .use(directives)
  // FIXME: 目前elmentPlus暂不支持i18集成方案，无法做到实时同步切换
  .use(ElementPlus, { locale: s_appStore().language === 'en' ? en : zhCn })
  .use(i18n)
  .mount('#app')
