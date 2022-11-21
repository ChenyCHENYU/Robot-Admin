/*
 * @Author: ChenYu
 * @Date: 2022-11-21 23:03:51
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-21 23:19:02
 * @FilePath: \vue3_vite3_element-plus_admin\src\utils\d_clipboard.ts
 * @Description: 
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import Clipboard from 'clipboard'
import { ElMessage } from 'element-plus'

declare type optionsType = { successTip: string; failedTip: string }
declare type eventType = { target: string | Element }

const clipboardSuccess = (message: string) => {
  ElMessage({
    message,
    type: 'success',
    duration: 1500,
  })
}

const clipboardError = (message: string) => {
  ElMessage({
    message,
    type: 'error',
  })
}
/**
 * @description 处理复制粘贴板
 * @param  text 复制内容
 * @param event 复制事件对象
 * @param options Event.target 事件提示文案  {successTip:string, failedTip:string}
 */
const handleClipboard = (
  text: string,
  event: eventType,
  options?: optionsType
) => {
  const clipboard = new Clipboard(event.target, {
    text: () => text,
  })
  clipboard.on('success', () => {
    clipboardSuccess(options?.successTip ?? 'copy success')
    clipboard?.destroy()
  })
  clipboard.on('error', () => {
    clipboardError(options?.failedTip ?? 'copy success')
    clipboard?.destroy()
  })
}
export default handleClipboard
