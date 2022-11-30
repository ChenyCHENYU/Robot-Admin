<!--
 * @Author: ChenYu
 * @Date: 2022-03-20 22:37:39
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-30 10:33:28
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\form\index.vue
 * @Description: 表单组件视图
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <C_Form
    ref="formRef"
    :options="OPTIONS"
    label-width="100px"
    @on-preview="handlePreview"
    @on-remove="handleRemove"
    @before-remove="handleBeforRemove"
    @on-exceed="handleExceed"
    @on-success="handleSuccess"
  >
    <template #uploadClick>
      <ElButton>点击上传</ElButton>
    </template>
    <template #uploadTip>
      <div style="color: #ccc">jpg/png files with a size less than 500kb</div>
    </template>
    <template #action="scope">
      <ElButton type="primary" @click="submitForm(scope)">提交</ElButton>
      <ElButton @click="resetForm">重置</ElButton>
    </template>
  </C_Form>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { OPTIONS } from './data'
import './index.scss'

// 拿到当前组件的实例
const formRef = ref()

const handleExceed = (val: any) => {
  console.log('handleExceed')
  console.log('val ==》', val)
  ElMessage.warning(
    `The limit is 3, you selected ${
      val.files.length
    } files this time, add up to ${
      val.files.length + val.fileList.length
    } totally`
  )
}

const handleBeforRemove = (val: any) => {
  return ElMessageBox.confirm(`Cancel the transfert of ${val.name} ?`).then(
    () => true,
    () => false
  )
}

// TODO: 下面全是自有方法 非组件及外部方法
const submitForm = (formScope: any) => {
  formScope.form.validate((valid: boolean) => {
    if (valid) {
      console.log(formScope?.model)
      ElMessage.success('提交成功')
    } else {
      ElMessage.error('表单填写有误，请查看错误提示')
    }
  })
  console.log('slotScope ===>', formScope)
}
// 重置表单
const resetForm = () => formRef.value.resetFields()
</script>
