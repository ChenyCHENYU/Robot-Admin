/*
 * @Author: ChenYu
 * @Date: 2022-11-27 13:01:57
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-27 18:48:00
 * @FilePath: \vue3_vite3_element-plus_admin\src\components\C_Table\useEffect.tsx
 * @Description: 用这个来处理表格特殊能力的副作用，比如动态单元格、行内编辑操作
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

export const HTML_LINE_EDIT = (
  params: I_RenderParams,
  attr: string,
  tableData: any[]
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
          onClick={() => clickUnitEdit(params)}
        />
      </div>
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
            onClick={() => clickSaveUnitOrConfirm(tableData, index)}
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
          onClick={() => clickUnitEdit(params)}
        />
      </span>
    </div>
  )
}

// TODO: 动态单元格编辑逻辑

export const activeLineEdit = ref()
export const isEditLine = ref(false)
const tempRowIndex = ref()
const tempRow = ref({})
const currentEdit = ref('')

// 编辑按钮事件
export const editBtnClick = (row: any, index: number) => {
  activeLineEdit.value = index
  isEditLine.value = true
  tempRow.value = JSON.parse(JSON.stringify(row))
  tempRowIndex.value = index
}

// 点击单元格编辑按钮的时候
const clickUnitEdit = (params: I_RenderParams) => {
  const { row, index, column } = params
  currentEdit.value = index + column.id
  tempRow.value = JSON.parse(JSON.stringify(row))
  // 重置当前的交叉index值
  tempRowIndex.value = index
  isEditLine.value = false
}

// 点击行内编辑保存或取消操作
export const clickConfirmOrCancel = () => {
  tempRow.value = {}
  currentEdit.value = ''
  // 编辑行的也在这里复用处理
  isEditLine.value = false
}

// 单元保存和行保存逻辑一样
export const clickSaveUnitOrConfirm = (tableData: any[], index: number) => {
  tableData[index] = tempRow.value
  currentEdit.value = ''
  // 编辑行的也在这里复用处理
  isEditLine.value = false
}
