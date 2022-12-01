<!--
 * @Author: ChenYu
 * @Date: 2022-04-24 13:34:07
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-12-01 11:38:46
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_ExportExcel\index.vue
 * @Description: 导出 excel 组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <ElDialog
    :title="$t('excel.title')"
    :model-value="modelValue"
    @close="handleClosed"
    width="30%"
  >
    <ElInput v-model="excelName" :placeholder="$t('excel.placeholder')" />
    <template #footer>
      <div class="dialog">
        <ElButton @click="handleClosed">{{ $t('excel.close') }}</ElButton>
        <ElButton :loading="loading" type="primary" @click="handleConfirm">{{
          $t('excel.confirm')
        }}</ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script lang="ts" setup>
// import { d_watchSwitchLang, t } from '_utils/d_i18n'
import { getUserManageAllList } from '@/api/user-manage'
import { USER_RELATIONS } from './ExportExcelConstants'

interface Props {
  modelValue: boolean
}
defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

// let exportExcelDefaultName = t('excel.defaultName')
const excelName = ref()

// d_watchSwitchLang(() => {
//   exportExcelDefaultName = t('excel.defaultName')
// })

const handleClosed = () => emits('update:modelValue', false)

const loading = ref(false)
const handleConfirm = async () => {
  loading.value = true
  const res = await getUserManageAllList()
  if (res.code === '0') {
    loading.value = false
    // TODO: 导入工具包
    const excel = await import('_utils/d_export2Excel')
    const data = formatJson(USER_RELATIONS, res.data.list)
    excel.export_json_to_excel({
      // excel 表头
      header: Object.keys(USER_RELATIONS),
      // excel 数据（二维数组结构）
      data,
      // 文件名称
      // filename: excelName.value || exportExcelDefaultName,
      filename: excelName.value,
      // 是否自动列宽
      autoWidth: true,
      // 文件类型
      bookType: 'xlsx',
    })
    console.log('data ===>', data)
    handleClosed()
    console.log('res ===>', res)
  }
}
// 当使用 export_json_to_excel的时候，传递的 data 必须是一个二维数组
const formatJson = (headers, rows) => {
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 如果数据里面如角色是多个 也就是数组的话 需要特殊处理
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map((role) => role.title))
      }
      return item[headers[key]]
    })
  })
}
</script>
