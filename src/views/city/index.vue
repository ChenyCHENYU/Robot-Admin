<!--
 * @Author: ChenYu
 * @Date: 2022-03-18 00:58:16
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-15 23:13:08
 * @FilePath: \vue3_vite3_element-plus_admin\src\views\city\index.vue
 * @Description: 城市组件页面
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <C_City @e_getCityName="e_getCityName" />
</template>
<script setup lang="ts">
const e_getCityName = (cityNmae: string) => console.log(cityNmae)
</script>
