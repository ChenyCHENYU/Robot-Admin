<!--
 * @Author: ChenYu
 * @Date: 2022-04-16 00:48:51
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-11 12:35:31
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_ScreenFull\index.vue
 * @Description: 全屏组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <IconFullScreen
    :iconName="isFullscreen ? '' : 'fullscreen'"
    @click="onToggle"
  />
</template>

<script lang="ts" setup>
import screenfull from 'screenfull'
// 是否全屏
const isFullscreen = ref(false)

// 监听变化
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

// 切换事件
const onToggle = () => {
  screenfull.toggle()
}

// 设置侦听器
onMounted(() => {
  screenfull.on('change', change)
})

// 删除侦听器
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>
