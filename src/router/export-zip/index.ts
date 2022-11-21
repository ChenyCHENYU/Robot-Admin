/*
 * @Author: ChenYu
 * @Date: 2022-11-20 09:00:06
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-21 19:55:36
 * @FilePath: \vue3_vite3_element-plus_admin\src\router\export-zip\index.ts
 * @Description: 编辑器组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import { t } from '_utils/d_i18n'
import Container from '_c/C_Container/index.vue'

export default [
  {
    path: '/export-zip',
    name: 'export-zip',
    redirect: 'export-zip',
    component: Container,
    meta: {
      title: t('route.export-zip'),
      icon: 'ElIconUser',
    },
    children: [
      {
        path: '/export-zip',
        name: 'export-zip',
        component: () => import('_views/export-zip/index.vue'),
        meta: {
          title: t('route.export-zip'),
          icon: 'ElIconDownload',
        },
      },
    ],
  },
]
