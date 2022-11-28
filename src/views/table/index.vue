<!--
 * @Author: 杨晨誉
 * @Date: 2022-03-23 14:51:39
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-28 16:32:02
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\table\index.vue
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
  >
    <template #tableHeader>
      <ElButton type="primary">新增</ElButton>
      <ElButton>批量添加</ElButton>
      <ElButton>导出</ElButton>
      <ElButton>批量删除</ElButton>
    </template>

    <!-- 如果要使用详情模态框数据的话 -->
    <template #dialog="{ detailData }">
      这里，我将个性化编写我 dialog 要渲染的 DOM 节点，下面是后台返回的数据源
      <br />
      {{ detailData }}
    </template>
  </C_Table>
</template>

<script lang="ts" setup>
import { getTableData } from '@/api/demo'
import { COLUMNS, FORM_ITEM_LIST, FORM_PARAMS } from './data'

const tableData = ref()
const e_sendTableData = (data) => (tableData.value = data.value)
</script>
