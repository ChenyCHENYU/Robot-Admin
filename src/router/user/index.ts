/*
 * @Author: ChenYu
 * @Date: 2022-04-28 10:06:39
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-12-11 13:44:42
 * @FilePath: \vue3_vite3_element-plus_admin\src\router\user\index.ts
 * @Description: user
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import { t } from '_utils/d_i18n'
import Container from '_c/C_Container/index.vue'

export default [
  {
    path: '/user',
    name: 'user',
    redirect: 'user-manage',
    component: Container,
    meta: {
      title: t('route.user'),
      icon: 'mdi:user-key',
    },
    children: [
      {
        path: '/user-manage',
        name: 'user-manage',
        component: () => import('_views/user-manage/index.vue'),
        meta: {
          title: t('route.user-manage'),
        },
      },
      {
        path: '/user-manage-detail/:id',
        name: 'user-manage-detail',
        component: () => import('_views/user-manage/detail.vue'),
        props: true,
        meta: {
          title: '员工信息',
          hidden: true,
        },
      },
      {
        path: '/role-list',
        name: 'role-list',
        component: () => import('_views/role-list/index.vue'),
        props: true,
        meta: {
          title: t('route.roleList'),
        },
      },
      {
        path: '/permission-list',
        name: 'permission-list',
        component: () => import('_views/permission-list/index.vue'),
        props: true,
        meta: {
          title: t('route.permissionList'),
        },
      },
    ],
  },
]
