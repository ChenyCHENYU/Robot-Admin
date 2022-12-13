<!--
 * @Author: ChenYu
 * @Date: 2022-04-10 20:41:00
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-13 20:35:07
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_Breadcrumb\index.vue
 * @Description: 面包屑组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <ElBreadcrumb separator="/" v-if="themeConfig.breadcrumb">
    <transition-group name="breadcrumb">
      <!-- 首页面包屑不要可以直接删除 🙅‍♀️ -->
      <ElBreadcrumbItem
        :to="{ path: HOME_URL }"
        :key="HOME_URL"
        v-if="breadcrumbList[0].meta.title !== '首页'"
      >
        <div class="breadcrumb-item">
          <C_Icon
            v-if="themeConfig.breadcrumbIcon"
            iconName="ic:sharp-home-work"
            outside
          />
          <span class="breadcrumb-title">首页</span>
        </div>
      </ElBreadcrumbItem>
      <!-- other -->
      <ElBreadcrumbItem
        v-for="item in breadcrumbList"
        :key="item.path"
        :to="{ path: item.path }"
      >
        <div class="breadcrumb-item">
          <C_Icon
            v-if="item.meta.icon && themeConfig.breadcrumbIcon"
            :iconName="item.meta.icon"
            outside
          />
          <span class="breadcrumb-title">{{ item.meta.title }}</span>
        </div>
      </ElBreadcrumbItem>
    </transition-group>
  </ElBreadcrumb>
</template>

<script lang="ts" setup>
import { HOME_URL } from '@/constant'
import { s_globalStore } from '@/store'
import { s_permissionStore } from '@/store/permission'

const route = useRoute()
const globalStore = s_globalStore()
const permissionStore = s_permissionStore()
const themeConfig = computed(() => globalStore.themeConfig)
const breadcrumbList = computed(
  () => permissionStore.breadcrumbListGet[route.path]
)
</script>

<style lang="scss">
.breadcrumb-item {
  display: flex;
  svg {
    margin-right: 6px;
    font-size: 16px;
  }
}
</style>
