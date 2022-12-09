<!--
 * @Description: 防抖指令
 * @Author: Cheny ycyplus@gmail.com
 * @Date: 2022-12-09 16:33:20
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-09 17:25:42
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\directives\debounce-direct\index.vue
 * Copyright (c) 2022 西安天智 AgileTeam by Cheny email: ycyplus@gmail.com, All Rights Reserved.
-->
<template>
  <div>
    <span class="text">防抖指令 🍇🍇🍇🍓🍓🍓</span>
    <ElButton type="primary" v-debounce="debounceClick"
      >防抖按钮 (0.5秒后执行)
    </ElButton>
  </div>
</template>

<script setup lang="ts" name="debounceDirect">
import { d_ElMessage } from '_utils/d_tips'
const debounceClick = () => d_ElMessage('我是防抖按钮触发的事件 🍍🍓🍌')
</script>
