<!--
 * @Author: ChenYu
 * @Date: 2022-03-06 22:09:24
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-12 17:52:50
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\area-cascade\index.vue
 * @Description: 级联选择器页面
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <C_AreaCascade :sourceData="allAreas" @e_changeArae="e_changeArae" />
</template>

<script lang="ts" setup>
import allAreas from '_c/lib/pca-code.json' // 省市区数据源
const e_changeArae = (areaData) => {
  console.log('areaData ===>', areaData)
}
</script>
