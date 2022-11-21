/*
 * @Author: ChenYu
 * @Date: 2022-11-19 21:29:46
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-22 00:35:54
 * @FilePath: \vue3_vite3_element-plus_admin\src\router\dashboard\index.ts
 * @Description:
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import { t } from '_utils/d_i18n'
import Container from '_c/C_Container/index.vue'

export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: 'analysis',
    component: Container,
    meta: {
      title: t('route.dashboard'),
      icon: 'material-symbols:multiline-chart',
    },
    children: [
      {
        path: '/analysis',
        name: 'analysis',
        component: () => import('_views/analysis/index.vue'),
        meta: {
          title: t('route.analysis'),
        },
      },
      // 个人中心
      {
        path: '/profile',
        name: 'profile',
        component: () => import('_views/profile/index.vue'),
        meta: {
          title: t('route.profile'),
        },
      },
    ],
  },
]
