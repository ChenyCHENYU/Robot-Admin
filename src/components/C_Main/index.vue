<template>
  <ElMain>
    <!-- 带有切换动画，并且具备组件缓存的 -->
    <RouterView v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <!-- FIXME: 注意，在这里使用了keep-alive，要想页面中发现数据没更新，需要在对应页面使用onActived(传入更新数据的方法，如getDataFn) -->
        <!-- <keep-alive> -->
        <div :key="route.path" style="height: calc(100%)">
          <component :is="Component" />
        </div>
        <!-- </keep-alive> -->
      </transition>
    </RouterView>
    <ElFooter v-if="themeConfig.footer">
      <C_Footer />
    </ElFooter>
  </ElMain>
</template>

<script lang="ts" setup>
import { s_globalStore } from '@/store'
const globalStore = s_globalStore()
const themeConfig = computed(() => globalStore.themeConfig)
</script>
