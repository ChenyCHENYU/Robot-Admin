/*
 * @Author: 杨晨誉
 * @Date: 2022-03-23 16:02:43
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-28 11:43:49
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_Table\types.ts
 * @Description: 表格的类型约束
 *
 */

import type { I_Uncertain } from '@/interface'

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
  // 是否显示在表格中
  isShow?: boolean
  // 自定义表头的插槽
  slotHeader?: (item?: I_SlotHeader) => JSX.Element | string
  // 列筛选
  filters?: I_Uncertain[]
}

interface I_SlotHeader extends I_TableColumns {
  item: I_TableColumns
}

//
interface I_TableCompoentBtns {
  lineEdit: (id: string) => any | string // 因为编辑的接口没写，这里姑且留个 string 对应 table 的 data.tsx 吧，后面写编辑逻辑完善
  delete?: (id: string) => any
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

export interface I_BatchAddOptions {
  title: string
  tempApi: (data: any) => Promise<any>
  importApi: (data: any) => Promise<any>
}

export interface I_WaterMaker {
  text: string
  textSize?: number
  textColor?: string
  textXGap?: number
  textYGap?: number
}
