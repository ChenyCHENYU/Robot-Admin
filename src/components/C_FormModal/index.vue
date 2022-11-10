<!--
 * @Author: ChenYu
 * @Date: 2022-03-22 23:13:58
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-05-05 11:48:44
 * @FilePath: \v3-el-components\src\components\C_FormModal\index.vue
 * @Description: 模态框内的表单
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <!-- TODO: 这个div其实统一换成scorllBar比较好，后续有时间优化吧 -->
  <div :class="{ 'base-icon-dialog-body': isScroll }">
    <ElDialog v-model="dialogVisible" v-bind="$attrs">
      <template #default>
        <C_Form
          label-width="100px"
          ref="c_form"
          :options="options"
          @on-preview="handlePreview"
          @on-remove="handleRemove"
          @on-change="handleChange"
          @before-remove="handleBeforRemove"
          @on-exceed="handleExceed"
          @on-success="handleSuccess"
          @change="handleSelectChange"
        >
          <!-- 为了在模态框中拿到插槽的值，下面插槽套插槽 -->
          <template #uploadClick>
            <slot name="uploadClick"></slot>
          </template>
          <template #uploadTip>
            <slot name="uploadTip"></slot>
          </template>
        </C_Form>
      </template>
      <template #footer>
        <slot name="footer" :form="c_form"></slot>
      </template>
    </ElDialog>
  </div>
</template>

<script lang="ts" setup>
import { d_ElMessage } from '@/utils/d_tips'
import { ElMessageBox } from 'element-plus'
import { ref, watch } from 'vue'
import { I_FormInstance, I_FormOptions } from '../C_Form/types/types'

interface Props {
  visible?: boolean
  options: I_FormOptions[]
  isScroll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  isScroll: false,
})
const options = ref(props.options)

const emits = defineEmits(['update:visible'])

const dialogVisible = ref(props.visible)

// 表单实例
const c_form = ref<I_FormInstance | null>()

defineExpose({ c_form })

watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val
  }
)

watch(
  () => dialogVisible.value,
  (val) => {
    emits('update:visible', val)
  }
)
const handleSuccess = (val: any) => {
  console.log(val)
}
const handleRemove = (val: any) => {
  console.log(val)
}
const handlePreview = (val: any) => {
  console.log(val)
}
const handleChange = (val: any) => {
  console.log('val ==>', val)
}
const handleExceed = (val: any) => {
  console.log('handleExceed')
  console.log('val ==》', val)
  d_ElMessage(
    `The limit is 3, you selected ${
      val.files.length
    } files this time, add up to ${
      val.files.length + val.fileList.length
    } totally`,
    'error'
  )
}

const handleBeforRemove = (val: any) => {
  return ElMessageBox.confirm(`Cancel the transfert of ${val.name} ?`).then(
    () => true,
    () => false
  )
}

const handleSelectChange = ({ val, item }) => {
  // 处理的场景1，动态添加节点，并且选择互斥
  options.value.forEach((optioon) => {
    const { show, selectValue } = optioon
    if (item.for === optioon.for) {
      if (show === false && selectValue!.includes(val)) {
        optioon.show = true
      }
      if (show && !selectValue!.includes(val)) {
        optioon.show = false
      }
    }
  })
}
</script>
