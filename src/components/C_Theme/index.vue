<!--
 * @Author: ChenYu
 * @Date: 2022-04-16 09:39:22
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-13 19:39:07
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_Theme\index.vue
 * @Description: 主题组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <div v-pointer @click="openDrawer">
    <IconTheme />
  </div>
</template>

<script lang="ts" setup>
import mittBus from '_utils/d_mittBus'
const openDrawer = () => mittBus.emit('openThemeDrawer')
</script>
