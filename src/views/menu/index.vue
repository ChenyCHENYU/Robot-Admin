<!--
 * @Author: ChenYu
 * @Date: 2022-03-14 00:04:55
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-03-14 17:20:54
 * @FilePath: \v3-el-components\src\views\menu\index.vue
 * @Description: menu 页面
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <div style="width: 200px">
    <C_Menu
      :MENU_DATA="MENU_DATA"
      defaultActive="1"
      name="a"
      index="b"
      icon="c"
      children="d"
    />
  </div>

  <br />
  <br />

  <div style="width: 200px">
    <C_InfiniteMenu :MENU_DATA="MENU_DATA_INIT" defaultActive="1" />
  </div>
</template>

<script lang="ts" setup>
import { MENU_DATA, MENU_DATA_INIT } from './data'
import C_InfiniteMenu from '_c/C_Menu/menu'
</script>
<style lang="scss" scoped></style>
