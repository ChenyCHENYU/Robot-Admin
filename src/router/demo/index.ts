/*
 * @Author: ChenYu
 * @Date: 2022-04-28 10:04:01
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-14 10:00:24
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
      icon: 'ElIconOpportunity',
    },
    children: [
      {
        path: '/base-icon',
        name: 'base-icon',
        component: () => import('_views/base-icon/index.vue'),
        meta: {
          title: t('route.base-icon'),
          icon: 'ElIconPostcard',
        },
      },
      {
        path: '/area-cascade',
        name: 'area-cascade',
        component: () => import('_views/area-cascade/index.vue'),
        meta: {
          title: t('route.area-cascade'),
          icon: 'ElIconLocationInformation',
        },
      },
      {
        path: '/notice',
        name: 'notice',
        component: () => import('_views/notice/index.vue'),
        meta: {
          title: t('route.notice'),
          icon: 'ElIconBell',
        },
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import('_views/menu/index.vue'),
        meta: {
          title: t('route.menu'),
          icon: 'ElIconMenu',
        },
      },
      {
        path: '/progress',
        name: 'progress',
        component: () => import('_views/progress/index.vue'),
        meta: {
          title: t('route.progress'),
          icon: 'ElIconSemiSelect',
        },
      },
      {
        path: '/time',
        name: 'time',
        component: () => import('_views/time/index.vue'),
        meta: {
          title: t('route.time'),
          icon: 'ElIconTimer',
        },
      },
      {
        path: '/date',
        name: 'date',
        component: () => import('_views/date/index.vue'),
        meta: {
          title: t('route.date'),
          icon: 'ElIconPaperclip',
        },
      },
      {
        path: '/city',
        name: 'city',
        component: () => import('_views/city/index.vue'),
        meta: {
          title: t('route.city'),
          icon: 'ElIconAddLocation',
        },
      },
      {
        path: '/form-manage',
        name: 'form-manage',
        redirect: '/form',
        component: ParentView,
        meta: {
          title: t('route.form-manage'),
          icon: 'ElIconReading',
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
          icon: 'ElIconReading',
        },
      },
      {
        path: '/calendar',
        name: 'calendar',
        component: () => import('_views/calendar/index.vue'),
        meta: {
          title: t('route.calendar'),
          icon: 'ElIconCalendar',
        },
      },
    ],
  },
]
