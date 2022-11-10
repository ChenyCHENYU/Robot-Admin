<!--
 * @Author: ChenYu
 * @Date: 2022-03-03 23:38:18
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-05-06 10:05:08
 * @FilePath: \v3-el-components\src\App.vue
 * @Description: vue 根组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { s_themeStore } from '_store/theme'
import { s_userStore } from '_store/user'
import { d_watchSwitchLang } from '_utils/d_i18n'
import { d_generateNewStyle, d_writeNewStyle } from '_utils/d_theme'

const themeStore = s_themeStore()
const updateTheme = async () => {
  const newStyle = await d_generateNewStyle(themeStore.mainColor)
  d_writeNewStyle(newStyle)
}
updateTheme()

// TODO: 这里处理个人用户信息国际化
const userStore = s_userStore()
d_watchSwitchLang(() => {
  if (userStore.token) userStore.getUserInfo()
})
</script>
