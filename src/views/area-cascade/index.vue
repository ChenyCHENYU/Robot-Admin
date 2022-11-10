<!--
 * @Author: ChenYu
 * @Date: 2022-03-06 22:09:24
 * @LastEditors: 杨晨誉
 * @LastEditTime: 2022-03-08 14:01:27
 * @FilePath: \v3-el-components\src\views\area-cascade\index.vue
 * @Description: 级联选择器页面
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <C_AreaCascade @e_changeArae="e_changeArae" />
</template>

<script lang="ts" setup>
// import C_AreaCascade from '_c/C_AreaCascade/index.vue'

const e_changeArae = (areaData: object) => {
  console.log('areaData ===>', areaData)
}
</script>
<style lang="scss" scoped></style>
