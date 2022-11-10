<!--
 * @Author: ChenYu
 * @Date: 2022-03-05 20:40:48
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-16 00:26:11
 * @FilePath: \v3-el-components\src\components\C_NavHeader\index.vue
 * @Description: 导航头部
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <div class="header">
    <div class="header-left">
      <!-- TODO: isCollapse 是否展开菜单  -->
      <span @click="toggle">
        <ElIconExpand v-if="isCollapse" />
        <ElIconFold v-else />
      </span>
      <!-- 右侧区域 -->
      <!-- 面包屑 -->
      <C_Breadcrumb id="guide-breadcrumb" />
    </div>
    <HeaderRight />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  isCollapse: boolean
}>()
const emits = defineEmits(['update:isCollapse'])

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
