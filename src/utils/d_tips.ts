/*
 * @Author: ChenYu
 * @Date: 2022-04-03 20:23:20
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-03 22:27:11
 * @FilePath: \v3-el-components\src\utils\d_tips.ts
 * @Description: 封装消息组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

type T_ElTips = 'success' | 'info' | 'warning' | 'error'

export const d_ElMessage = (message: string, type?: T_ElTips) => {
  ElMessage({
    message: message,
    type: type || 'success',
    grouping: true,
    showClose: false,
  })
}

// TODO: 目前暂时只考虑了一种场景，需要通过异步操作调用方法的，非静态提示，后续有需求在这基础上扩展
export const d_ElMessageBox = async (
  fn: (fnArgs?: any) => void,
  fnArgs: any,
  message = '点击确定按钮将会对数据做不可逆处理，要确定吗?'
) => {
  try {
    const res = await ElMessageBox.confirm(message, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
      closeOnClickModal: false,
    })
    if (res === 'confirm') fn(fnArgs)
  } catch {
    d_ElMessage('已取消操作', 'info')
  }
}

// TODO: 目前暂时只考虑处理成功和失败的提示，非失败及默认都成功，个性化自己再扩展
export const d_ElNotiy = (
  message?: string,
  type?: T_ElTips,
  title?: string
) => {
  ElNotification({
    title: title || `验证${type && type === 'error' ? '失败' : '通过'}`,
    message: message || '数据已更新',
    type: type || 'success',
  })
}
