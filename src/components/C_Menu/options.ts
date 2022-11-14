/*
 * @Author: ChenYu
 * @Date: 2022-03-14 12:40:57
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-14 11:12:02
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_Menu\options.ts
 * @Description: 实例选项
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import type { PropType } from 'vue'
import type { I_MenuItem } from './types'
export const VUE_OPTIONS = {
  props: {
    MENU_DATA: {
      type: Array as PropType<I_MenuItem[]>,
      required: true,
    },
    defaultActive: {
      type: String,
      default: '',
    },
    // 是否是路由模式
    router: {
      type: Boolean,
      default: false,
    },
    // 键名 - 菜单标题的键名
    name: {
      type: String,
      default: 'name',
    },
    // 键名 - 菜单标识的键名
    index: {
      type: String,
      default: 'index',
    },
    // 键名 - 菜单图标的键名
    icon: {
      type: String,
      default: 'icon',
    },
    // 键名 - 菜单子菜单的键名
    children: {
      type: String,
      default: 'children',
    },
  },
}
