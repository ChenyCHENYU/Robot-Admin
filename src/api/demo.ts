/*
 * @Description:
 * @Author: ChenYu ycyplus@163.com
 * @Date: 2022-11-18 09:06:17
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-18 09:34:11
 * @FilePath: \vue3_vite3_elementPlus_admin\src\api\demo.ts
 * Copyright (c) 2022 西安天智 AgileTeam by ChenYu email: ycyplus@163.com, All Rights Reserved.
 */
import request from '@/axios/request'
/**
 * @description: 获取所有用户列表数据
 */
export const getTableData = (params) => {
  return request({
    url: `/getTableData`,
    params,
  })
}
