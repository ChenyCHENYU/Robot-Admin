/*
 * @Author: ChenYu
 * @Date: 2022-04-22 08:48:17
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-27 14:33:13
 * @FilePath: \v3-el-components\src\api\user-manage.ts
 * @Description: 用户管理相关接口
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import request from '@/axios/request'

/**
 * @description: 获取用户列表
 */
export const getUserMangeList = (data) => {
  return request({
    url: '/user-manage/list',
    data,
  })
}

/**
 * @description: 删除指定数据
 */
export const deleteUser = (id: string) => {
  return request({
    url: `/user-manage/detele/${id}`,
  })
}

/**
 * @description: 获取所有用户列表数据
 */
export const getUserManageAllList = () => {
  return request({
    url: `/user-manage/all-list`,
  })
}

/**
 * @description: 获取所有用户列表数据
 */
export const userDetail = (id: string) => {
  return request({
    url: `/user-manage/detail/${id}`,
  })
}

/**
 * @description: 获取指定用户角色
 */
export const userRoles = (id) => {
  return request({
    url: `/user-manage/role/${id}`,
  })
}

/**
 * @description: 给用户分配角色
 */
export const updateRole = (id, roles) => {
  return request({
    url: `/user-manage/update-role/${id}`,
    method: 'POST',
    data: {
      roles,
    },
  })
}
