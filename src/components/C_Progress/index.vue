<!--
 * @Author: ChenYu
 * @Date: 2022-03-14 17:29:08
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-14 12:19:36
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_Progress\index.vue
 * @Description: 进度条组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <div class="svg">
    <ElProgress :percentage="p" isAnimation :time="time" v-bind="$attrs" />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  percentage: number // 进度条进度 - 百分比
  isAnimation?: boolean // 进度条是否有动画效果
  time?: number // 动画时长(毫秒)
}

const props = withDefaults(defineProps<Props>(), {
  percentage: 0,
  isAnimation: false,
  time: 3000,
})

const p = ref<number>(0)

// 进度条加载动画
onMounted(() => {
  if (props.isAnimation) {
    const t = Math.ceil(props.time / props.percentage)
    const timer = setInterval(() => {
      p.value += 1
      if (p.value >= props.percentage) {
        p.value = props.percentage
        clearInterval(timer)
      }
    }, t)
  } else {
    p.value = props.percentage
  }
})
</script>
<style lang="scss">
.svg svg {
  width: 100%;
  height: 100%;
}
</style>
