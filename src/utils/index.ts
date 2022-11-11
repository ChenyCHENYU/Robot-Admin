/*
 * @Author: ChenYu
 * @Date: 2022-03-24 22:27:32
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-11 18:18:14
 * @FilePath: \vue3_vite3_elementPlus_admin\src\utils\index.ts
 * @Description: 工具方法
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
// import { d_indexFileExportAllModule } from './d_tools'
// // 以对象形式导出所有的其他文件方法
// export const utilsAll = d_indexFileExportAllModule(
//   import.meta.globEager('../utils/*.ts'),
//   'utils'
// )

/** TODO:
 * @description: 因为全局批量注册指令无法通过use插件方式，统一把指令和外部组件用这种方式进行遍历注册到对应的vue options上
 * @param {any} app 拿到的是vue的实例
 * @param {string} optionName 代表vue中哪个选项 指令还是组件或其他
 * @param {any} optionData 要批量注册的数据源
 * @return {string} 一个注册引用函数体
 */

export const _app_use = (
  app: App<Element>,
  optionName: string,
  optionData: any,
  special = ''
): void => {
  for (const i in optionData) {
    app[optionName](`${special}${i}`, (optionData as any)[i])
  }
}
