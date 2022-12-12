<!--
 * @Author: ChenYu
 * @Date: 2022-03-05 20:52:16
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-12 15:34:34
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_NavSide\index.vue
 * @Description: 导航菜单侧边栏
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <!-- :style="{ backgroundColor: themeStore.changeCssVar.menuBg }" -->

  <ElScrollbar>
    <C_MenuTop
      v-if="themeConfig.layout === 'vertical'"
      style="margin-top: 10px"
      :isCollapse="isCollapse"
    />
    <C_InfiniteMenu
      :collapse="isCollapse"
      :MENU_DATA="menuList"
      router
      :defaultActive="$route.path"
    />
  </ElScrollbar>
</template>

<script lang="ts" setup>
import { s_globalStore } from '@/store'
import C_InfiniteMenu from '_c/C_Menu/menu'
import { s_permissionStore } from '_store/permission'

const globalStore = s_globalStore()
const themeConfig = computed(() => globalStore.themeConfig)

defineProps<{ isCollapse: boolean }>()
const permissionStore = s_permissionStore()
const menuList = computed(() => permissionStore.showMenuListGet)
</script>
