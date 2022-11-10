<!--
 * @Author: 杨晨誉
 * @Date: 2022-03-23 14:51:39
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-08 22:53:02
 * @FilePath: \v3-vite-elementPlus-admin\src\views\table\index.vue
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

// fn()
//   .then((v) => {
//     console.log('v ===>', v)
//     tableData.value = v
//     //在这里获得模块a真正想导出的值
//   })
//   .catch((e) => {})

// const getAsyncTableData = async () => {
//   const res = await exposeTableData()
//   console.log('res===》', res)
//   tableData.value = res as any
// }
const getDataFn = async () => {
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

// exposeData.then((res: any) => {
//   console.log('res ===>', res)
//   tableData.value = res
//   console.log(res)
// })

// 模拟后台获取到的表格数据

// setTimeout(() => {
//   tableData.value = [
//     {
//       date: '2016-05-03',
//       name: 'Tom',
//       address: 'No. 189, Grove St, Los Angeles',
//     },
//     {
//       date: '2016-05-02',
//       name: 'Tom',
//       address: 'No. 189, Grove St, Los Angeles',
//     },
//     {
//       date: '2016-05-04',
//       name: 'Tom',
//       address: 'No. 189, Grove St, Los Angeles',
//     },
//     {
//       date: '2016-05-01',
//       name: 'Tom',
//       address: 'No. 189, Grove St, Los Angeles',
//     },
//   ]
// }, 3000)
// 增加一行注释
</script>
