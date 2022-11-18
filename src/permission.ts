/*
 * @Author: ChenYu
 * @Date: 2022-04-06 01:57:32
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-18 17:49:11
 * @FilePath: \vue3_vite3_elementPlus_admin\src\permission.ts
 * @Description: 路由守卫文件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import router from '@/router'
import { s_userStore } from '@/store/user/index'

// 白名单
const whiteList = ['/login', '/404', '/401']

// TODO: 路由前置守卫
router.beforeEach(async (to, from, next) => {
  const { token, hasUserInfo, getUserInfo } = s_userStore()

  // 1、用户已登录，不允许进入login页
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      console.log(hasUserInfo)
      // 判断用户资料是否存在，如果不存在，则获取用户信息
      if (!hasUserInfo) await getUserInfo()
      window.document.title = to.meta.title
      next()
    }
  } else {
    // 2、用户未登录，只允许进入login页
    if (whiteList.includes(to.path)) next()
    else next('/login')
  }
})
