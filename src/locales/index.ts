/*
 * @Author: ChenYu
 * @Date: 2022-04-10 22:34:43
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-10 08:46:49
 * @FilePath: \v3-vite-elementPlus-admin\src\locales\index.ts
 * @Description: 国际化方案
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import { createI18n } from 'vue-i18n'
import enLocale from './lang/en'
import zhLocale from './lang/zh'

const messages = {
  en: {
    ...enLocale,
  },
  // en: {
  //   msg: { test: 'Hi Jonly', ...enLocale },
  // },
  zh: {
    ...zhLocale,
  },
  // zh: {
  //   msg: { test: '你好，布袜子', ...zhLocale },
  // },
}

const locale = 'zh'

const i18n = createI18n({
  // 使用  composition API
  legacy: false,
  // 全局使用 t 函数
  globalInjection: true,
  locale,
  messages,
})

export default i18n
