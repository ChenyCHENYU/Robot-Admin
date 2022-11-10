<!--
 * @Author: ChenYu
 * @Date: 2022-04-14 00:46:13
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-22 14:48:18
 * @FilePath: \v3-el-components\src\components\C_TagsView\index.vue
 * @Description: TagsView组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <div class="tags-view-container">
    <router-link
      v-for="(tag, index) of appStore.tagsViewList"
      :key="tag.fullPath"
      class="tags-view-container-item"
      :class="isActive(tag) ? 'active' : ''"
      :to="{ path: tag.fullPath }"
      @contextmenu.prevent="openMenu($event, index as number)"
    >
      {{ tag.title }}
      <ElIconClose
        v-show="!isActive(tag)"
        class="el-icon-close"
        @click.prevent.stop="onCloseClick(index as number)"
      />
    </router-link>
    <ContextMenu
      ref="targetRef"
      v-show="visible"
      :style="menuStyle"
      :index="selectIndex"
      v-model:visible="visible"
    />
  </div>
</template>

<script lang="ts" setup>
import './index.scss'
import { useOnClickOutside } from '_hooks/useOnClickOutside'
import { s_appStore } from '_store/app'
const appStore = s_appStore()
const route = useRoute()
// 是否被选中
const isActive = (tag) => tag.path === route.path

// 关闭 tag 的点击事件
const onCloseClick = (index: number) =>
  appStore.removeTagsView({ type: 'index', index })

// 鼠标右键
const visible = ref(false)
const menuStyle = ref({
  left: 0 || '0',
  top: 0 || '0',
})
const selectIndex = ref(0)
const openMenu = (e: PointerEvent, index: number) => {
  const { x, y } = e
  menuStyle.value.left = x + 'px'
  menuStyle.value.top = y + 'px'
  selectIndex.value = index
  visible.value = true
}

const targetRef = ref()
useOnClickOutside(targetRef, visible)
</script>
