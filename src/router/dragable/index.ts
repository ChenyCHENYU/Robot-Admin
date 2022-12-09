/*
 * @Author: ChenYu
 * @Date: 2022-11-20 09:00:06
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-09 16:59:15
 * @FilePath: \vue3_vite3_elementPlus_admin\src\router\dragable\index.ts
 * @Description: 拖拽
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import Container from '_c/C_Container/index.vue'
import { t } from '_utils/d_i18n'

export default [
  {
    path: '/dragable',
    name: 'dragable',
    redirect: 'dragable',
    component: Container,
    meta: {
      icon: 'ri:drag-drop-line',
      title: t('route.dragable'),
    },
    children: [
      {
        path: '/dragable',
        name: 'dragable',
        component: () => import('_views/dragable/index.vue'),
        meta: {
          title: t('route.dragable'),
        },
      },
    ],
  },
]
