/*
 * @Author: ChenYu
 * @Date: 2022-12-11 10:44:00
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-12-11 10:56:35
 * @FilePath: \vue3_vite3_element-plus_admin\src\config\nprogress.ts
 * @Description: 第三方进度条库
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: true, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
})
export default NProgress
