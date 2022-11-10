<!--
 * @Author: ChenYu
 * @Date: 2022-04-10 20:41:00
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-10 22:15:00
 * @FilePath: \v3-el-components\src\components\C_Breadcrumb\index.vue
 * @Description: 面包屑组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <ElBreadcrumb separator="/">
    <transition-group name="breadcrumb">
      <ElBreadcrumbItem
        v-for="item of breadcrumbData"
        :key="item.path"
        :to="{ path: item.path }"
      >
        {{ item.meta.title }}
        <!-- 不可点击 -->
        <!-- <span v-if="index === breadcrumbData.length - 1" class="no-redirect">
          {{ item.meta.title }}
        </span> -->
        <!-- 可点击 -->
        <!-- <span v-else> {{ item.meta.title }}</span> -->
        <!-- <span v-else @click="onLinkClick(item)"> {{ item.meta.title }}</span> -->
      </ElBreadcrumbItem>
    </transition-group>
  </ElBreadcrumb>
</template>

<script lang="ts" setup>
// 生成数组数据
const breadcrumbData = ref<any[]>([])
// const getBreadcrumData = () => {
//   console.log('route', route.matched)
//   breadcrumbData.value = route.matched.filter(
//     (item) => item.meta && item.meta.title
//   )
// }
const route = useRoute()
// 监听路由变化
watch(
  route,
  () =>
    (breadcrumbData.value = route.matched.filter(
      (item) => item.meta && item.meta.title
    )),
  { immediate: true }
)

// const router = useRouter()
// const onLinkClick = (item) => {
//   console.log('item ===>', item)
//   router.push(item.path)
// }
</script>

<style>
.no-redirect {
  color: #97a8be;
}
</style>
