/*
 * @Description:
 * @Author: ChenYu ycyplus@163.com
 * @Date: 2022-11-18 09:06:17
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-27 20:06:51
 * @FilePath: \vue3_vite3_element-plus_admin\src\api\demo.ts
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

/**
 * @description: 获取列表的详情数据
 * @param {*} params
 * @return {*}
 */

export const getDetail = (id) => {
  return request({
    url: `/getDetail/${id}`,
  })
}

export const deleteDataRow = (id) => {
  return request({
    url: `/rowDelete/${id}`,
  })
}
