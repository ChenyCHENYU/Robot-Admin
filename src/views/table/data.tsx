/*
 * @Author: 杨晨誉
 * @Date: 2022-03-24 14:32:19
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-26 13:04:02
 * @FilePath: \vue3_vite3_element-plus_admin\src\views\table\data.tsx
 * @Description: tsx数据层
 *
 */
import type { I_RenderParams, I_TableColumns } from '@/components/C_Table/types'
import './index.scss'

// TODO: 要渲染的数据源 tabletableData，从后台获取

// TODO: 要渲染的列表项
export const COLUMNS = (tableData?: any): I_TableColumns[] => {
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
        HTML_LINE_EDIT(params, 'date', tableData),
    },
    {
      //表头
      label: '姓名',
      print: 'name',
      // 字段名称
      render: ({ row }: any) => (
        <div>
          <el-popover
            v-slots={{ reference: () => <el-tag>{row.name}</el-tag> }}
            effect="light"
            trigger="hover"
            placement="top"
            width="auto"
          >
            <div>name: {row.name}</div>
            <div>address: {row.address}</div>
          </el-popover>
        </div>
      ),
    },
    {
      //表头
      label: '地址',
      print: 'address',
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
              size="small"
              type="warning"
              onClick={() => rowEditClick(row, index, tableData)}
            >
              <el-icon-edit />
            </el-button>
            <el-button size="small" type="danger">
              <el-icon-delete />
            </el-button>
          </div>
          {/*  TODO: 点击了行内编辑按钮的话 */}
          <div v-show={activeLineEdit.value === index && isEditLine.value}>
            <el-button
              size="small"
              type="primary"
              onClick={() => clickConfirmOrCancel(tableData, row, index)}
            >
              确定
            </el-button>
            <el-button
              size="small"
              onClick={() => clickConfirmOrCancel(tableData, row, index)}
            >
              取消
            </el-button>
          </div>
        </div>
      ),
    },
  ]
}

// TODO: 实时编辑相关的代码片段和对应逻辑
const HTML_LINE_EDIT = (
  params: I_RenderParams,
  prop: string,
  tableData: any
) => {
  const { index, column, row } = params

  return (
    <>
      {/* 如果点击的是当前的单元格编辑图标，就显示 input 框 */}
      <div
        v-show={index + column.id === currentEdit.value && !isEditLine.value}
      >
        <el-input v-model={row[prop]} style="width:200px" size="small" />
        <span>
          <el-icon-check
            v-pointer
            color="#67c23a"
            onClick={() => confirm(params, tableData)}
          />
          <el-icon-close
            v-pointer
            color="#f56c6c"
            onClick={() => cancel(params, tableData)}
          />
        </span>
      </div>
      {/* 否则就正常显示不可编辑状态 */}
      <div
        v-show={index + column.id !== currentEdit.value && !isEditLine.value}
      >
        <span> {row[prop]}</span>
        <el-icon-edit
          v-pointer
          color="#e6a23c"
          onClick={() => clickEditIcon(params, tableData)}
        />
      </div>
      {/* 这种情况是当点击行编辑按钮的时候 */}
      <span v-show={activeLineEdit.value === index && isEditLine.value}>
        <el-input v-model={row[prop]} style="width:200px" size="small" />
      </span>
      <span v-show={isEditLine.value && activeLineEdit.value !== index}>
        {row[prop]}
        <el-icon-edit
          v-pointer
          color="#e6a23c"
          onClick={() => clickEditIcon(params, tableData)}
        />
      </span>
    </>
  )
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
  name: undefined,
  type: undefined,
  range: undefined,
}

// TODO: 编辑单元格
// 当前被点击的单元格的标识
const currentEdit = ref<string>('')

// 需要添加个标识，判断单元格编辑的时候，修改了数据，是否选了对钩，意味着选择别的单元格是否要保存上一次的数据
const isCellCheck = ref(false)

// 点击编辑图标
const clickEditIcon = (scope: any, tableData: any) => {
  // 每次点击非本行其他行的单元格编辑的时候，要把当前行给关掉
  isEditLine.value = false
  // 会做一个判断 判断是否当前单元格被点击了
  // 拼接$index和column的id
  currentEdit.value = scope.index + scope.column.id

  // 将当前行的数据在变更前存一份
  const prevRow = JSON.parse(JSON.stringify(scope.row))
  console.log('prevRow ===>', prevRow)
  tableData[scope.index] = prevRow
  // 调用监听
  watch(
    () => currentEdit.value,
    (val) => {
      // 跨行单元格编辑
      if (val && !isCellCheck.value) {
        tableData[scope.index] = prevRow
        // 重置 isCellCheck
        isCellCheck.value = false
      }
    }
  )
}

// 点击确认
const confirm = (scope: any, tableData) => {
  isCellCheck.value = true
  currentEdit.value = ''
  tableData[scope.index] = scope.row
}
// 点击取消
const cancel = (scope: any, tableData) => {
  isCellCheck.value = false
  currentEdit.value = ''
}

// TODO: 编辑行

// 标识点击的是哪一行
const eidtRowIndex = ref<number>(-1)
// 标识点击的哪一行的哪一列
const tempRow = ref(-1)

// 拷贝一份表格的数据
// const tableData = ref()

const activeLineEdit = ref<number>()
const isEditLine = ref(false)
const tempRowIndex = ref<number>()

// 行编辑操作
const rowEditClick = (row: any, index: number, tableData) => {
  // 当前是否是行编辑，而不是单元格编辑
  isEditLine.value = true

  activeLineEdit.value = index

  //这个坑要注意，因为是个引用类型，必须要给它深拷贝下
  tempRow.value = JSON.parse(JSON.stringify(row))

  console.log('tempRow.value ===>', tempRow.value)
  // 重置当前的交叉index值
  tempRowIndex.value = index
}
