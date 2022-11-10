/*
 * @Author: ChenYu
 * @Date: 2022-04-14 00:27:08
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-22 15:04:24
 * @FilePath: \v3-el-components\src\utils\d_tags.ts
 * @Description: 处理 tags
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

const whiteList = ['/login', '/401', '/404', '/excelImport']

export const d_isTags = (path: string) => {
  return !whiteList.includes(path)
}
