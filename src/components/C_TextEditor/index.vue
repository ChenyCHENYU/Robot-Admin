<!--
 * @Author: ChenYu
 * @Date: 2022-11-20 12:47:41
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-20 13:05:23
 * @FilePath: \vue3_vite3_element-plus_admin\src\components\C_TextEditor\index.vue
 * @Description: 富文本编辑器组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <div class="editor-container">
    <div ref="Refreditor"></div>
  </div>
</template>
<script setup lang="ts">
import E from 'wangeditor'

interface Props {
  modelValue: string
}

const props = withDefaults(defineProps<Props>(), { modelValue: '' })

const emits = defineEmits(['update:modelValue'])

const Refreditor = ref() // 富文本引用
const { modelValue } = toRefs(props)
let editor: E

onMounted(() => {
  editor = new E(Refreditor.value)
  // 配置 onchange 回调函数
  editor.config.onchange = (newHtml: any) => {
    emits('update:modelValue', newHtml)
  }

  // 配置触发 onchange 的时间频率，默认为 200ms
  editor.config.onchangeTimeout = 500 // 修改为 500ms
  editor.create()

  // 使用 "父组件或本组件" 的默认数据 进行初始化
  editor.txt.html(modelValue.value)
})
watch(modelValue, (newValue) => {
  // 监听父组件数据变化 (例如：加载网络请求返回的数据)
  editor.txt.html(newValue)
})
</script>
