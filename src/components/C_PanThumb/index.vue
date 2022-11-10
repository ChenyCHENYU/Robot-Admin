<!--
 * @Author: ChenYu
 * @Date: 2022-04-18 01:51:43
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-18 11:13:17
 * @FilePath: \v3-el-components\src\components\C_PanThumb\index.vue
 * @Description: 头像组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <div class="pan-item" :style="{ zIndex, height, width }">
    <!-- 内层文字信息 -->
    <div class="pan-info">
      <div class="pan-info-container">
        <slot />
      </div>
    </div>
    <!-- 外层图片  -->
    <div
      class="pan-thumb"
      :style="{
        backgroundImage: `url(${image})`,
      }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import './index.scss'
interface Props {
  image: string
  zIndex?: number
  width?: string
  height?: string
}

withDefaults(defineProps<Props>(), {
  zIndex: 1,
  width: '150px',
  height: '150px',
})
</script>
