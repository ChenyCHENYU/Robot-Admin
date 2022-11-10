<!--
 * @Author: ChenYu
 * @Date: 2022-04-18 01:35:19
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-18 16:08:10
 * @FilePath: \v3-el-components\src\views\profile\components\c_Author.vue
 * @Description: 作者组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <div class="author-container">
    <div class="header">
      <C_PanThumb
        image="https://img4.sycdn.imooc.com/61110c2b0001152907400741-140-140.jpg"
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
