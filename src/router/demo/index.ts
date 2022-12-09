/*
 * @Author: ChenYu
 * @Date: 2022-04-28 10:04:01
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-09 11:06:36
 * @FilePath: \vue3_vite3_elementPlus_admin\src\router\demo\index.ts
 * @Description: demo
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import Container from '_c/C_Container/index.vue'
import ParentView from '_c/C_ParentView/index.vue'
import { t } from '_utils/d_i18n'

export default [
  {
    path: '/demo',
    redirect: '/base-icon',
    name: 'demo',
    component: Container,
    meta: {
      title: t('route.demo'),
      icon: 'bxs:component',
    },
    children: [
      {
        path: '/base-icon',
        name: 'base-icon',
        component: () => import('_views/base-icon/index.vue'),
        meta: {
          title: t('route.base-icon'),
        },
      },
      {
        path: '/area-cascade',
        name: 'area-cascade',
        component: () => import('_views/area-cascade/index.vue'),
        meta: {
          title: t('route.area-cascade'),
        },
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import('_views/menu/index.vue'),
        meta: {
          title: t('route.menu'),
        },
      },
      {
        path: '/progress',
        name: 'progress',
        component: () => import('_views/progress/index.vue'),
        meta: {
          title: t('route.progress'),
        },
      },
      {
        path: '/time',
        name: 'time',
        component: () => import('_views/time/index.vue'),
        meta: {
          title: t('route.time'),
        },
      },
      {
        path: '/date',
        name: 'date',
        component: () => import('_views/date/index.vue'),
        meta: {
          title: t('route.date'),
        },
      },
      {
        path: '/city',
        name: 'city',
        component: () => import('_views/city/index.vue'),
        meta: {
          title: t('route.city'),
        },
      },
      {
        path: '/form-manage',
        name: 'form-manage',
        redirect: '/form',
        component: ParentView,
        meta: {
          title: t('route.form-manage'),
        },
        children: [
          {
            path: '/form',
            name: 'form',
            component: () => import('_views/form/index.vue'),
            meta: {
              title: t('route.form'),
            },
          },
          {
            path: '/form-modal',
            name: 'form-modal',
            component: () => import('_views/form-modal/index.vue'),
            meta: {
              title: t('route.form-modal'),
            },
          },
        ],
      },
      {
        path: '/table',
        name: 'table',
        component: () => import('_views/table/index.vue'),
        meta: {
          title: t('route.table'),
        },
      },
      {
        path: '/table-expand',
        name: 'table-expand',
        component: () => import('_views/table-expand/index.vue'),
        meta: {
          title: '测试Expand表格',
          hidden: true,
        },
      },
      {
        path: '/calendar',
        name: 'calendar',
        component: () => import('_views/calendar/index.vue'),
        meta: {
          title: t('route.calendar'),
        },
      },
    ],
  },
]
