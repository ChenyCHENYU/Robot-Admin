<!--
 * @Description: 长按指令
 * @Author: Cheny ycyplus@gmail.com
 * @Date: 2022-12-09 16:33:20
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-09 17:45:02
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\directives\longpress-direct\index.vue
 * Copyright (c) 2022 西安天智 AgileTeam by Cheny email: ycyplus@gmail.com, All Rights Reserved.
-->
<template>
  <span class="text">长按指令 🍇🍇🍇🍓🍓🍓</span>
  <el-button type="primary" v-longpress="longpress">长按2秒触发事件</el-button>
</template>

<script setup lang="ts" name="longpressDirect">
import { d_ElMessage } from '_utils/d_tips'

const longpress = () => d_ElMessage('长按事件触发成功 🎉🎉🎉')
</script>
