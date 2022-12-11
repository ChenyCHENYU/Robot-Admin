/*
 * @Author: ChenYu
 * @Date: 2022-04-06 01:57:32
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-12-11 21:08:42
 * @FilePath: \vue3_vite3_element-plus_admin\src\permission.ts
 * @Description: 路由守卫文件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import router from '@/router'
import { s_userStore } from '_store/user'
import NProgress from '@/config/nprogress'
import { initDynamicRouter } from './router/dynamicRouter'
import { s_permissionStore } from '_store/permission'

// 白名单
const whiteList = ['/login', '/404', '/401']

// TODO: 路由前置守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const { token, hasUserInfo, getUserInfo } = s_userStore()
  // 1、用户已登录，不允许进入login页
  if (token) {
    // 想不缓存mentlist，就在守卫这里每次跳转的时候，初始化一下路由表
    const permissionStore = s_permissionStore()
    if (!permissionStore.authMenuList.length) {
      await initDynamicRouter()
      return next({ ...to, replace: true })
    }

    if (to.path === '/login') next('/')
    if (to.path === '/') next('/home')
    else if (to.path.includes('http')) {
      const url = to.path.slice(to.path.indexOf('https:'))
      window.open(url, '_blank')
      next(false)
    } else {
      // 判断用户资料是否存在，如果不存在，则获取用户信息
      if (!hasUserInfo) await getUserInfo()
      window.document.title = to.meta.title as string
      next()
    }
  } else {
    // 2、用户未登录，只允许进入login页
    if (whiteList.includes(to.path)) next()
    else next('/login')
  }
})

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => NProgress.done())
