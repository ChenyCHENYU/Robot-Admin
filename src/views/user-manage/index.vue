<!--
 * @Author: ChenYu
 * @Date: 2022-04-22 08:47:21
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-28 01:11:19
 * @FilePath: \vue3_vite3_element-plus_admin\src\views\user-manage\index.vue
 * @Description: 员工管理
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <ElCard>
    <ElButton type="primary" @click="onImportExcelClick">
      {{ $t('excel.importExcel') }}
    </ElButton>
    <ElButton type="success" @click="onExportExcelClick">
      {{ $t('excel.exportExcel') }}
    </ElButton>
  </ElCard>
  <C_Table
    :columns="COLUMNS(tableData, roleDialogVisible, selectUserId)"
    :getTableData="getUserMangeList"
    @e_sendTableData="e_sendTableData"
  />
  <!-- 导出弹出层 -->
  <C_ExportExcel v-model="modelValue" />
  <!-- 角色弹出层 -->
  <RolesDialog
    v-if="roleVisible"
    v-model="roleVisible"
    :userId="selectUserId"
    @e_updateRole="e_sendTableData"
  />
</template>

<script lang="ts" setup>
import { getUserMangeList } from '_api/user-manage'
import { COLUMNS, useVisable } from './data'
import RolesDialog from './rolesDialog.vue' // 数据相关

const { roleVisible } = useVisable()

const tableData = ref()

const roleDialogVisible = ref(true)

const selectUserId = ref('')

const router = useRouter()

const e_sendTableData = (data) => (tableData.value = data.value)

// 导入点击事件
const onImportExcelClick = () => {
  router.push('excelImport')
}

const modelValue = ref(false)
// 导出点击事件
const onExportExcelClick = () => {
  modelValue.value = true
}
</script>
