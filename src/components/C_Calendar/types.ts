/*
 * @Author: ChenYu
 * @Date: 2022-03-28 02:04:49
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-03-28 02:05:56
 * @FilePath: \v3-el-components\src\components\C_Calendar\types.ts
 * @Description: 日历类型文件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

export interface I_EventItem {
  // 事件标题
  title: string
  // 开始时间
  start: string
  // 结束时间
  end: string
  // 是否可拖拽
  editable?: boolean
}
