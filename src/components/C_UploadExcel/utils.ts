/*
 * @Author: ChenYu
 * @Date: 2022-04-22 14:27:05
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-22 14:39:13
 * @FilePath: \v3-el-components\src\components\C_UploadExcel\utils.ts
 * @Description: 服务于export excel的工具类
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import XLSX from 'xlsx'
/**
 * 获取表头（通用方式）
 */
export const getHeaderRow = (sheet) => {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r
  /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    /* find the cell in the first row */
    let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

export const isExcel = (file) => {
  return /\.(xlsx|xls|csv)$/.test(file.name)
}
