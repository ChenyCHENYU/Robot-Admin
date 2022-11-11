<!--
 * @Author: ChenYu
 * @Date: 2022-04-22 08:47:21
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-11 14:20:20
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\user-manage\index.vue
 * @Description: 员工管理
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <ElCard>
    <div>
      <ElButton type="primary" @click="onImportExcelClick">
        {{ $t('excel.importExcel') }}
      </ElButton>
      <ElButton type="success" @click="onExportExcelClick">
        {{ $t('excel.exportExcel') }}
      </ElButton>
    </div>
  </ElCard>
  <C_Table
    :tableData="tableData"
    :columns="columns"
    :page="params.page"
    :pageSize="params.pageSize"
    :total="total"
  />
  <!-- 导出弹出层 -->
  <C_ExportExcel v-model="modelValue" />
  <!-- 角色弹出层 -->
  <RolesDialog
    v-if="roleDialogVisible"
    v-model="roleDialogVisible"
    :userId="selectUserId"
    @e_updateRole="getListData"
  />
</template>

<script lang="ts" setup>
import { getUserMangeList } from '@/api/user-manage'
import type { I_TableColumns } from '@/components/C_Table/types'
import { COLUMNS } from './data'
import RolesDialog from './rolesDialog.vue' // 数据相关
相关
const tableData = ref<any>([])
const columns = ref<I_TableColumns[]>([])
const total = ref(0)
const params = ref({
  page: 1,
  pageSize: 10,
})
const roleDialogVisible = ref(false)

const router = useRouter()

// 导出点击事件
const onImportExcelClick = () => {
  router.push('excelImport')
}

const modelValue = ref(false)
// 导出点击事件
const onExportExcelClick = () => {
  modelValue.value = true
}

// 获取数据的方法
const getListData = async () => {
  const res = await getUserMangeList(params.value)
  tableData.value = res.data.list
  total.value = res.data.total
}

const selectUserId = ref('')
onMounted(() => {
  getListData()
  columns.value = COLUMNS({ tableData, roleDialogVisible, selectUserId })
})
</script>
