<!--
 * @Description: 节流指令
 * @Author: Cheny ycyplus@gmail.com
 * @Date: 2022-12-09 16:33:20
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-09 17:28:23
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\directives\throttle-direct\index.vue
 * Copyright (c) 2022 西安天智 AgileTeam by Cheny email: ycyplus@gmail.com, All Rights Reserved.
-->
<template>
  <span class="text">节流指令 🍇🍇🍇🍓🍓🍓</span>
  <ElButton type="primary" v-throttle="throttleClick">
    节流按钮 (每隔1S秒后执行)
  </ElButton>
</template>


<script setup lang="ts" name="throttleDirect">
import { d_ElMessage } from '_utils/d_tips'

const throttleClick = () => d_ElMessage('我是节流按钮触发的事件 🍍🍓🍌')
</script>
