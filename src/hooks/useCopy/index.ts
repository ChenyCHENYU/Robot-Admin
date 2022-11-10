/*
 * @Author: ChenYu
 * @Date: 2022-03-06 01:01:56
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-03 19:34:48
 * @FilePath: \v3-el-components\src\hooks\useCopy\index.ts
 * @Description: 复制文本功能
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import { ElMessage } from 'element-plus'

/**
 * @description 复制文本功能
 * @param text  要复制的文本
 * @param msg  提示的信息
 * @return void
 */

export const useCopy = (text: string, msg = '复制成功'): void => {
  // 创建输入框
  const input = document.createElement('input')
  // 给输入框 value 赋值
  input.value = text
  // 追加到 body 里面去
  document.body.appendChild(input)
  // 选择输入框的操作
  input.select()
  // 执行复制操作
  document.execCommand('Copy')
  // 删除节点
  document.body.removeChild(input)
  // 提示用户
  ElMessage.success(msg)
}
