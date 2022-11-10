<!--
 * @Author: ChenYu
 * @Date: 2022-03-14 11:20:08
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-10 21:02:35
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_Icon\index.vue
 * @Description: 图标组件，eleplus 及 外部 svg 图标 
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <div id="icon">
    <span v-if="outside" :style="{ fontSize: size + 'px' }">
      <span class="iconify m-iconify" :data-icon="iconName"></span>
    </span>
    <!-- TODO: eleIcon图标 -->
    <component
      v-else-if="!isCustomIcon"
      :is="dispoeIconName"
      v-bind="$attrs"
      :class="iconClassName"
      :color="color"
    />
    <!-- TODO: 自定义svgIcon，注意fill属性，若color不生效，请查询图标源文件的fill，剔除掉 -->
    <svg
      v-else
      :class="iconClassName ? iconClassName : 'svg-icon'"
      aria-hidden="true"
    >
      <use :href="svgIconName" :fill="color" />
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { d_toUperCaseFirstLetter } from '_utils/d_tools'

interface Props {
  iconName: string
  iconClassName?: string
  isCustomIcon?: boolean
  color?: string
  outside?: boolean
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  iconName: '',
  isCustomIcon: false,
  color: 'black', // 如果默认白色 抽不到，设置个这吧
  outside: false,
  size: 18,
})

// 判断当前图标是否为自定义图标,
const svgIconName = computed(() => `#${'i'}-${props.iconName}`)

// TODO: 判断传递的图标名称是否带ElIcon前缀
const dispoeIconName = computed(() =>
  props.iconName?.startsWith('ElIcon')
    ? props.iconName
    : `ElIcon${d_toUperCaseFirstLetter(props.iconName!)}`
)
</script>
<style scoped lang="scss">
.m-iconify {
  vertical-align: middle;
}
</style>
