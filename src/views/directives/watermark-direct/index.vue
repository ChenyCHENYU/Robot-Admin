<!--
 * @Description: 水印指令
 * @Author: Cheny ycyplus@gmail.com
 * @Date: 2022-12-09 16:33:20
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-09 17:04:26
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\directives\watermark-direct\index.vue
 * Copyright (c) 2022 西安天智 AgileTeam by Cheny email: ycyplus@gmail.com, All Rights Reserved.
-->
<template>
  <div
    style="height: 85vh"
    v-waterMarker="{
      text: 'Robot Admin',
      textColor: 'rgba(180, 180, 180, 0.6)',
    }"
  >
    <span class="text">水印指令 🍇🍇🍇🍓🍓🍓</span>
  </div>
</template>

<script setup lang="ts" name="watermarkDirect"></script>
