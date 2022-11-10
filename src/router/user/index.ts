/*
 * @Author: ChenYu
 * @Date: 2022-04-28 10:06:39
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-28 10:06:40
 * @FilePath: \v3-el-components\src\router\user\index.ts
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
      icon: 'ElIconUser',
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
        path: '/roleList',
        name: 'roleList',
        component: () => import('_views/role-list/index.vue'),
        props: true,
        meta: {
          title: t('route.roleList'),
        },
      },
      {
        path: '/permissionList',
        name: 'permissionList',
        component: () => import('_views/permission-list/index.vue'),
        props: true,
        meta: {
          title: t('route.permissionList'),
        },
      },
    ],
  },
]
