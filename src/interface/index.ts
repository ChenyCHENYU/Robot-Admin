/*
 * @Description: 全局通用的接口类型定义
 * @Author: ChenYu ycyplus@163.com
 * @Date: 2022-11-24 14:36:10
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-25 00:51:04
 * @FilePath: \vue3_vite3_element-plus_admin\src\interface\index.ts
 * Copyright (c) 2022 西安天智 AgileTeam by ChenYu email: ycyplus@163.com, All Rights Reserved.
 */

// TODO: FormSearch 组件检索通用参数
export namespace FormSearch {
  export interface I_BaseParams {
    pageNum: number
    pageSize: number
    [key: string]: string | number | boolean | string[]
  }
}
