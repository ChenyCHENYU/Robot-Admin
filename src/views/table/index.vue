<!--
 * @Author: 杨晨誉
 * @Date: 2022-03-23 14:51:39
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-25 01:40:43
 * @FilePath: \vue3_vite3_element-plus_admin\src\views\table\index.vue
 * @Description: table组件视图页
 * 
-->

<template>
  <C_Table
    :formParams="FORM_PARAMS"
    :formItemList="FORM_ITEM_LIST"
    :columns="COLUMNS()"
    :getTableData="getTableData"
  />
</template>

<script lang="ts" setup>
import { getTableData } from '@/api/demo'
import { COLUMNS, FORM_ITEM_LIST, FORM_PARAMS } from './data'
</script>
