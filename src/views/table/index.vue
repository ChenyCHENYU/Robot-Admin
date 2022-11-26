<!--
 * @Author: 杨晨誉
 * @Date: 2022-03-23 14:51:39
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-25 15:45:58
 * @FilePath: \vue3_vite3_element-plus_admin\src\views\table\index.vue
 * @Description: table组件视图页
 * 
-->

<template>
  <C_Table
    :formParams="FORM_PARAMS"
    :formItemList="FORM_ITEM_LIST"
    :columns="COLUMNS(tableData)"
    :getTableData="getTableData"
    @e_sendTableData="e_sendTableData"
  />
</template>

<script lang="ts" setup>
import { getTableData } from '@/api/demo'
import { COLUMNS, FORM_ITEM_LIST, FORM_PARAMS } from './data'
const tableData = ref()
const e_sendTableData = (data) => (tableData.value = data.value)
</script>
