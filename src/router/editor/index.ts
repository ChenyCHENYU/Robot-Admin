/*
 * @Author: ChenYu
 * @Date: 2022-11-20 09:00:06
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-22 00:36:55
 * @FilePath: \vue3_vite3_element-plus_admin\src\router\editor\index.ts
 * @Description: 编辑器组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import { t } from '_utils/d_i18n'
import Container from '_c/C_Container/index.vue'

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
