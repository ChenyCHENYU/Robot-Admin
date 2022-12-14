<!--
 * @Author: ChenYu
 * @Date: 2022-03-05 13:53:13
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-14 09:24:06
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_Container\LayoutClassic.vue
 * @Description: 布局的容器组件 - 经典布局
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<!-- 经典布局 -->
<template>
  <div class="common-layout">
    <ElContainer>
      <ElHeader>
        <C_NavHeader v-model:isCollapse="isCollapse" />
      </ElHeader>
      <ElContainer>
        <ElAside class="transtion" :width="isCollapse ? '60px' : '200px'">
          <C_NavSide id="guide-sidebar" v-model:isCollapse="isCollapse" />
        </ElAside>
        <C_Main />
      </ElContainer>
    </ElContainer>
  </div>
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

<style lang="scss" scoped>
.el-header {
  padding: 0;
  border-bottom: 1px solid #eee;
}
.transtion {
  transition: all 500ms;
}
</style>
