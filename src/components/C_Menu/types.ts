/*
 * @Author: ChenYu
 * @Date: 2022-03-14 00:07:11
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-10 00:36:31
 * @FilePath: \v3-el-components\src\components\C_Menu\types.ts
 * @Description: menu 组件的 types
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

// FIXME: 扁平化废弃
// export interface I_MenuItem {
//   icon?: string
//   i?: any
//   name: string
//   index: string // 导航标识
//   children?: I_MenuItem[]
// }

export interface I_MenuItem {
  path: string // 导航标识
  name: string // 组件名
  children: I_MenuItem[]
  meta: {
    title: string
    icon?: string
    hidden?: boolean
  }
}
