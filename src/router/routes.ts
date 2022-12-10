/*
 * @Author: ChenYu
 * @Date: 2022-04-08 12:23:41
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-12-10 23:12:34
 * @FilePath: \vue3_vite3_element-plus_admin\src\router\routes.ts
 * @Description: 路由文件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import type { RouteRecordRaw } from 'vue-router'
import Container from '_c/C_Container/index.vue'
import { t } from '_utils/d_i18n'
import copyTextRouter from './copy-text'
import dashboardRouter from './dashboard'
import demoRouter from './demo'
import directivesRouter from './directives'
import dragableRouter from './dragable'
import editorRouter from './editor'
import exportZipRouter from './export-zip'
import sysRouter from './sys'
import userRouter from './user'
import iframeRouter from './iframe'

/**
 * TODO: 私有路由表
 */
const privateRoutes: RouteRecordRaw[] = [
  ...dashboardRouter,
  ...demoRouter,
  ...editorRouter,
  ...exportZipRouter,
  ...dragableRouter,
  ...copyTextRouter,
  ...directivesRouter,
  ...userRouter,
  ...sysRouter,
  ...iframeRouter,
]

/**
 * TODO: 公开路由表
 */
const publicRoutes: RouteRecordRaw[] = [
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

  {
    path: '/',
    redirect: '/home',
    name: 'home',
    component: Container,
    meta: {
      icon: 'ic:sharp-home-work',
      title: t('route.home'),
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('_views/home/index.vue'),
        meta: {
          activeMenu: '/',
        },
      },
    ],
  },
]

const routes = [...publicRoutes, ...privateRoutes]

export default routes
