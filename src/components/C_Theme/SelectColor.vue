<!--
 * @Author: ChenYu
 * @Date: 2022-04-16 10:51:14
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-17 23:13:59
 * @FilePath: \v3-el-components\src\components\C_Theme\SelectColor.vue
 * @Description: 主题颜色选择器
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <ElDialog
    :title="$t('universal.title')"
    :model-value="modelValue"
    @close="closed"
    width="22%"
  >
    <div class="center">
      <p class="title">{{ $t('theme.themeColorChange') }}</p>
      <ElColorPicker v-model="mColor" :predefine="predefineColors" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <ElButton @click="closed">{{ $t('universal.cancel') }}</ElButton>
        <ElButton type="primary" @click="comfirm">{{
          $t('universal.confirm')
        }}</ElButton>
      </span>
    </template>
  </ElDialog>
</template>

<script lang="ts" setup>
import { s_themeStore } from '_store/theme'
import { d_generateNewStyle, d_writeNewStyle } from '_utils/d_theme'

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})

const emits = defineEmits(['update:modelValue'])

// 预定义色值
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
]
const themeStore = s_themeStore()

// 默认色值
const mColor = ref(themeStore.mainColor)

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}
/**
 * 确定
 * 1. 修改主题色
 * 2. 保存最新的主题色
 * 3. 关闭 dialog
 */

const comfirm = async () => {
  const newStyle = await d_generateNewStyle(mColor.value)
  d_writeNewStyle(newStyle)
  themeStore.setMainColor(mColor.value)
  // 3. 关闭 dialog
  closed()
}
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
