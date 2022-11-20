<!--
 * @Author: ChenYu
 * @Date: 2022-11-20 12:44:20
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-20 13:06:28
 * @FilePath: \vue3_vite3_element-plus_admin\src\views\text-editor\index.vue
 * @Description: 富文本编辑器页面
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <div class="editorWrapper">
    <div class="info">
      <ElDivider content-position="left">富文本编辑器</ElDivider>
      <span style="text-align: left">富文本编辑器编辑场景。</span>
    </div>
    <div>
      <ElRow>
        <ElCol :offset="1" :span="22">
          <div class="grid-content bg-purple-dark">
            <ElCard class="box-card">
              <div style="text-align: left">
                <span>富文本编辑器</span>
                <ElDivider></ElDivider>
              </div>
              <C_TextEditor
                :model-value="editorValue"
                @update:modelValue="handleUpdateValue"
              />
            </ElCard>
          </div>
        </ElCol>
      </ElRow>
    </div>
  </div>
</template>
<script setup lang="ts">
import './index.scss'

const editorValue = ref('默认数据') // 富文本引用
const richHtml = ref() // 富文本内容；

setTimeout(() => {
  // 3秒后设置数据为'3秒后的数据'
  editorValue.value = '3秒后的数据'
}, 3000)

/**
 * @description  获取接收最新文本
 */
const handleUpdateValue = (val: any) => {
  console.log(val)
  richHtml.value = val
}
</script>
