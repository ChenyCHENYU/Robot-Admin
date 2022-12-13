<!--
 * @Author: ChenYu
 * @Date: 2022-03-05 13:53:13
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-13 21:21:22
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_Container\index.vue
 * @Description: 布局的容器组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
  <component :is="LayoutComponents[themeConfig.layout]" />
  <C_ThemeDrawer />
</template>

<script setup lang="ts" name="layout">
import { s_globalStore } from '_store/index'
import LayoutClassic from './LayoutClassic.vue'
import LayoutColumns from './LayoutColumns.vue'
import LayoutTransverse from './LayoutTransverse.vue'
import LayoutVertical from './LayoutVertical.vue'

const LayoutComponents: { [key: string]: any } = {
  vertical: LayoutVertical,
  classic: LayoutClassic,
  transverse: LayoutTransverse,
  columns: LayoutColumns,
}

const globalStore = s_globalStore()
const themeConfig = computed(() => globalStore.themeConfig)
</script>

<style scoped lang="scss">
.layout {
  min-width: 740px;
}
</style>
