/*
 * @Description: 主题钩子
 * @Author: Cheny ycyplus@gmail.com
 * @Date: 2022-12-13 17:26:26
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-13 18:10:09
 * @FilePath: \vue3_vite3_elementPlus_admin\src\hooks\useTheme\index.ts
 * Copyright (c) 2022 西安天智 AgileTeam by Cheny email: ycyplus@gmail.com, All Rights Reserved.
 */

import { DEFAULT_PRIMARY } from '@/constant'
import { s_globalStore } from '@/store'
import { d_ElMessage } from '@/utils/d_tips'
import { getDarkColor, getLightColor } from '@/utils/theme/tool'

/**
 * @description 切换主题
 * */
export const useTheme = () => {
  const globalStore = s_globalStore()
  const themeConfig = computed(() => globalStore.themeConfig)

  // 切换暗黑模式
  const switchDark = () => {
    const body = document.documentElement as HTMLElement
    if (themeConfig.value.isDark) body.setAttribute('class', 'dark')
    else body.setAttribute('class', '')
    changePrimary(themeConfig.value.primary)
  }

  // 修改主题颜色
  const changePrimary = (val: string) => {
    if (!val) {
      val = DEFAULT_PRIMARY
      d_ElMessage(`主题颜色已重置为 ${DEFAULT_PRIMARY}`)
    }
    globalStore.setThemeConfig({ ...themeConfig.value, primary: val })
    // 为了兼容暗黑模式下主题颜色也正常，以下方法计算主题颜色 由深到浅 的具体颜色
    document.documentElement.style.setProperty(
      '--el-color-primary',
      themeConfig.value.primary
    )
    document.documentElement.style.setProperty(
      '--el-color-primary-dark-2',
      themeConfig.value.isDark
        ? `${getLightColor(themeConfig.value.primary, 0.2)}`
        : `${getDarkColor(themeConfig.value.primary, 0.3)}`
    )
    // 颜色加深或变浅
    for (let i = 1; i <= 9; i++) {
      document.documentElement.style.setProperty(
        `--el-color-primary-light-${i}`,
        themeConfig.value.isDark
          ? `${getDarkColor(themeConfig.value.primary, i / 10)}`
          : `${getLightColor(themeConfig.value.primary, i / 10)}`
      )
    }
  }

  // 灰色和弱色切换
  const changeGreyOrWeak = (value: boolean, type: string) => {
    const body = document.body as HTMLElement
    if (!value) return body.setAttribute('style', '')
    if (type === 'grey') body.setAttribute('style', 'filter: grayscale(1)')
    if (type === 'weak') body.setAttribute('style', 'filter: invert(80%)')
    let propName = type == 'grey' ? 'isWeak' : 'isGrey'
    globalStore.setThemeConfig({ ...themeConfig.value, [propName]: false })
  }

  onBeforeMount(() => {
    switchDark()
    changePrimary(themeConfig.value.primary)
    if (themeConfig.value.isGrey) changeGreyOrWeak(true, 'grey')
    if (themeConfig.value.isWeak) changeGreyOrWeak(true, 'weak')
  })

  return {
    switchDark,
    changePrimary,
    changeGreyOrWeak,
  }
}
