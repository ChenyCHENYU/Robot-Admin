<!--
 * @Author: ChenYu
 * @Date: 2022-04-22 12:01:34
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-22 14:45:52
 * @FilePath: \v3-el-components\src\components\C_UploadExcel\index.vue
 * @Description: 导入 excel 组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <ElButton :loading="loading" type="primary" @click="handleUpload">
        {{ $t('uploadExcel.upload') }}
      </ElButton>
    </div>

    <input
      ref="excelUploadInput"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <!-- https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API -->
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <C_Icon
        iconName="ElIconUploadFilled"
        style="width: 3em; height: 3em; margin-left: 38%; color: #bbc1d3"
      />
      <span>{{ $t('uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { d_ElMessage } from '@/utils/d_tips'
import XLSX from 'xlsx'
import { getHeaderRow, isExcel } from './utils'

interface Props {
  beforeUpload?: (rawFile: any) => void
  onSuccess: (excelData: any) => void
}
const props = defineProps<Props>()

// TODO: 点击上传触发
const loading = ref(false)
const excelUploadInput = ref()
const handleUpload = () => {
  excelUploadInput.value.click()
}

const handleChange = (e: { target: { files: any } }) => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  upload(rawFile)
}

// TODO: 拖拽上传
// 拖拽文本释放时触发

const handleDrop = (e: { dataTransfer: { files: any } }) => {
  // 上传中跳过
  if (loading.value) return
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    d_ElMessage('必须要有一个文件', 'warning')
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    d_ElMessage('文件必须是 .xlsx, .xls, .csv 格式', 'warning')
    return false
  }
  // 触发上传事件
  upload(rawFile)
}

// 拖拽悬停时触发
const handleDragover = (e: { dataTransfer: { dropEffect: string } }) => {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/dropEffect
  // 在新位置生成源项的副本
  e.dataTransfer.dropEffect = 'copy'
}

// 触发上传事件
const upload = (rawFile: any) => {
  excelUploadInput.value.value = null
  // 如果没有指定上传前回调的话
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }
  // 如果指定了上传前回调，那么只有返回 true 才会执行后续操作
  const before = props.beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}
/**
 * 读取数据（异步）
 */
const readerData = (rawFile: Blob) => {
  loading.value = true
  return new Promise((resolve) => {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
    const reader = new FileReader()
    // 该事件在读取操作完成时触发
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onload
    reader.onload = (e) => {
      // 1. 获取解析到的数据
      const data = e.target!.result
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取第一张表格(工作簿)名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 只读取 Sheet1（第一张表格）的数据
      const worksheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据表头
      const header = getHeaderRow(worksheet)
      // 6. 解析数据体
      const results = XLSX.utils.sheet_to_json(worksheet)
      // 7. 传入解析之后的数据
      generateData({ header, results })
      // 8. loading 处理
      loading.value = false
      // 9. 异步完成
      resolve()
    }
    // 启动读取指定的 Blob 或 File 内容
    reader.readAsArrayBuffer(rawFile)
  })
}
/**
 * 根据导入内容，生成数据
 */
const generateData = (excelData: { header: never[]; results: unknown[] }) => {
  props.onSuccess && props.onSuccess(excelData)
}
</script>
<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
