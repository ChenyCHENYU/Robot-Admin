/*
 * @Author: 杨晨誉
 * @Date: 2022-03-23 16:02:43
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-27 13:39:42
 * @FilePath: \v3-el-components\src\components\C_Table\types.ts
 * @Description: 表格的类型约束
 *
 */

export interface I_TableColumns {
  type?: string
  //表头
  label: string
  // 字段名称
  prop?: string
  // 列宽度
  width?: string | number
  // 对齐方式
  align?: 'left' | 'center' | 'right'
  // 是否有render函数
  render?: ({ row, index, column }: I_RenderParams) => any
  fixed?: true | 'left' | 'right'
}

export interface I_RenderParams {
  index: number
  row: any
  column: any
  render: ({ row, index, column }: I_RenderParams) => any
}
