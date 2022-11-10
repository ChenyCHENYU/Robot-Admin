<!--
 * @Author: ChenYu
 * @Date: 2022-03-17 16:05:56
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-03-17 19:05:43
 * @FilePath: \v3-el-components\src\views\time\index.vue
 * @Description: 时间选择器页面
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <C_Time @e_changeStartEndTime="e_changeStartEndTime" :attrs="attrs" />
</template>

<script lang="ts" setup>
// TODO: 传递给组件的剩余props属性 -  $attrs
const attrs = {
  size: 'mini',
  clearable: false,
}

const e_changeStartEndTime = ([starTiem, endTime]: string[]) => {
  console.log('time ==>', starTiem, endTime)
}
</script>
<style lang="scss" scoped></style>
