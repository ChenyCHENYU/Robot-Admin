<!--
 * @Author: ChenYu
 * @Date: 2022-03-14 17:29:35
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-03-15 14:06:09
 * @FilePath: \v3-el-components\src\views\progress\index.vue
 * @Description: 进度条组件页面
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <C_Progress :percentage="60" isAnimation :time="3000" />
  <C_Progress
    :percentage="80"
    :isAnimation="true"
    :text-inside="true"
    :stroke-width="24"
    status="success"
  />
  <C_Progress type="circle" :percentage="70" isAnimation />
</template>
