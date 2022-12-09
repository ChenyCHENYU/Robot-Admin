/*
 * @Author: ChenYu
 * @Date: 2022-11-20 09:00:06
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-09 16:58:22
 * @FilePath: \vue3_vite3_elementPlus_admin\src\router\copy-text\index.ts
 * @Description: 复制文本
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import Container from '_c/C_Container/index.vue'
import { t } from '_utils/d_i18n'

export default [
  {
    path: '/copy-text',
    name: 'copy-text',
    redirect: 'copy-text',
    component: Container,
    meta: {
      icon: 'mdi:writing-system-cjk-variant',
      title: t('route.copy-text'),
    },
    children: [
      {
        path: '/copy-text',
        name: 'copy-text',
        component: () => import('_views/copy-text/index.vue'),
        meta: {
          title: t('route.copy-text'),
        },
      },
    ],
  },
]
