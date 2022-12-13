/*
 * @Description: 处理面包屑组合
 * @Author: Cheny ycyplus@gmail.com
 * @Date: 2022-12-13 20:11:20
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-13 20:11:58
 * @FilePath: \vue3_vite3_elementPlus_admin\src\utils\d_breadcrumb.ts
 * Copyright (c) 2022 西安天智 AgileTeam by Cheny email: ycyplus@gmail.com, All Rights Reserved.
 */
/**
 * @description 双重递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 所有菜单列表
 * @returns array
 */
export function getAllBreadcrumbList(menuList: Menu.MenuOptions[]) {
  let handleBreadcrumbList: { [key: string]: any } = {}
  const loop = (menuItem: Menu.MenuOptions) => {
    if (menuItem?.children?.length)
      menuItem.children.forEach((item) => loop(item))
    else
      handleBreadcrumbList[menuItem.path] = getCurrentBreadcrumb(
        menuItem.path,
        menuList
      )
  }
  menuList.forEach((item) => loop(item))
  return handleBreadcrumbList
}

/**
 * @description 使用递归，过滤出当前路径匹配的面包屑地址
 * @param {String} path 当前访问地址
 * @param {Array} menuList 所有菜单列表
 * @returns array
 */
export function getCurrentBreadcrumb(
  path: string,
  menuList: Menu.MenuOptions[]
) {
  let tempPath: Menu.MenuOptions[] = []
  try {
    const getNodePath = (node: Menu.MenuOptions) => {
      tempPath.push(node)
      if (node.path === path) throw new Error('Find IT!')
      if (node.children?.length)
        node.children.forEach((item) => getNodePath(item))
      tempPath.pop()
    }
    menuList.forEach((item) => getNodePath(item))
  } catch (e) {
    return tempPath
  }
}
