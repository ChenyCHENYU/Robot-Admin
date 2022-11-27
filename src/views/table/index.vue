<!--
 * @Author: 杨晨誉
 * @Date: 2022-03-23 14:51:39
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-27 18:39:09
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
  >
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

// 1.定义一个新的tableData, 每个行都要加个isEdit属性
// 2.删除isEditLine，这样才能同时编辑
//  !isEditLine.value 你自己看这个逻辑，你点了另外一行，这个地方马上切换
// 3.只用判断isEdit，来控制显示Input框，不用这个逻辑：index + column.id !== currentEdit.value && !isEditLine.value。
// 4. 如果只允许编辑一行，那么，当用户点击其他行编辑的时候，直接提示，是否需要保存，只有保存了当前行才能编辑其他行，否则不允许编辑多行。(推荐)

const e_sendTableData = (data) => (tableData.value = data.value)
</script>
