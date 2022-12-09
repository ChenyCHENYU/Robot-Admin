/*
 * @Author: ChenYu
 * @Date: 2022-12-09 09:00:06
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-09 17:47:04
 * @FilePath: \vue3_vite3_elementPlus_admin\src\router\directives\index.ts
 * @Description: 指令路由
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import Container from '_c/C_Container/index.vue'

export default [
  {
    path: '/directives',
    name: 'directives',
    redirect: 'directives/copy-direct',
    component: Container,
    meta: {
      title: '自定义指令',
      icon: 'material-symbols:integration-instructions-outline-rounded',
    },
    children: [
      {
        path: '/directives/copy-direct',
        name: 'copy-direct',
        component: () => import('_views/directives/copy-direct/index.vue'),
        meta: {
          title: '复制指令',
        },
      },
      {
        path: '/directives/watermark-direct',
        name: 'watermark-direct',
        component: () => import('_views/directives/watermark-direct/index.vue'),
        meta: {
          title: '水印指令',
        },
      },
      {
        path: '/directives/drag-direct',
        name: 'drag-direct',
        component: () => import('_views/directives/drag-direct/index.vue'),
        meta: {
          title: '拖拽指令',
        },
      },
      {
        path: '/directives/debounce-direct',
        name: 'debounce-direct',
        component: () => import('_views/directives/debounce-direct/index.vue'),
        meta: {
          title: '防抖指令',
        },
      },
      {
        path: '/directives/throttle-direct',
        name: 'throttle-direct',
        component: () => import('_views/directives/throttle-direct/index.vue'),
        meta: {
          title: '节流指令',
        },
      },
      {
        path: '/directives/longpress-direct',
        name: 'longpress-direct',
        component: () => import('_views/directives/longpress-direct/index.vue'),
        meta: {
          title: '长按指令',
        },
      },
    ],
  },
]
