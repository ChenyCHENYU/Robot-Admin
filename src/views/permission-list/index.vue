<!--
 * @Author: ChenYu
 * @Date: 2022-04-27 10:10:12
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-28 11:08:47
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\permission-list\index.vue
 * @Description: 权限列表
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <C_BaseTable
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
import { permissionList } from '_api/permission'
import { COLUMNS } from './data'

const tableData = ref([])
const columns = ref<any>([])

const page = ref(1)
const pageSize = ref(10)
const total = ref(0)

/**
 * 权限分级：
 * 1. 一级权限为页面权限
 *  permissionMark 对应 路由名称
 * 2. 二级权限为功能权限
 *  permissionMark 对应 功能权限表
 */

// 所有权限
const getPermissionList = async () => {
  const res = await permissionList()
  if (res.code === '0') {
    console.log('res===>', res)
    tableData.value = res.data
    columns.value = COLUMNS(tableData.value)
  }
}

const e_handlePageSizeChange = (pageSizeVal) => {
  console.log('pageSizeVal ===>', pageSizeVal)
  pageSize.value = pageSizeVal
  getPermissionList()
}
const e_handlePageChange = (pageVal) => {
  console.log('pageVal ===>', pageVal)
  page.value = pageVal
  getPermissionList()
}
onMounted(() => getPermissionList())
</script>
