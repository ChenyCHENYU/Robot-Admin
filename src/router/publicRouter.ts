/*
 * @Author: ChenYu
 * @Date: 2022-04-08 12:23:41
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-13 17:31:20
 * @FilePath: \vue3_vite3_elementPlus_admin\src\router\publicRouter.ts
 * @Description: 路由文件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import type { RouteRecordRaw } from 'vue-router'

/**
 * TODO: 公开路由表
 */
export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/C_Container',
    name: 'C_Container',
    component: () => import('_c/C_Container/index.vue'),
    meta: { hidden: true },
  },
  {
    path: '/login',
    component: () => import('_views/login/index.vue'),
    meta: { hidden: true },
  },
  // 401
  {
    path: '/401',
    name: '401',
    component: () => import('_views/error-page/401.vue'),
    meta: { hidden: true },
  },
  // 404
  {
    path: '/404',
    name: '404',
    component: () => import('_views/error-page/404.vue'),
    meta: { hidden: true },
  },
  // 用来解决初次加载没有路由console提示Vue Router warn]: No match found for location with path的问题
  {
    path: '/:catchAll(.*)',
    component: () => import('@/views/error-page1/404.vue'), //这个是我自己的路径
  },
]

const routes = [...publicRoutes]

export default routes
