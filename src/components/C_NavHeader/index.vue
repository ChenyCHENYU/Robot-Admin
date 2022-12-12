<!--
 * @Author: ChenYu
 * @Date: 2022-03-05 20:40:48
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-12 20:26:12
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_NavHeader\index.vue
 * @Description: 导航头部
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <div class="header">
    <div class="header-left">
      <C_MenuTop v-if="themeConfig.layout === 'classic'" />
      <!-- TODO: isCollapse 是否展开菜单  -->
      <div class="header-left-right">
        <span @click="toggle">
          <ElIconExpand v-if="isCollapse" />
          <ElIconFold v-else />
        </span>
        <!-- 面包屑 -->
        <C_Breadcrumb id="guide-breadcrumb" />
      </div>
    </div>
    <HeaderRight />
  </div>
</template>

<script lang="ts" setup>
import { s_globalStore } from '@/store'

const props = defineProps<{
  isCollapse: boolean
}>()
const emits = defineEmits(['update:isCollapse'])

const globalStore = s_globalStore()
const themeConfig = computed(() => globalStore.themeConfig)

const toggle = () => {
  //TODO: 组件通过 v-model 的方式触发 update 修改父组件的数据
  emits('update:isCollapse', !props.isCollapse)
}
</script>
<style lang="scss" scoped>
.header {
  // display: flex;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-left {
    display: flex;
    span {
      cursor: pointer;
      margin-right: 20px;
    }
  }
}
</style>
