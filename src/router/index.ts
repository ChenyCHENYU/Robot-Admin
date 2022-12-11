/*
 * @Author: ChenYu
 * @Date: 2022-03-03 23:52:07
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-12-11 21:37:37
 * @FilePath: \vue3_vite3_element-plus_admin\src\router\index.ts
 * @Description: 路由配置文件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import { createRouter, createWebHistory } from 'vue-router'
import routes from './publicRouter'

/**
 * @description 动态路由参数配置简介
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.link ==> 是否外链
 * @param meta.hidden ==> 是否隐藏
 * @param meta.full ==> 是否全屏(示例：用来隔离数据大屏页面)
 * @param meta.keeplive ==> 是否缓存
 * */

const router = createRouter({
  routes,
  history: createWebHistory(),
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
