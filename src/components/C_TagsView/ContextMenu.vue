<!--
 * @Author: ChenYu
 * @Date: 2022-04-14 23:20:21
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-10 12:34:39
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_TagsView\ContextMenu.vue
 * @Description: tags 右键菜单组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">刷新</li>
    <li @click="onCloseRightClick">关闭右侧</li>
    <li @click="onCloseOtherClick">关闭其他</li>
  </ul>
</template>

<script lang="ts" setup>
import { s_appStore } from '_store/app/index'
import type { T_TagsCloseType } from './types'

interface Props {
  index: number
}
const props = defineProps<Props>()
const emits = defineEmits(['update:visible'])

const router = useRouter()
const appStore = s_appStore()

const onRefreshClick = () => router.go(0)
const onCloseRightClick = () => _removeTagsView('right', props.index)
const onCloseOtherClick = () => _removeTagsView('other', props.index)
const _removeTagsView = (type: T_TagsCloseType, index: number) => {
  appStore.removeTagsView({ type, index })
  emits('update:visible', false)
}
</script>
