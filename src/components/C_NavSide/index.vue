<!--
 * @Author: ChenYu
 * @Date: 2022-03-05 20:52:16
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-05-06 10:02:31
 * @FilePath: \v3-el-components\src\components\C_NavSide\index.vue
 * @Description: 导航菜单侧边栏
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <!-- :style="{ backgroundColor: themeStore.changeCssVar.menuBg }" -->
  <ElScrollbar>
    <div v-if="!isCollapse" class="menu-top">
      <img
        class="img"
        src="https://s2.loli.net/2022/04/06/s8hvH3redWzMw1Q.png"
      />
      <h4>ChenyAdmin</h4>
    </div>
    <img
      class="img"
      v-else
      src="https://s2.loli.net/2022/04/06/s8hvH3redWzMw1Q.png"
    />
    <C_InfiniteMenu
      :collapse="isCollapse"
      :MENU_DATA="routes"
      router
      :defaultActive="$route.path"
    />
  </ElScrollbar>
</template>

<script lang="ts" setup>
import './index.scss'
import C_InfiniteMenu from '_c/C_Menu/menu'
import routes from '@/router/routes'
defineProps<{ isCollapse: boolean }>()
</script>
