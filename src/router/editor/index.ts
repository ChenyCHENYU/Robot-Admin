/*
 * @Author: ChenYu
 * @Date: 2022-11-20 09:00:06
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-09 16:38:16
 * @FilePath: \vue3_vite3_elementPlus_admin\src\router\editor\index.ts
 * @Description: 编辑器路由
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import Container from '_c/C_Container/index.vue'
import { t } from '_utils/d_i18n'

export default [
  {
    path: '/editor',
    name: 'editor',
    redirect: 'code-editor',
    component: Container,
    meta: {
      title: t('route.editor'),
      icon: 'dashicons:editor-kitchensink',
    },
    children: [
      {
        path: '/code-editor',
        name: 'code-editor',
        component: () => import('_views/code-editor/index.vue'),
        meta: {
          title: t('route.code-editor'),
        },
      },
      {
        path: '/markdown-editor',
        name: 'markdown-editor',
        component: () => import('_views/markdown-editor/index.vue'),
        meta: {
          title: t('route.markdown-editor'),
        },
      },
      {
        path: '/text-editor',
        name: 'text-editor',
        component: () => import('_views/text-editor/index.vue'),
        meta: {
          title: t('route.text-editor'),
        },
      },
    ],
  },
]
