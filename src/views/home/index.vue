<!--
 * @Author: ChenYu
 * @Date: 2022-03-04 00:28:53
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-10 10:20:13
 * @FilePath: \v3-vite-elementPlus-admin\src\views\home\index.vue
 * @Description: 
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <ElButton>我是组件按钮</ElButton>
  <ElIconEdit></ElIconEdit>
  {{ $t('test.sayHi') }}
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
  </el-row>
</template>
