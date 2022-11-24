/*
 * @Author: ChenYu
 * @Date: 2022-03-24 22:45:31
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-24 15:53:24
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\table\types.ts
 * @Description: 数据源的类型
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import type { FormSearch } from '@/interface'

// mock 的 demo 类型，后续根据实际定义的接口文档来定义约束的类型
export interface I_TableData {
  date: string
  name: string
  address: string
}

export interface I_FormParams extends FormSearch.I_BaseParams {
  name: undefined
  type: undefined
  range: undefined
}
