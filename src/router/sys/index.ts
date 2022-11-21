/*
 * @Author: ChenYu
 * @Date: 2022-04-28 10:16:55
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-21 18:36:36
 * @FilePath: \vue3_vite3_element-plus_admin\src\router\sys\index.ts
 * @Description: 系统管理路由
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import { t } from '_utils/d_i18n'
import Container from '_c/C_Container/index.vue'

export default [
  {
    path: '/sys-manage',
    name: 'sys-manage',
    redirect: 'menu-manage',
    component: Container,
    meta: {
      title: t('route.sys-manage'),
      icon: 'ElIconUser',
    },
    children: [
      {
        path: '/menu-manage',
        name: 'menu-manage',
        component: () => import('_views/menu-manage/index.vue'),
        meta: {
          title: t('route.menu-manage'),
        },
      },
      // 导入页面
      {
        path: '/excelImport',
        name: 'excelImport',
        component: () => import('_views/import/index.vue'),
        meta: {
          title: t('route.excelImport'),
          icon: 'ElIconUser',
          hidden: true,
        },
      },
    ],
  },
]
