<!--
 * @Author: ChenYu
 * @Date: 2022-04-22 08:47:21
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-30 16:20:26
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\user-manage\index.vue
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
    ref="tableRef"
    :columns="COLUMNS(tableRef)"
    :getTableDataFn="getUserMangeList"
  />
  <!-- 导出弹出层 -->
  <C_ExportExcel v-model="modelValue" />
  <!-- 角色弹出层 -->
  <RolesDialog
    v-if="roleVisible"
    v-model="roleVisible"
    :userId="selectUserId"
    @e_updateRole="e_updateRole"
  />
</template>

<script lang="ts" setup>
import { getUserMangeList } from '_api/user-manage'
import { COLUMNS, useVisable } from './data'
import RolesDialog from './rolesDialog.vue'

// 数据相关

const tableRef = ref()

const { roleVisible, selectUserId } = useVisable()

const router = useRouter()

// 导入点击事件
const onImportExcelClick = () => router.push('excelImport')

const modelValue = ref(false)
// 导出点击事件
const onExportExcelClick = () => (modelValue.value = true)

const e_updateRole = () =>
  tableRef.value.getDataFn(tableRef.value.initFormParams)
</script>
