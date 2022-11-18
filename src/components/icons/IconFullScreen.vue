<!--
 * @Description: 
 * @Author: ChenYu ycyplus@163.com
 * @Date: 2022-11-11 12:21:45
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-11 20:46:32
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\icons\IconFullScreen.vue
 * Copyright (c) 2022 西安天智 AgileTeam by ChenYu email: ycyplus@163.com, All Rights Reserved.
-->
<template>
  <svg
    v-if="iconName === 'fullscreen'"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 2 20 24"
  >
    <path
      fill="#000000"
      d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z"
    />
  </svg>
  <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      fill="#000000"
      d="M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  iconName: string
}

withDefaults(defineProps<Props>(), {
  iconName: 'fullscreen',
})
</script>
