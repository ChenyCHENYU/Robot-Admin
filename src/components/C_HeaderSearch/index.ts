/*
 * @Author: ChenYu
 * @Date: 2022-04-13 00:44:42
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-13 01:20:13
 * @FilePath: \v3-el-components\src\components\C_HeaderSearch\index.ts
 * @Description:
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

// 重新改造模糊检索需要的数据源

/**
 * @description: 筛选出可供搜索的路由对象
 * @param {*} routes 路由表
 * @param {*} basePath 基础路径，默认为 /
 * @param {*} prefixTitle
 * @return {*} 改造后的数据源
 */
export const _generateData = (
  routes: any,
  basePath = '/',
  prefixTitle = []
) => {
  let res: any[] = []
  for (const route of routes) {
    // 创建包含path和title的item
    const data: any = {
      // path: path.resolve(basePath, route.path),
      path: route.path,
      title: [...prefixTitle],
    }
    // 当前存在 meta 时，使用 i18n 解析国际化数据，组合成新的 title 内容
    // 动态路由不允许被搜索
    // 匹配动态路由的正则
    const re = /.*\/:.*/
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      data.title = [...data.title, route.meta.title]
      res.push(data)
    }

    // 存在 children 时，迭代调用
    if (route.children) {
      const tempRoutes = _generateData(route.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}
