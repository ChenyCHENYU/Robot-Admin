<!--
 * @Author: 杨晨誉
 * @Date: 2022-03-23 14:51:39
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-24 16:25:33
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\table\index.vue
 * @Description: table组件视图页
 * 
-->

<template>
  <C_FormSearch
    :formParams="FORM_PARAMS"
    :formItemList="FORM_ITEM_LIST"
    @e_dispatchGetDataFn="e_dispatchGetDataFn"
    formSearchInputHistoryNum="testHistoryInput"
  />

  <C_Table
    :tableData="tableData"
    :columns="COLUMNS(tableData)"
    :page="page"
    :pageSize="pageSize"
    :total="total"
    @e_handlePageSizeChange="e_handlePageSizeChange"
    @e_handlePageChange="e_handlePageChange"
  />
</template>

<script lang="ts" setup>
import { getTableData } from '@/api/demo'
import { COLUMNS, FORM_ITEM_LIST, FORM_PARAMS } from './data'
import type { I_FormParams } from './types'

const e_dispatchGetDataFn = (formParams: I_FormParams) => getDataFn(formParams)

const tableData = ref([])

const page = ref(1)
const pageSize = ref(10)
const total = ref(0)

const e_handlePageSizeChange = (pageSizeVal: number) => {
  console.log('pageSizeVal ===>', pageSizeVal)
  pageSize.value = pageSizeVal
  getDataFn(FORM_PARAMS)
}
const e_handlePageChange = (pageVal: number) => {
  console.log('pageVal ===>', pageVal)
  page.value = pageVal
  getDataFn(FORM_PARAMS)
}

const getDataFn = async (fomrParmas: I_FormParams) => {
  const res = await getTableData(fomrParmas)
  if (res.code === '0') {
    tableData.value = res.data
  }
}

// 存放所有异步调用的方法
onMounted(() => getDataFn(FORM_PARAMS))
</script>
