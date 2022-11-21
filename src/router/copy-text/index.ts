/*
 * @Author: ChenYu
 * @Date: 2022-11-20 09:00:06
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-22 00:44:22
 * @FilePath: \vue3_vite3_element-plus_admin\src\router\copy-text\index.ts
 * @Description: 复制文本
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import { t } from '_utils/d_i18n'
import Container from '_c/C_Container/index.vue'

export default [
  {
    path: '/copy-text',
    name: 'copy-text',
    redirect: 'copy-text',
    component: Container,
    meta: {
      icon: 'mdi:writing-system-cjk-variant',
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
