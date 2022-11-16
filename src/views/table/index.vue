<!--
 * @Author: 杨晨誉
 * @Date: 2022-03-23 14:51:39
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-16 14:28:05
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
    :columns="columns"
    :page="page"
    :pageSize="pageSize"
    :total="total"
    @e_handlePageSizeChange="e_handlePageSizeChange"
    @e_handlePageChange="e_handlePageChange"
  />
</template>
<script lang="ts" setup>
import axios from 'axios'
import { COLUMNS, exposeTableData, FORM_ITEM_LIST, FORM_PARAMS } from './data'

const e_dispatchGetDataFn = () => {
  console.log('触发了父组件，父组件调用更新接口的数据 ')
}
const tableData = ref<any>([])
const columns = ref<any>([])

const page = ref(1)
const pageSize = ref(10)
const total = ref(0)

const getAsyncTableData = async (asyData: any) => {
  tableData.value = await asyData
}

const e_handlePageSizeChange = (pageSizeVal) => {
  console.log('pageSizeVal ===>', pageSizeVal)
  pageSize.value = pageSizeVal
  getDataFn()
}
const e_handlePageChange = (pageVal) => {
  console.log('pageVal ===>', pageVal)
  page.value = pageVal
  getDataFn()
}

const getDataFn = async () => {
  console.log('吊我接口了')
  const res = await axios.post('/api/list', {
    current: page.value,
    pageSzie: pageSize.value,
  })
  console.log('res ===>', res.data)
  columns.value = COLUMNS(res.data.data)
}

// 存放所有异步调用的方法
onMounted(() => {
  // 数据源如果从 data.tsx获取
  exposeTableData(getAsyncTableData)
  // mock 数据
  getDataFn()
})
</script>
