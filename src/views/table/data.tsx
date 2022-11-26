/*
 * @Author: 杨晨誉
 * @Date: 2022-03-24 14:32:19
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-27 03:14:37
 * @FilePath: \vue3_vite3_element-plus_admin\src\views\table\data.tsx
 * @Description: tsx数据层
 *
 */
import './index.scss'
import type { I_RenderParams, I_TableColumns } from '@/components/C_Table/types'
import type { I_FormItem } from '_c/C_FormSearch/types'
import { ref } from 'vue'

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

// TODO: 要渲染的列表项
export const COLUMNS = (tableData?: any): I_TableColumns[] => {
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
      render: ({ row, index }: any) => (
        <div>
          <div v-show={activeLineEdit.value !== index || !isEditLine.value}>
            <el-button
              size="small"
              type="warning"
              onClick={() => handleEditClick(row, index)}
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
              onClick={() => clickConfirmOrSave(tableData, index)}
            >
              确定
            </el-button>
            <el-button size="small" onClick={() => clickConfirmOrCancel()}>
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
  attr: string,
  tableData: any
) => {
  const { index, column, row } = params
  return (
    <div class="html-line-edit">
      <div
        v-show={index + column.id !== currentEdit.value && !isEditLine.value}
      >
        <span> {row[attr]}</span>
        <el-icon-edit
          v-pointer
          color="#e6a23c"
          onClick={() => clickTempEdit(params)}
        />
      </div>
      {/* <span v-show={active.value === index}> */}
      <span
        v-show={index + column.id === currentEdit.value && !isEditLine.value}
      >
        <el-input
          v-model={tempRow.value[attr]}
          style="width:200px"
          size="small"
        />
        <span>
          <el-icon-check
            v-pointer
            color="#67c23a"
            onClick={() => unitSave(tableData, index)}
          />
          <el-icon-close
            v-pointer
            color="#f56c6c"
            onClick={() => clickConfirmOrCancel()}
          />
        </span>
      </span>
      {/* 处理编辑行需要的元素 */}
      <span v-show={activeLineEdit.value === index && isEditLine.value}>
        <el-input
          v-model={tempRow.value[attr]}
          style="width:200px"
          size="small"
        />
      </span>
      <span v-show={isEditLine.value && activeLineEdit.value !== index}>
        {row[attr]}
        <el-icon-edit
          v-pointer
          color="#e6a23c"
          onClick={() => clickTempEdit(params)}
        />
      </span>
    </div>
  )
}

// TODO: 动态单元格编辑逻辑

const activeLineEdit = ref()
const isEditLine = ref(false)
const tempRowIndex = ref()

/**
 * 编辑按钮事件
 * @param row
 * @param index
 */
const handleEditClick = (row: any, index: number) => {
  activeLineEdit.value = index
  isEditLine.value = true
  tempRow.value = JSON.parse(JSON.stringify(row))
  tempRowIndex.value = index
}

// TODO: 当前点击的哪一行的哪一列
const tempRow = ref({})
const currentEdit = ref('')

// 点击编辑按钮的时候，要对点击的数据进行临时存储，便于取消操作后恢复默认值
const clickTempEdit = (params: I_RenderParams) => {
  const { row, index, column } = params
  currentEdit.value = index + column.id
  tempRow.value = JSON.parse(JSON.stringify(row))
  // 重置当前的交叉index值
  tempRowIndex.value = index
  isEditLine.value = false
}

// 点击行内编辑保存或取消操作
const clickConfirmOrCancel = () => {
  tempRow.value = {}
  currentEdit.value = ''
  // 编辑行的也在这里复用处理
  isEditLine.value = false
}

/**
 * 单元保存
 * @param index
 */
const unitSave = (tableData, index: number) => {
  tableData[index] = tempRow.value
  currentEdit.value = ''
  // 编辑行的也在这里复用处理
  isEditLine.value = false
}

/**
 * 确定按钮事件--保存数据
 * @param tableData
 * @param row
 * @param index
 */
const clickConfirmOrSave = (tableData: any, index: number) => {
  tableData[index] = tempRow.value
  currentEdit.value = ''
  // 编辑行的也在这里复用处理
  isEditLine.value = false
}
