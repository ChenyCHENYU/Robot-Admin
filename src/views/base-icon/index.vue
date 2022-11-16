<!--
 * @Author: ChenYu
 * @Date: 2022-03-05 21:57:32
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-16 19:26:25
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\base-icon\index.vue
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
