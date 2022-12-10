/*
 * @Author: ChenYu
 * @Date: 2022-12-10 22:43:34
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-12-11 00:45:22
 * @FilePath: \vue3_vite3_element-plus_admin\src\router\iframe\index.ts
 * @Description: 外部页面
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import Container from '_c/C_Container/index.vue'

export default [
  {
    path: '/iframe',
    name: 'iframe',
    redirect: '/iframe/blank',
    component: Container,
    meta: {
      title: '外部页面',
      icon: 'mdi:link-variant',
    },
    children: [
      {
        path: '/iframe',
        name: 'iframe',
        component: () => import('@/views/iframe/index.vue'),
        meta: {
          title: '内嵌文档',
          link: 'https://www.tzagileteam.com/',
        },
      },
      {
        path: 'https://www.tzagileteam.com',
        name: 'iframe-document',
        component: () => import('_views/iframe/blank.vue'),
        meta: {
          title: '线上文档',
        },
      },
      {
        path: 'https://github.com/ChenyCHENYU/Robot-Admin',
        name: 'iframe-github',
        component: () => import('_views/iframe/blank.vue'),
        meta: {
          link: 'https://github.com/ChenyCHENYU/Robot-Admin',
          title: 'Github 仓库',
        },
      },
      {
        path: 'https://gitee.com/ycyplus163/robot-admin',
        name: 'iframe-gitee',
        component: () => import('_views/iframe/blank.vue'),
        meta: {
          title: 'Gitee 仓库',
        },
      },
    ],
  },
]
