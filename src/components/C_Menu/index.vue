<!--
 * @Author: ChenYu
 * @Date: 2022-03-14 00:04:07
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-12-11 02:24:04
 * @FilePath: \vue3_vite3_element-plus_admin\src\components\C_Menu\index.vue
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
  defaultActive?: string
  router?: boolean
  name?: string
  index?: string
  icon?: string
  children?: string
}
withDefaults(defineProps<Props>(), {
  defaultActive: '1',
  router: false,
  name: 'name',
  index: '1',
  icon: 'icon',
  children: 'children',
})
</script>
