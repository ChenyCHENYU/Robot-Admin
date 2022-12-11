/**
 * @description 扁平化数组对象(主要用来处理路由菜单)
 * @param {Array} menuList 所有菜单列表
 * @return array
 */
export function getFlatArr(menulist: Menu.MenuOptions[]) {
  return menulist.reduce(
    (pre: Menu.MenuOptions[], current: Menu.MenuOptions) => {
      let flatArr = [...pre, current]
      if (current.children)
        flatArr = [...flatArr, ...getFlatArr(current.children)]
      return flatArr
    },
    []
  )
}

/**
 * @description 使用递归，过滤出需要渲染在左侧菜单的列表（剔除 hidden == true 的菜单）
 * @param {Array} menuList 所有菜单列表
 * @return array
 * */
export function getShowMenuList(menuList: Menu.MenuOptions[]) {
  const newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))

  return newMenuList.filter((item) => {
    item.children?.length && (item.children = getShowMenuList(item.children))
    return !item.meta?.hidden
  })
}

/**
 * @description 使用递归，过滤需要缓存的路由
 * @param {Array} menuList 所有菜单列表
 * @param {Array} cacheArr 缓存的路由菜单 name ['**','**']
 * @return array
 * */
export function getKeepAliveRouterName(
  menuList: Menu.MenuOptions[],
  keepAliveArr: string[] = []
) {
  menuList.forEach((item) => {
    item.meta.isKeepAlive && item.name && keepAliveArr.push(item.name)
    item.children?.length && getKeepAliveRouterName(item.children, keepAliveArr)
  })
  return keepAliveArr
}
