/*
 * @Author: ChenYu
 * @Date: 2022-12-11 11:16:55
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-12-11 21:38:50
 * @FilePath: \vue3_vite3_element-plus_admin\src\router\dynamicRouter.ts
 * @Description: 动态路由
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import router from './index'
import { getFlatArr } from '_utils/d_route'
import { ElNotification } from 'element-plus'
import { s_permissionStore } from '_store/permission'

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue')

/**
 * 初始化动态路由
 */
export const initDynamicRouter = async () => {
  try {
    // 1.获取菜单列表 && 按钮权限
    const permissionStore = s_permissionStore()
    await permissionStore.getAuthMenuList()
    await permissionStore.getAuthButtonList()

    // 2.判断当前用户有没有菜单权限
    if (!permissionStore.authMenuListGet.length) {
      ElNotification({
        title: '无权访问',
        message: '当前账号无任何菜单权限，请联系系统管理员！',
        type: 'warning',
        duration: 3000,
      })
      router.replace('/login')
      return Promise.reject('No permission')
    }

    // 3.添加动态路由 (getFlatArr 方法把菜单全部处理成一维数组，方便添加动态路由)
    const dynamicRouter = getFlatArr(
      JSON.parse(JSON.stringify(permissionStore.authMenuListGet))
    )

    dynamicRouter.forEach((item: any) => {
      if (item.children) delete item.children
      if (item.component)
        item.component = modules['/src/views' + item.component + '.vue']
      if (item.meta.full) {
        router.addRoute(item)
      } else {
        router.addRoute('C_Container', item)
      }
    })
  } catch (error) {
    // 💢 当按钮 || 菜单请求出错时，重定向到登陆页
    router.replace('/login')
    return Promise.reject(error)
  }
}
