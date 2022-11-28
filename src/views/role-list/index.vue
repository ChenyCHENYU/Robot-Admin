<!--
 * @Author: ChenYu
 * @Date: 2022-04-27 09:16:04
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-28 11:06:27
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\role-list\index.vue
 * @Description: 
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
  <!-- 分配权限弹出层 -->
  <assignPermissionsDialog
    v-if="visible"
    v-model:visible="visible"
    :roleId="selectRoleId"
  />
</template>

<script lang="ts" setup>
import { roleList } from '_api/role'
import assignPermissionsDialog from './assignPermissionsDialog.vue'
import { COLUMNS } from './data'

const tableData = ref([])
const columns = ref<any>([])

const page = ref(1)
const pageSize = ref(10)
const total = ref(0)

const visible = ref(false)
const selectRoleId = ref('')

const getRoleList = async () => {
  const res = await roleList()
  if (res.code === '0') {
    tableData.value = res.data
    columns.value = COLUMNS(tableData, visible, selectRoleId)
  }
}

const e_handlePageSizeChange = (pageSizeVal) => {
  console.log('pageSizeVal ===>', pageSizeVal)
  pageSize.value = pageSizeVal
  getRoleList()
}
const e_handlePageChange = (pageVal) => {
  console.log('pageVal ===>', pageVal)
  page.value = pageVal
  getRoleList()
}

getRoleList()
</script>
<style lang="scss" scoped></style>
