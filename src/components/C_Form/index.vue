<!--
 * @Author: ChenYu
 * @Date: 2022-03-20 22:37:00
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-30 10:49:51
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_Form\index.vue
 * @Description：表单组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <ElForm
    ref="form"
    v-bind="$attrs"
    :model="data.model"
    :rules="data.rules"
    :validate-on-rule-change="false"
  >
    <!-- TODO: 没有children 的情况 比如单组件 不是嵌套组件 -->
    <template v-for="item of options">
      <ElFormItem
        v-if="(!item.children || !item.children.length) && item.show !== false"
        :label="item.label"
        :prop="item.prop"
        :key="item"
      >
        <!-- 常规组件 并且不包含children -->
        <component
          v-if="item.type !== 'upload' && item.type !== 'editor'"
          :is="`el-${item.type}`"
          v-model="data.model[item.prop!]"
          :placeholder="item.placeholder"
          v-bind="item.attrs"
        />
        <!-- TODO: upload 组件相对复杂，单独判断展示 -->
        <!-- TODO: upload单独渲染 -->
        <ElUpload
          v-if="item.type === 'upload'"
          v-bind="item.uploadAttrs"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :on-error="handleError"
          :on-progress="handleProgress"
          :on-change="handleChange"
          :before-upload="handleBeforUpload"
          :before-remove="handleBeforRemove"
          :on-exceed="handleExceed"
          :http-request="httpRequest"
        >
          <!-- 上传组件的载体插槽[比如按钮] -->
          <slot name="uploadClick" />
          <span style="margin-right: 10px"></span>
          <!-- 上传组件提示区域 tip -->
          <slot name="uploadTip" />
        </ElUpload>
        <!-- TODO: 富文本编辑器 -->
        <div id="editor" v-if="item.type === 'editor'" />
      </ElFormItem>
      <!-- TODO: 有children的情况 比如 select下面的option -->
      <ElFormItem
        v-if="item.children && item.children.length"
        :label="item.label"
        :prop="item.prop"
        :key="item"
      >
        <component
          :is="`el-${item.type}`"
          v-model="data.model[item.prop!]"
          :placeholder="item.placeholder"
          v-bind="item.attrs"
          @change="handleSelectChange($event, item)"
        >
          <component
            :is="`el-${child.type}`"
            v-for="(child, i) of item.children"
            :key="i"
            :label="child.label"
            :value="child.value"
          />
        </component>
      </ElFormItem>
    </template>
    <!-- TODO: 操作区域 如发布 提交 等等 -->
    <ElFormItem>
      <!-- TODO: 这里要通过作用域插槽调用表单实例中的的方法 -->
      <!-- TODO: 作用域插槽还有一个作用就是 可以分发数据给父组件使用 -->
      <slot name="action" :form="form" :model="data.model" />
    </ElFormItem>
  </ElForm>
</template>

<script lang="ts" setup>
import type Editor from 'wangeditor'
import E from 'wangeditor'
import type { I_FormInstance, I_FormOptions } from './types/types'

interface Props {
  options: I_FormOptions[]
  // 用户自定义上传方法
  httpRequest?: () => any
}
const props = defineProps<Props>()

const emits = defineEmits([
  'on-preview',
  'on-remove',
  'on-success',
  'on-error',
  'on-progress',
  'on-change',
  'before-upload',
  'before-remove',
  'on-exceed',
  'change',
])

console.log('options ===>', props.options)
// 获取 form表单的实例
const form = ref<I_FormInstance | null>(null)
// 存储富文本编辑器的值
const editorRef = ref<Editor>()
// 初始表单的数据值依赖收集
const data = reactive<any>({
  model: {},
  rules: {},
})

// TODO: 监听父组件传递来的options，如果是后台返回的数据结构，要监听改变的options
watch(
  () => props.options,
  () => {
    console.log('小伙子，我看到你改动我的值了')
    initForm()
  }
  // { deep: true }  // 数据源发生变化再重置表单，子元素操作变更不触发表单重置
)

// TODO: 页面加载完后渲染DOM
onMounted(() => initForm())

// TODO: upload 相关的所有方法

const handlePreview = (file: File) => {
  emits('on-preview', { file })
}
const handleRemove = (file: File, fileList: FileList) => {
  emits('on-remove', { file, fileList })
}
const handleSuccess = (res: any, file: File, fileList: FileList) => {
  // TODO: 上传图片成功，给表单上传项赋值
  const uploadIttem = props.options.find((item) => item.type === 'upload')
  data.model.value[uploadIttem?.prop!] = { res, file, fileList } // eslint-disable-line
  emits('on-success', { res, file, fileList })
}
const handleError = (err: any, file: File, fileList: FileList) => {
  emits('on-error', { err, file, fileList })
}
const handleProgress = (e: Event, file: File, fileList: FileList) => {
  emits('on-progress', { file, fileList })
}
const handleChange = (file: File, fileList: FileList) => {
  emits('on-change', { file, fileList })
}
const handleBeforUpload = (file: File) => {
  emits('before-upload', file)
}
const handleBeforRemove = (file: File, fileList: FileList) => {
  emits('before-remove', { file, fileList })
}
const handleExceed = (files: File, fileList: FileList) => {
  emits('on-exceed', { files, fileList })
}
// select的触发事件
const handleSelectChange = (val: string | number, item: any) => {
  emits('change', { val, item })
}

// TODO: 初始化Form model 和 rules的值
const initForm = () => {
  if (props.options && props.options.length) {
    let m: any = {}
    let r: any = []
    props.options.map((item) => {
      // TODO: 使循环的FormItem的键prop把model绑定的value的值对应上
      m[item.prop!] = item.value
      r[item.prop!] = item.rules
      // TODO: 处理富文本编辑器
      if (item.type === 'editor') {
        // 初始化富文本
        nextTick(() => {
          if (document.getElementById('editor')) {
            const editor = new E('#editor')
            editor.config.placeholder = item.placeholder!
            // editor.txt.html(item.value) // 重新设置编辑器内容
            if (editor === null) {
              editor.create()
            } else {
              editor.destroy()
              editor.create()
            }
            // 初始化富文本内容
            editor.txt.html(item.value) // 重新设置编辑器内容
            // 输入的数据发生变化以后
            editor.config.onchange = (newHtml: string) => {
              data.model[item.prop!] = newHtml
            }
            // TODO: 将这个实例赋值给依赖收集
            editorRef.value = editor
          }
        })
      }
    })
    data.model = m
    data.rules = r
  }
}

// TODO: 重置表单的方法 也就是重写表单重置的方法
const resetFields = () => {
  // 重置 element-plus的表单
  form.value!.resetFields()
  // 重置 富文本编辑器的内容
  // 获取到富文本的配置项
  if (props.options && props.options.length) {
    let editorItem = props.options.find((item) => item.type === 'editor')
    editorRef.value?.txt.html(editorItem?.value)
  }
  // TODO: 处理check-group 双向绑定赋值后导致校验失效的特殊处理
  props.options.forEach((item) => {
    if (item.type === 'checkbox-group') delete data.model[item.prop!]
  })
}

// 暴露表单验证
const validate = () => form.value?.validate

// 暴露表单数据
const getFormData = () => data.model

// 分发方法， 它的作用是把组件上的属性或方法发出去
defineExpose({ resetFields, validate, getFormData })
</script>
