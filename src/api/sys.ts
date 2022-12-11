/*
 * @Author: ChenYu
 * @Date: 2022-04-04 13:10:47
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-12-11 11:37:32
 * @FilePath: \vue3_vite3_element-plus_admin\src\api\sys.ts
 * @Description: 登录相关的接口
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import request from '@/axios/request'
import DynamicRouter from '@/assets/json/dynamicRouter.json'

// 登录接口
export const login = (data: any) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data,
  })
}

// 获取用户信息接口
export const getUserInfo = () => {
  return request({
    url: '/sys/profile',
  })
}

// 获取菜单列表
export const getAuthMenuListApi = () => {
  // return request({
  //   url: '/sys/menu/list',
  // })
  // 暂时使用本地数据
  return DynamicRouter
}
