/*
 * @Author: ChenYu
 * @Date: 2022-03-31 09:45:10
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-11 13:42:42
 * @FilePath: \v3-el-components\src\utils\d_tools.ts
 * @Description: 工具函数
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

/** TODO:
 * @description: 将字符串首字母变成大写
 * @param {string} str 接受一个字符串类型的字母
 * @return {*} 返回处理后的单词字符串
 */
export const d_toUperCaseFirstLetter = (str: string): string =>
  str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())

// 把驼峰转换成横杠链接
export const d_toLine = (value: string) => {
  return value.replace(/(A-Z)g/, '-$1').toLowerCase()
}

/** TODO:
 * @description:处理文件模块为一个map结构去重后的对象集
 * @param {any} ctx import.meta引入的文件模块
 * @param {string} dir 要处理的文件目录
 * @return {*} 处理后的对象集，便于export导出使用
 */
export const d_indexFileExportAllModule = (ctx: any, dir: string): object => {
  const arr: any[] = []
  const modules: Map<string, any> = new Map()

  //  将Module改造成一个map结构，并map对象赋值并二次规避重复
  const _importFn = (module: any): void => {
    Object.entries(module).forEach(([k, v]) => modules.set(k, v))
  }

  // 将 map 对象变成一个传统的对象
  const _strMapToObj = (strMap: any[]): object => {
    const obj = Object.create(null) // 相当于申明了一个空对象{}容器 不继承任何原型 么有__proto__
    for (const [k, v] of strMap) {
      obj[k] = v // 把Map 对象的键值 给obj
    }
    return obj
  }

  // 先将当前index.ts文件给过滤并变成一个数组
  Object.entries(ctx)
    .filter(([key]) => {
      return key !== `../${dir}/index.ts`
    })
    .forEach(([, value]) => {
      arr.push(value)
    })

  arr.forEach((item) => _importFn(item))

  return _strMapToObj([...modules])
}

/**
 * @description: 获取本地图片处理
 * @param {string} name 图片名称
 * @param {*} suffix 图片类型
 * @return {*}
 */
export const d_getImageUrl = (name: string, suffix = '.png') =>
  new URL(`/src/assets/images/${name}${[suffix]}`, import.meta.url).href
