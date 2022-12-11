<!--
 * @Author: ChenYu
 * @Date: 2022-03-05 13:53:13
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-12-11 16:52:43
 * @FilePath: \vue3_vite3_element-plus_admin\src\components\C_Container\index.vue
 * @Description: 布局的容器组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <ElContainer>
    <ElAside width="auto">
      <C_NavSide id="guide-sidebar" v-model:isCollapse="isCollapse" />
    </ElAside>
    <ElContainer>
      <ElHeader>
        <C_NavHeader v-model:isCollapse="isCollapse" />
      </ElHeader>
      <!-- TagsView -->
      <C_TagsView id="guide-tags" />
      <ElMain>
        <!-- 带有切换动画，并且具备组件缓存的 -->
        <RouterView v-slot="{ Component, route }">
          <transition name="fade-transform" mode="out-in">
            <!-- FIXME: 注意，在这里使用了keep-alive，要想页面中发现数据没更新，需要在对应页面使用onActived(传入更新数据的方法，如getDataFn) -->
            <!-- <keep-alive> -->
            <div :key="route.path" style="height: 100%">
              <component :is="Component" />
            </div>
            <!-- </keep-alive> -->
          </transition>
        </RouterView>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<script lang="ts" setup name="C_Container">
import { s_appStore } from '_store/app'
import { d_watchSwitchLang, t } from '_utils/d_i18n'
import { d_isTags } from '_utils/d_tags'

const isCollapse = ref(false)

// TODO: 处理tagsView
const appStore = s_appStore()
const route = useRoute()

// TODO: 生成获取 翻译中英文 title
const _getTitle = (route) => {
  let title = ''
  if (!route.meta) {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title =
      appStore.language === 'zh' ? route.meta.title : t(`route.${route.name}`)
  }
  return title
}

watch(
  route,
  (to) => {
    // 并不是所有路由都保存在 tags 中
    if (!d_isTags(to.path)) return
    const { fullPath, meta, name, params, path, query } = to
    appStore.addTagesViewList({
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: _getTitle(to),
    })
  },
  { immediate: true }
)

d_watchSwitchLang(() => {
  appStore.tagsViewList.forEach((route, index) => {
    appStore.changeTagesView({
      index,
      tag: { ...route, title: _getTitle(route) },
    })
  })
})
</script>

<style lang="scss">
.el-header {
  padding: 0;
  border-bottom: 1px solid #eee;
}
</style>
