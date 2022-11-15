<!--
 * @Author: ChenYu
 * @Date: 2022-03-17 21:13:03
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-15 22:55:36
 * @FilePath: \vue3_vite3_element-plus_admin\src\views\date\index.vue
 * @Description: 日期选择器页面
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <C_Date @e_changeStartEndDate="e_changeStartEndDate" />
</template>

<script lang="ts" setup>
const e_changeStartEndDate = ([startDate, endDate]: Date[]) =>
  console.log(startDate, endDate)
</script>
