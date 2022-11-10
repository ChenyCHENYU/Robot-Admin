/*
 * @Author: ChenYu
 * @Date: 2022-04-28 08:53:38
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-28 09:28:15
 * @FilePath: \v3-el-components\src\store\permission\index.ts
 * @Description: 动态路由表处理
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import routes from '@/router/routes'

export const s_permissionStore = defineStore('app', {
  state: () => {
    return {
      routes, // 拿到的是公开的routes
    }
  },

  getters: {},

  actions: {
    // 增加路由
    setRoutes(newRoutes) {
      this.routes = [...routes, ...newRoutes]
    },

    // 根据权限数据筛选路由
    filterRoutes(menus) {
      const routes: any = []
      menus.forEach((key) => {
        routes.push(...privateRoutes.filter((item) => item.name === key))
      })
      // 所有不匹配的路由，全部进入 404 的路由配置
      // 必须写在所有路由之后
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404',
      })
      this.setRoutes(routes)
      return routes
    },
  },
})
