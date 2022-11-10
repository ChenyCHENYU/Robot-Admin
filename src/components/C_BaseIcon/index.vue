<!--
 * @Author: ChenYu
 * @Date: 2022-03-05 21:48:53
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-03-17 16:52:23
 * @FilePath: \v3-el-components\src\components\C_BaseIcon\index.vue
 * @Description: BaseIcon是基于ElementPlus提供的内部Icon图标
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <ElButton @click="handleClickBtn" type="primary">
    选择图标
    <slot></slot>
  </ElButton>

  <ElDialog :title="title" v-model="dialogVisible">
    <ElScrollbar height="600px">
      <div class="container">
        <div
          class="container-item"
          v-for="(item, index) of ElIcons"
          :key="index"
          @click="clickSelectIcon(item.name)"
        >
          <!-- TODO: 通过动态组件渲染所有的ElIcon图标 -->
          <component :is="`ElIcon${item.name}`" />
          <div class="container-item-info">{{ item.name }}</div>
        </div>
      </div>
    </ElScrollbar>
  </ElDialog>
</template>

<script lang="ts" setup>
import './index.scss'
import * as ElIcons from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { useCopy } from '_hooks/useCopy'

const props = defineProps<{
  title: string // 弹出框标题
  visible: boolean // 控制跳出狂的显示隐藏
}>()
const emits = defineEmits(['update:visible'])

// 拷贝一份父组件传递过来的 visible
const dialogVisible = ref<boolean>(props.visible)

watch(
  () => props.visible,
  (value) => {
    dialogVisible.value = value
  }
)

// 主要是为了监听到它关闭后的变化，并且因为把接收过来的值重新赋值了，单向数据流,否则使用下面的监听即可，上面绑定 visible
watch(
  () => dialogVisible.value,
  (value) => {
    emits('update:visible', value)
  }
)

// TODO: 监听 visible 的变化  --- 这个地方其实会有一个坑，要注意了
// 如果父子组件是一对一的情况下，单向数据流，子组件改变了父组件的值么问题，否则使用方面的方式，这样的方式会导致其他子组件使用父组件的值受到污染
// watch(
//   () => props.visible,
//   (val) => {
//     console.log('value', val)
//     emits('update:visible', val)
//   }
// )
const handleClickBtn = () => {
  // 需要修改父组件的数据
  emits('update:visible', !props.visible)
}

const clickSelectIcon = (iconItem: string) => {
  let icon = `<ElIcon${iconItem}/>`
  console.log('icon', icon)
  useCopy(icon)
  // 关闭弹出层
  dialogVisible.value = false
}
</script>
