/*
 * @Author: ChenYu
 * @Date: 2022-04-06 01:07:19
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-06 01:18:36
 * @FilePath: \v3-el-components\src\hooks\useStorage\index.ts
 * @Description: 封装 storage
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

//TODO: 存储数据
export const setItem = (key: string, value: any): void => {
  // value分为两种情况 1、基本数据类型 2、复杂数据类型
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

//TODO: 获取数据
export const getItem = (key: string) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data!)
  } catch {
    return data
  }
}

// 删除指定数据
export const removeItem = (key) => window.localStorage.removeItem(key)

// 删除所有数据
export const removeAllItem = () => window.localStorage.clear()
