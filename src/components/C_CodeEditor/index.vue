<!--
 * @Author: ChenYu
 * @Date: 2022-11-20 09:24:48
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-20 10:47:17
 * @FilePath: \vue3_vite3_element-plus_admin\src\components\C_CodeEditor\index.vue
 * @Description: 代码编辑器组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <div class="json-container">
    <textarea ref="jsonPaneRef" />
  </div>
</template>
<script setup lang="ts" name="CodeEditor">
import './index.scss'
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/display/panel.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
import 'codemirror/theme/night.css'
import 'codemirror/theme/shadowfox.css'
import 'codemirror/theme/darcula.css'
import 'codemirror/theme/solarized.css'
import 'codemirror/theme/material-ocean.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'

interface Props {
  modelValue: object
  theme: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}),
  theme: 'shadowfox',
})

const emits = defineEmits(['changed', 'input', 'update:modelValue'])

const jsonPaneRef = ref()
let jsonEditor: any = null
const state = reactive({
  options: {
    lineNumbers: true,
    mode: 'application/json',
    gutters: ['CodeMirror-lint-markers'],
    theme: props.theme,
    lint: false,
    selfContain: true,
  },
})
const initCodeMirror = () => {
  jsonEditor = CodeMirror.fromTextArea(jsonPaneRef.value, state.options)
  // doc.setValue(content: string) :set the editor content
  jsonEditor.setValue(JSON.stringify(props.modelValue, null, 2))
  // "changes" (instance: CodeMirror, changes: array<object>) Fires every time the content of the editor is changed.This event is fired after the operation finished
  jsonEditor.on('change', (cm: { getValue: () => any }) => {
    console.log('ssss')
    emits('changed', cm.getValue())
    emits('input', cm.getValue())
  })
  jsonEditor.addPanel = () => {
    console.log('')
  }
}
// 需要的时候调用这个方法
// const getValue = () => jsonEditor.getValue()

watch(
  () => props.theme,
  (theme, prevTheme) => {
    if (theme !== prevTheme) jsonEditor.setOption('theme', theme)
  }
)

onMounted(() => initCodeMirror())
</script>
