<!--
 * @Description: 拖拽指令
 * @Author: Cheny ycyplus@gmail.com
 * @Date: 2022-12-09 16:33:20
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-09 17:10:01
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\directives\drag-direct\index.vue
 * Copyright (c) 2022 西安天智 AgileTeam by Cheny email: ycyplus@gmail.com, All Rights Reserved.
-->
<template>
  <div class="card content-box">
    <span class="text">拖拽指令 🍇🍇🍇🍓🍓🍓</span>
    <div v-draggable class="drag-box flx-center">我可以拖拽哦~</div>
  </div>
</template>

<script setup lang="ts" name="dragDirect"></script>

<style scoped lang="scss">
@import './index.scss';
</style>
