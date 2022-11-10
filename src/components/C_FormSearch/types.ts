/*
 * @Author: ChenYu
 * @Date: 2022-04-11 20:11:01
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-12 00:40:21
 * @FilePath: \v3-el-components\src\components\C_FormSearch\types.ts
 * @Description:
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

// TODO: Form检索中Select选择器字段
interface I_SelectSearchList {
  labelDefault: string
  value: number
}

// TODO: Form检索区用到的字段
export interface I_FormItem {
  type: string
  prop: string
  label?: string
  isFocus?: boolean
  placeholder?: string
  hisList?: string[]
  list?: I_SelectSearchList[]
  show?: boolean
}

export interface I_Object {
  [key: string]: any
}
