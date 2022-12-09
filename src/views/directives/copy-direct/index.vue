<!--
 * @Description: 复制指令
 * @Author: Cheny ycyplus@gmail.com
 * @Date: 2022-12-09 16:33:20
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-09 17:05:24
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\directives\copy-direct\index.vue
 * Copyright (c) 2022 西安天智 AgileTeam by Cheny email: ycyplus@gmail.com, All Rights Reserved.
-->
<template>
  <div class="card content-box">
    <span class="text">复制指令 🍇🍇🍇🍓🍓🍓</span>
    <div class="box-content">
      <el-input placeholder="请输入内容" v-model="data" style="width: 500px">
        <template #append>
          <ElButton v-copy="data">复制</ElButton>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script setup lang="ts" name="copyDirect">
const data = ref<string>('我是被复制的内容 🍒 🍉 🍊')
</script>
