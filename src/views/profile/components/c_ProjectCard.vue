<!--
 * @Author: ChenYu
 * @Date: 2022-04-18 01:34:06
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-18 16:08:31
 * @FilePath: \v3-el-components\src\views\profile\components\c_ProjectCard.vue
 * @Description: 项目介绍组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <ElCard class="user-container">
    <template #header>
      <div class="header">
        <span>{{ $t('profile.introduce') }}</span>
      </div>
    </template>
    <!-- TODO: 头像 -->
    <div class="user-profile">
      <div class="box-center">
        <C_PanThumb :image="userStore.userInfo.avatar">
          <div>Hello</div>
          {{ userStore.userInfo.username }}
        </C_PanThumb>
      </div>
      <!-- 姓名 && 角色 -->
      <div class="box-center">
        <div class="user-name text-center">
          {{ userStore.userInfo.username }}
        </div>
        <div class="user-role text-center text-muted">
          {{ userStore.userInfo.title }}
        </div>
      </div>
    </div>
    <!-- TODO:简介 -->
    <div class="project-bio">
      <div class="project-bio-section">
        <div class="project-bio-section-header">
          <C_Icon
            iconName="introduce"
            isCustomIcon
            style="display: inline-block"
          />
          <span>{{ $t('profile.projectIntroduction') }}</span>
        </div>
        <div class="project-bio-section-body">
          <div class="text-muted">
            {{ $t('profile.muted') }}
          </div>
        </div>
      </div>

      <div class="project-bio-section">
        <div class="project-bio-section-header">
          <C_Icon
            iconName="reward"
            isCustomIcon
            style="display: inline-block"
          />
          <span>{{ $t('profile.projectFunction') }}</span>
        </div>
        <div class="project-bio-section-body">
          <div class="progress-item" v-for="item in features" :key="item.id">
            <div>{{ item.title }}</div>
            <ElProgress :percentage="item.percentage" status="success" />
          </div>
        </div>
      </div>
    </div>
  </ElCard>
</template>

<script lang="ts" setup>
import { s_userStore } from '_store/user'
const userStore = s_userStore()
interface Props {
  features: any[]
}
defineProps<Props>()
</script>
