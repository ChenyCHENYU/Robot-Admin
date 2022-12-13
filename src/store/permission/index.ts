/*
 * @Author: ChenYu
 * @Date: 2022-04-28 08:53:38
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-13 20:17:17
 * @FilePath: \vue3_vite3_elementPlus_admin\src\store\permission\index.ts
 * @Description: 动态路由表处理
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import { getAuthMenuListApi } from '_api/sys'
import { getAllBreadcrumbList } from '_utils/d_breadcrumb'
import { getKeepAliveRouterName, getShowMenuList } from '_utils/d_route'

export const s_permissionStore = defineStore('permission', {
  state: () => {
    return {
      authButtonList: {},
      // menuList 作为动态路由，不会做持久化存储
      authMenuList: [],
    }
  },

  getters: {
    // 按钮权限列表
    authButtonListGet: (state) => state.authButtonList,
    // 后端返回的菜单列表
    authMenuListGet: (state) => state.authMenuList,
    // 后端返回的菜单列表 ==> 左侧菜单栏渲染，需要去除 isHide == true
    showMenuListGet: (state) => getShowMenuList(state.authMenuList),
    // 需要缓存的菜单 name，用作页面 keepAlive
    keepAliveRouterGet: (state) => getKeepAliveRouterName(state.authMenuList),
    // 面包屑导航列表
    breadcrumbListGet: (state) => getAllBreadcrumbList(state.authMenuList),
  },

  actions: {
    // getAuthButtonList
    async getAuthButtonList() {
      // 这一块后续根据实际业务场景，打开对应按钮权限接口处理
      // const { data } = await getAuthButtonListApi()
      // this.authButtonList = data
    },
    // getAuthMenuList
    async getAuthMenuList() {
      const { data } = await getAuthMenuListApi()
      this.authMenuList = data as any
    },
  },
})
