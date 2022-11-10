/*
 * @Author: ChenYu
 * @Date: 2022-04-04 13:10:47
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-18 11:37:03
 * @FilePath: \v3-el-components\src\api\sys.ts
 * @Description: 登录相关的接口
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import request from '@/axios/request'

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
