/*
 * @Author: 杨晨誉
 * @Date: 2022-03-10 17:30:14
 * @LastEditors: 杨晨誉
 * @LastEditTime: 2022-03-10 17:41:10
 * @FilePath: \v3-el-components\src\views\notice\types.ts
 * @Description: notice组件所需要的类型
 *
 */

// list项
export interface I_ListItem {
  avatar?: string
  title?: string
  desc?: string
  time?: string
  tag?: string
  tagType?: '' | 'success' | 'info' | 'warning' | 'danger'
}

// list 的 options
export interface I_ListOptions {
  title: string
  content: I_ListItem[]
}

// 操作选项
export interface I_ActionOptions {
  text: string
  icon?: string
}
