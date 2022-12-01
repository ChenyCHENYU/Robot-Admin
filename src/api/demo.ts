/*
 * @Description:
 * @Author: ChenYu ycyplus@163.com
 * @Date: 2022-11-18 09:06:17
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-12-01 14:33:22
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

/**
 * @description: 删除当前行元素
 * @param {*} id 当前行 id
 * @return {*}
 */
export const deleteDataRow = (id) => {
  return request({
    url: `/rowDelete/${id}`,
  })
}

/**
 * @description: 批量删除元素
 * @param {*} data 元素id数组
 * @return {*}
 */
export const multipleSelectionDelete = (data) => {
  return request({
    url: `/multipleSelectionDelete`,
    method: 'POST',
    data,
  })
}

// 导出数据
export const exportInfo = (data) => {
  return request({
    url: `/export`,
    method: 'POST',
    data,
    responseType: 'blob',
  })
}

// 导入数据

export const importInfo = (data) => {
  return request({
    url: `/import`,
    method: 'POST',
    data,
    responseType: 'blob',
  })
}
