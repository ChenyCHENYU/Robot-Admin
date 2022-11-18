<!--
 * @Author: ChenYu
 * @Date: 2022-04-18 01:35:19
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-18 19:22:52
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\profile\components\c_Author.vue
 * @Description: 作者组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <div class="author-container">
    <div class="header">
      <C_PanThumb
        image="https://avatars.githubusercontent.com/u/44045236?v=4"
        height="60px"
        width="60px"
        :hoverable="false"
      >
        <span class="profile-name"> {{ $t('profile.name') }}</span>
      </C_PanThumb>
      <div class="header-desc">
        <h3>{{ $t('profile.name') }}</h3>
        <span>{{ $t('profile.job') }}</span>
      </div>
    </div>
    <div class="info">
      {{ $t('profile.Introduction') }}
    </div>
  </div>
</template>
