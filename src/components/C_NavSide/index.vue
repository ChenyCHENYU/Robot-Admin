<!--
 * @Author: ChenYu
 * @Date: 2022-03-05 20:52:16
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-12-11 21:21:49
 * @FilePath: \vue3_vite3_element-plus_admin\src\components\C_NavSide\index.vue
 * @Description: 导航菜单侧边栏
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <!-- :style="{ backgroundColor: themeStore.changeCssVar.menuBg }" -->
  <ElScrollbar>
    <div class="menu-top">
      <img
        class="img"
        src="https://cdn.jsdelivr.net/gh/chenyCHENYU/images/RobotAdmin/blue-right.png"
      />
      <h4 v-if="!isCollapse">AGILE TEAM</h4>
    </div>

    <C_InfiniteMenu
      :collapse="isCollapse"
      :MENU_DATA="menuList"
      router
      :defaultActive="$route.path"
    />
  </ElScrollbar>
</template>

<script lang="ts" setup>
import { s_permissionStore } from '_store/permission'
import C_InfiniteMenu from '_c/C_Menu/menu'
import './index.scss'
defineProps<{ isCollapse: boolean }>()
const permissionStore = s_permissionStore()
const menuList = computed(() => permissionStore.showMenuListGet)
</script>
