/*
 * @Author: ChenYu
 * @Date: 2022-11-20 09:00:06
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-21 21:30:49
 * @FilePath: \vue3_vite3_element-plus_admin\src\router\dragable\index.ts
 * @Description: 编辑器组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import { t } from '_utils/d_i18n'
import Container from '_c/C_Container/index.vue'

export default [
  {
    path: '/dragable',
    name: 'dragable',
    redirect: 'dragable',
    component: Container,
    meta: {
      icon: 'ElIconUser',
    },
    children: [
      {
        path: '/dragable',
        name: 'dragable',
        component: () => import('_views/dragable/index.vue'),
        meta: {
          title: t('route.dragable'),
          icon: 'ElIconDownload',
        },
      },
    ],
  },
]
