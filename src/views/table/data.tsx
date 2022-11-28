/*
 * @Author: 杨晨誉
 * @Date: 2022-03-24 14:32:19
 * @LastEditors: ChenYu ycyplus@163.com
<<<<<<< Updated upstream
 * @LastEditTime: 2022-11-28 20:09:40
=======
 * @LastEditTime: 2022-11-28 19:47:07
>>>>>>> Stashed changes
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\table\data.tsx
 * @Description: tsx数据层
 *
 */
import type { I_RenderParams, I_TableColumns } from '@/components/C_Table/types'
import type { I_FormItem } from '_c/C_FormSearch/types'

import { deleteDataRow, getDetail } from '@/api/demo'
import { HTML_LINE_EDIT } from '_c/C_Table/useEffect'

export const FORM_ITEM_LIST: I_FormItem[] = [
  {
    type: 'input',
    prop: 'name',
    placeholder: '请输入检索信息',
    isFocus: false,
    hisList: ['11111111', '2222222', '33333333'],
  },
  {
    type: 'select',
    prop: 'type',
    placeholder: '请选择车辆类型',
    list: [
      {
        labelDefault: 'one',
        value: 1,
      },
      {
        labelDefault: 'two',
        value: 2,
      },
      {
        labelDefault: 'three',
        value: 3,
      },
    ],
  },

  {
    type: 'date-range',
    prop: 'range',
  },

  {
    type: 'input',
    prop: 'test',
    placeholder: '请输入检索信息',
  },

  {
    type: 'input',
    prop: 'test',
    placeholder: '请输入检索信息',
    show: false,
  },
  {
    type: 'input',
    prop: 'test123',
    placeholder: '请输入检索信息',
    show: false,
  },
  {
    type: 'input',
    prop: 'test456',
    placeholder: '请输入检索信息',
    show: false,
  },
]

// TODO: 检索参数

export const FORM_PARAMS = {
  name: undefined,
  type: undefined,
  range: undefined,
}

// 需要用响应式数据接收一下传递过来的参数，不然初始化界面的时候，因为参数丢失了响应式，只会用初始数据处理逻辑导致 Error
const tableData = ref()

// TODO: 要渲染的列表项
export const COLUMNS = (data: any): I_TableColumns[] => {
  tableData.value = data
  return [
    {
      type: 'index',
      label: '序号',
      width: 60,
    },
    {
      type: 'selection',
      label: '',
      width: 60,
    },
    {
      type: 'expand',
      label: '子级',
      width: 60,
    },
    {
      //表头
      label: '日期',
      print: 'date',
      // 对齐方式
      // TODO: 这里需要注意，响应式数据，必须传递对应的row，不能是具体的值
      render: (params: I_RenderParams) =>
        HTML_LINE_EDIT(params, 'date', tableData.value),
    },
    {
      label: '姓名',
      print: 'name',
      render: ({ row }: any) => (
        <div>
          <el-popover
            v-slots={{ reference: () => <el-tag>{row.name}</el-tag> }}
            effect='light'
            trigger='hover'
            placement='top'
            width='auto'>
            <div>name: {row.name}</div>
            <div>address: {row.address}</div>
          </el-popover>
        </div>
      ),
    },
    {
      label: '地址',
      print: 'address',
      render: (params: I_RenderParams) =>
        HTML_LINE_EDIT(params, 'address', tableData.value),
    },
    {
      label: '操作',
      actionBtns: {
        lineEdit: 'patchLineFn',
        delete: deleteDataRow,
        detail: getDetail,
      },
      render: ({ row, index }: any) => (
        <div>
          <div>
            <el-button size='small'>
              <el-icon-more />
            </el-button>
          </div>
        </div>
      ),
    },
  ]
}
