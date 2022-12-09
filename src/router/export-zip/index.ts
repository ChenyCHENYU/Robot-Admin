/*
 * @Author: ChenYu
 * @Date: 2022-11-20 09:00:06
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-09 16:58:51
 * @FilePath: \vue3_vite3_elementPlus_admin\src\router\export-zip\index.ts
 * @Description: 编辑器组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import Container from '_c/C_Container/index.vue'
import { t } from '_utils/d_i18n'

export default [
  {
    path: '/export-zip',
    name: 'export-zip',
    redirect: 'export-zip',
    component: Container,
    meta: {
      icon: 'mdi:database-export-outline',
      title: t('route.export-zip'),
    },
    children: [
      {
        path: '/export-zip',
        name: 'export-zip',
        component: () => import('_views/export-zip/index.vue'),
        meta: {
          title: t('route.export-zip'),
        },
      },
    ],
  },
]
