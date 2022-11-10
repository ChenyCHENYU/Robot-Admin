// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/AboutView.vue')
//     }
//   ]
// })

// export default router

/*
 * @Author: ChenYu
 * @Date: 2022-03-03 23:52:07
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-25 16:00:39
 * @FilePath: \v3-el-components\src\router\index.ts
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
