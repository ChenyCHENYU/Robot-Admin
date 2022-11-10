/*
 * @Author: ChenYu
 * @Date: 2022-04-07 00:08:39
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-08 00:04:58
 * @FilePath: \v3-el-components\src\utils\d_auth.ts
 * @Description: 处理token时效性，被动触发主动退出登录
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { getItem, setItem } from '@/hooks/useStorage'

/**
 * @description: 获取缓存的时间戳
 */
export const d_getTimeStamp = (): number => getItem(TIME_STAMP)

/**
 * @description: 设置缓存时间戳
 */
export const d_setTimeStamp = (): void => setItem(TIME_STAMP, Date.now())

/**
 * @description: 是否超时
 */

export const d_isCheckTimeout = (): boolean => {
  // 当前时间
  const currentTime = Date.now()
  // 缓存时间
  const timeStamp = d_getTimeStamp()
  // 判断是否超时
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
