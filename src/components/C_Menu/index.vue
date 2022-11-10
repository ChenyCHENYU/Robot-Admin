<!--
 * @Author: ChenYu
 * @Date: 2022-03-14 00:04:07
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-05-06 10:04:59
 * @FilePath: \v3-el-components\src\components\C_Menu\index.vue
 * @Description: 菜单组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <ElMenu :defaultActive="defaultActive" :router="router" v-bind="$attrs">
    <template v-for="item of MENU_DATA" :key="item[index]">
      <ElMenuItem
        v-if="!item[children] || !item[children].length"
        :index="item[index]"
      >
        <component v-if="item[icon]" :is="item[icon]"></component>
        <span>{{ item[name] }}</span>
      </ElMenuItem>
      <!-- 二级菜单 -->
      <ElSubMenu
        v-if="item[children] && item[children].length"
        :index="item[index]"
      >
        <template #title>
          <component v-if="item[icon]" :is="item[icon]"></component>
          <span>{{ item[name] }}</span>
        </template>
        <ElMenuItem
          v-for="c_item of item[children]"
          :key="c_item[index]"
          :index="c_item[index]"
        >
          <component v-if="c_item[icon]" :is="c_item[icon]"></component>
          <span>{{ c_item[name] }}</span>
        </ElMenuItem>
      </ElSubMenu>
    </template>
  </ElMenu>
</template>

<script lang="ts" setup>
interface Props {
  MENU_DATA: any[]
  defaultActive: string
  router?: boolean // 是否是路由模式
  name?: string
  index?: string
  icon?: string
  children?: string
}

// // 键名 - 菜单标题的键名
// name: {
//   type: String,
//   default: 'name',
// },
// // 键名 - 菜单标识的键名
// index: {
//   type: String,
//   default: 'index',
// },
// // 键名 - 菜单图标的键名
// icon: {
//   type: String,
//   default: 'icon',
// },
// // 键名 - 菜单子菜单的键名
// children: {
//   type: String,
//   default: 'children',
// },
withDefaults(defineProps<Props>(), {
  defaultActive: '',
  router: false,
  name: 'name',
  index: '1',
  icon: 'icon',
  children: 'children',
})
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

svg {
  margin-right: 4px;
}
</style>
