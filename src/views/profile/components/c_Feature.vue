<!--
 * @Author: ChenYu
 * @Date: 2022-04-18 01:34:46
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-18 16:07:35
 * @FilePath: \v3-el-components\src\views\profile\components\c_Feature.vue
 * @Description: 功能介绍组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <ElCollapse v-model="activeName" accordion>
    <ElCollapseItem
      v-for="item in features"
      :key="item.id"
      :title="item.title"
      :name="item.id"
    >
      <div v-html="item.content"></div>
    </ElCollapseItem>
  </ElCollapse>
</template>

<script lang="ts" setup>
interface Props {
  features: any[]
}
defineProps<Props>()
const activeName = ref(0)
</script>
