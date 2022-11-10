<!--
 * @Author: ChenYu
 * @Date: 2022-03-05 21:57:32
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-03-27 11:31:45
 * @FilePath: \v3-el-components\src\views\base-icon\index.vue
 * @Description: base-icon 展示页面
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <div>
    base icon view
    <C_BaseIcon :title="'选择图标'" v-model:visible="visible" />
  </div>
</template>

<script lang="ts" setup>
const visible = ref<boolean>(false)
</script>
<style lang="scss" scoped></style>
