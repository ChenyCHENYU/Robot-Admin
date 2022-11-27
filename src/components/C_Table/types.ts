/*
 * @Author: 杨晨誉
 * @Date: 2022-03-23 16:02:43
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-27 16:59:01
 * @FilePath: \vue3_vite3_element-plus_admin\src\components\C_Table\types.ts
 * @Description: 表格的类型约束
 *
 */

export interface I_TableColumns {
  type?: string
  //表头
  label: string
  // 字段名称
  prop?: string
  // 如果打印，就需要提供这个字段
  print?: string
  // 列宽度
  width?: string | number
  // 对齐方式
  align?: 'left' | 'center' | 'right'
  // 是否有render函数
  render?: ({ row, index, column }: I_RenderParams) => any
  fixed?: true | 'left' | 'right'
  // Table 组件内封装的编辑、删除、详情按钮
  actionBtns?: I_TableCompoentBtns
}

//
interface I_TableCompoentBtns {
  lineEdit: string
  delete?: string
  detail?: (id: string) => any
}

export interface I_RenderParams {
  index: number
  row: any
  column: any
  render: ({ row, index, column }: I_RenderParams) => any
}

export interface I_FormParams {
  pageNum: number
  pageSize: number
  [key: string]: any
}
