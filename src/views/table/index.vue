<!--
 * @Author: 杨晨誉
 * @Date: 2022-03-23 14:51:39
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-28 11:54:11
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\table\index.vue
 * @Description: table组件视图页
 * 
-->

<template>
  <C_Table
    ref="tableRef"
    :formParams="FORM_PARAMS"
    :formItemList="FORM_ITEM_LIST"
    :columns="COLUMNS(tableData)"
    :getTableDataFn="getTableData"
    @e_sendTableData="e_sendTableData"
    :multipleSelectionDelFn="multipleSelectionDelete"
    :batchAddOptions="batchAddOptions"
    :subListColumns="subListColumns"
    :subListItemSelectFn="selectExpandList"
  >
    <template #tableHeader>
      <ElButton type="primary" @click="tableRef.dialogAddVisible = true">
        新增
      </ElButton>
    </template>

    <template #addDialog>
      <C_Form ref="formRef" :options="OPTIONS" label-width="100px">
        <template #action="scope">
          <ElButton type="primary" @click="submitForm(scope)">提交</ElButton>
          <ElButton @click="resetForm">重置</ElButton>
        </template>
      </C_Form>
      <br />
    </template>

    <!-- 如果要使用详情模态框数据的话 -->
    <template #detailDialog="{ detailData }">
      这里，我将个性化编写我 详情 dialog 要渲染的 DOM
      节点，下面是后台返回的数据源
      <br />
      {{ detailData }}
    </template>
  </C_Table>
</template>

<script lang="ts" setup>
import type { I_BatchAddOptions } from '@/components/C_Table/types'
import {
  exportInfo,
  getTableData,
  importInfo,
  multipleSelectionDelete,
  selectExpandList,
} from '_api/demo'
import { d_ElMessage } from '_utils/d_tips'
import {
  COLUMNS,
  FORM_ITEM_LIST,
  FORM_PARAMS,
  OPTIONS,
  subListColumns,
} from './data'

// TODO: 批量添加数据配置参数

const batchAddOptions: I_BatchAddOptions = {
  title: '用户信息',
  tempApi: exportInfo,
  importApi: importInfo,
}

const tableRef = ref()
const formRef = ref()
const tableData = ref()
const e_sendTableData = (data) => (tableData.value = data.value)

// 提交和重置表单
// TODO: 下面全是自有方法 非组件及外部方法
const submitForm = (formScope: any) => {
  formScope.form.validate((valid: boolean) => {
    if (valid) {
      // 调用接口，拿到调用成功的返回值，触发提示，然后关闭提示框，重置表单，刷新列表，搜嘎over！
      d_ElMessage('提交成功')
      tableRef.value.dialogAddVisible = false
      console.log('我特么就是传递给后台的新增的数据撒', formScope?.model)
      resetForm() // 提交成功了将表单里面的数据重置
      tableRef.value.getDataFn(tableRef.value.initFormParams) // 更新列表数据
    } else {
      d_ElMessage('请填写校验信息', 'error')
    }
  })
  console.log('slotScope ===>', formScope)
}
// 重置表单
const resetForm = () => formRef.value.resetFields()
</script>

<style>
.expand thead {
  /* 某种特殊场景下，不需要显示expand的表头，跟父级 table共用一个表头 */
  display: none;
}
</style>
