<!--
 * @Author: ChenYu
 * @Date: 2022-03-05 20:52:16
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-30 09:37:08
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_NavSide\index.vue
 * @Description: 导航菜单侧边栏
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <!-- :style="{ backgroundColor: themeStore.changeCssVar.menuBg }" -->
  <ElScrollbar>
    <div class="menu-top">
      <img
        class="img"
        src="https://www.helloimg.com/images/2022/11/30/ZuLEQb.png"
      />
      <h4 v-if="!isCollapse">AGILE TEAM</h4>
    </div>

    <C_InfiniteMenu
      :collapse="isCollapse"
      :MENU_DATA="routes"
      router
      :defaultActive="$route.path"
    />
  </ElScrollbar>
</template>

<script lang="ts" setup>
import routes from '@/router/routes'
import C_InfiniteMenu from '_c/C_Menu/menu'
import './index.scss'
defineProps<{ isCollapse: boolean }>()
</script>
