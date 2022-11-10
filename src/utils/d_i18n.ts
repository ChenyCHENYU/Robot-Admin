/*
 * @Author: ChenYu
 * @Date: 2022-04-11 13:42:19
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-10 08:45:26
 * @FilePath: \v3-vite-elementPlus-admin\src\utils\d_i18n.ts
 * @Description: 处理i18n国际化
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import i18n from '@/locales' // 用于.ts/js文件
import { s_appStore } from '_store/app'
const { t } = i18n.global

/**
 * @description: 处理快捷搜索中的语言转换
 * @param {} cbs
 * @return {*}
 */
function d_watchSwitchLang(...cbs: any) {
  const appStore = s_appStore()
  watch(
    () => appStore.language,
    () => {
      cbs.forEach((cb) => cb(appStore.language))
    }
  )
}

export { t, d_watchSwitchLang }
