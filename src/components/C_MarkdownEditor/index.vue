<!--
 * @Author: ChenYu
 * @Date: 2022-11-20 11:41:18
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-20 11:55:16
 * @FilePath: \vue3_vite3_element-plus_admin\src\components\C_MarkdownEditor\index.vue
 * @Description: Markdown 编辑器组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <div ref="editorSection"></div>
</template>
<script setup lang="ts">
import Editor from '@toast-ui/editor' /* ES6 Module */
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
// Editor's Style

interface Props {
  modelValue: string
}

const props = defineProps<Props>()

const editorSection = ref()
let editor: Editor
onMounted(() => {
  editor = new Editor({
    el: editorSection.value,
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    height: '500px',
    initialValue: props.modelValue,
    theme: 'dark',
  })
})
onUnmounted(() => editor.destroy())
</script>
