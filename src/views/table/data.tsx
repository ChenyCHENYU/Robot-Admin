/*
 * @Author: 杨晨誉
 * @Date: 2022-03-24 14:32:19
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-16 12:35:44
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\table\data.tsx
 * @Description: tsx数据层
 *
 */
import type { I_RenderParams, I_TableColumns } from '@/components/C_Table/types'
import './index.scss'

// TODO: 要渲染的数据源 tableData，从后台获取

const tableData = ref()
export const exposeTableData = (callback: any) => {
  setTimeout(() => {
    tableData.value = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ]
    // 回调的时候为了强调格式，使异步数据源管理使用asnyc await, so 返回promise
    callback(Promise.resolve(tableData.value))
  }, 1000)
}

// TODO: 要渲染的列表项
export const COLUMNS = (tableData: any): I_TableColumns[] => {
  console.log('tableData ==>', tableData)
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
      label: '',
    },
    {
      //表头
      label: '日期',
      // 对齐方式
      // TODO: 这里需要注意，响应式数据，必须传递对应的row，不能是具体的值
      render: (params: I_RenderParams) =>
        HTML_LINE_EDIT(params, 'date', tableData),
    },
    {
      //表头
      label: '姓名',
      // 字段名称
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
      //表头
      label: '地址',
      // 字段名称
      // 对齐方式
      render: (params: I_RenderParams) =>
        HTML_LINE_EDIT(params, 'address', tableData),
    },
    {
      label: '操作',
      fixed: 'right',
      width: 160,
      render: ({ row, index }: any) => (
        <div>
          <div v-show={activeLineEdit.value !== index || !isEditLine.value}>
            <el-button
              size='small'
              type='warning'
              onClick={() => handleEditClick(row, index)}>
              <el-icon-edit />
            </el-button>
            <el-button size='small' type='danger'>
              <el-icon-delete />
            </el-button>
          </div>
          {/*  TODO: 点击了行内编辑按钮的话 */}
          <div v-show={activeLineEdit.value === index && isEditLine.value}>
            <el-button
              size='small'
              type='primary'
              onClick={() => clickConfirmOrCancel(tableData, row, index)}>
              确定
            </el-button>
            <el-button
              size='small'
              onClick={() => clickConfirmOrCancel(tableData, row, index)}>
              取消
            </el-button>
          </div>
        </div>
      ),
    },
  ]
}
const activeLineEdit = ref()
const isEditLine = ref(false)
const tempRowIndex = ref<number>()

const handleEditClick = (row: any, index: number) => {
  clickConfirmOrCancel(null, null, tempRowIndex.value)
  //整行编辑
  activeLineEdit.value = index
  isEditLine.value = true
  // TODO: 这个坑要注意，因为是个引用类型，必须要给它深拷贝下
  tempRow.value = JSON.parse(JSON.stringify(row))
  // 重置当前的交叉index值
  tempRowIndex.value = index
}

// TODO: 实时编辑相关的代码片段和对应逻辑
const HTML_LINE_EDIT = (
  params: I_RenderParams,
  attr: string,
  tableData: any
) => {
  const { index, column, row } = params
  return (
    <div class='html-line-edit'>
      <div
        v-show={index + column.id !== currentEdit.value && !isEditLine.value}>
        <span> {row[attr]}</span>
        <el-icon-edit
          v-pointer
          color='#e6a23c'
          onClick={() => clickTempEdit(params)}
        />
      </div>
      {/* <span v-show={active.value === index}> */}
      <span
        v-show={index + column.id === currentEdit.value && !isEditLine.value}>
        <el-input v-model={row[attr]} style='width:200px' size='small' />
        <span>
          <el-icon-check
            v-pointer
            color='#67c23a'
            onClick={() => clickConfirmOrCancel(tableData, row)}
          />
          <el-icon-close
            v-pointer
            color='#f56c6c'
            onClick={() => clickConfirmOrCancel(tableData, row, index)}
          />
        </span>
      </span>
      {/* 处理编辑行需要的元素 */}
      <span v-show={activeLineEdit.value === index && isEditLine.value}>
        <el-input v-model={row[attr]} style='width:200px' size='small' />
      </span>
      <span v-show={isEditLine.value && activeLineEdit.value !== index}>
        {row[attr]}
        <el-icon-edit
          v-pointer
          color='#e6a23c'
          onClick={() => clickTempEdit(params)}
        />
      </span>
    </div>
  )
}

// TODO: 当前点击的哪一行的哪一列
const tempRow = ref()
const currentEdit = ref('')

// 点击编辑按钮的时候，要对点击的数据进行临时存储，便于取消操作后恢复默认值
const clickTempEdit = (params: I_RenderParams) => {
  clickConfirmOrCancel(null, null, tempRowIndex.value)
  isEditLine.value = false
  const { row, index, column } = params
  currentEdit.value = index + column.id
  // TODO: 这个坑要注意，因为是个引用类型，必须要给它深拷贝下
  tempRow.value = JSON.parse(JSON.stringify(row))
  // 重置当前的交叉index值
  tempRowIndex.value = index
}

// 点击行内编辑保存或取消操作
const clickConfirmOrCancel = (tableData: any, row: any, index?: number) => {
  if (tableData) tableData.row = row
  // if (index) {
  //   // FIXME: 这里后面换成传入的tableData
  //   if (tableData) tableData.row = row
  // } else {
  //   /* 将 rowid传递给后台即可 */
  //   console.log('row')
  // }
  currentEdit.value = ''
  // 编辑行的也在这里复用处理
  isEditLine.value = false
}

// FORM SEARCH 区域数据
import type { I_FormItem } from '_c/C_FormSearch/types'

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
  pageNum: 1,
  pageSize: 10,
  name: undefined,
  type: undefined,
  range: undefined,
}
