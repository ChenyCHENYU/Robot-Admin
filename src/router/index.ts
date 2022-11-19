/*
 * @Author: ChenYu
 * @Date: 2022-03-03 23:52:07
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-19 21:50:33
 * @FilePath: \vue3_vite3_element-plus_admin\src\router\index.ts
 * @Description: 路由配置文件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
