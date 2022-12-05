/*
 * @Author: ChenYu
 * @Date: 2022-11-27 13:01:57
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-12-05 14:51:50
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_Table\useEffect.tsx
 * @Description: 用这个来处理表格特殊能力的副作用，比如动态单元格、行内编辑操作
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

// TODO: 处理行内编辑、单元格编辑副作用
export const HTML_LINE_EDIT = (
  params: I_RenderParams,
  attr: string,
  tableData: any[]
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
          onClick={() => clickUnitEdit(params)}
        />
      </div>
      <span
        v-show={index + column.id === currentEdit.value && !isEditLine.value}>
        <el-input
          v-model={tempRow.value[attr]}
          style='width:200px'
          size='small'
        />
        <span>
          <el-icon-check
            v-pointer
            color='#67c23a'
            onClick={() => clickSaveUnitOrConfirm(tableData, index)}
          />
          <el-icon-close
            v-pointer
            color='#f56c6c'
            onClick={() => clickConfirmOrCancel()}
          />
        </span>
      </span>
      {/* 处理编辑行需要的元素 */}
      <span v-show={activeLineEdit.value === index && isEditLine.value}>
        <el-input
          v-model={tempRow.value[attr]}
          style='width:200px'
          size='small'
        />
      </span>
      <span v-show={isEditLine.value && activeLineEdit.value !== index}>
        {row[attr]}
        <el-icon-edit
          v-pointer
          color='#e6a23c'
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

// TODO: 处理 expand 展开行多选的逻辑

import type { I_Uncertain } from '@/interface'
import type { Ref } from 'vue'

export const useExpandEffect = (
  tableRef: Ref,
  childTableRef: I_Uncertain,
  rowSelectStatus: I_Uncertain,
  childTableSelectRowData: I_Uncertain
) => {
  const setTableRef = (el, { id }) => {
    if (el) childTableRef[id] = el
  }

  // 监听table全选
  const handleOnSelecyAll = (selection) => {
    if (selection.length) {
      // 选中
      selection.forEach(({ id, subList }) => {
        rowSelectStatus[id] = true // 保存table行的选中状态
        if (childTableRef[id]) {
          // 判断子table存在， 设置子table所有行为选中状态
          subList.forEach((item) => {
            childTableRef[id].toggleRowSelection(item, true)
          })
        } else {
          // 当前行的子table不存在,保存子table的选中行
          childTableSelectRowData[id] = subList
        }
      })
    } else {
      // 取消全选
      tableRef.value.clearSelection()
      // 保存table行选中状态为false
      for (const key in rowSelectStatus) {
        if (rowSelectStatus[key]) {
          rowSelectStatus[key] = false
        }
      }
      // 清空子table的选中状态
      for (const key in childTableRef) {
        if (childTableRef[key]) {
          childTableRef[key].clearSelection()
        }
      }
      // 清空子table的选中行
      for (const key in childTableSelectRowData) {
        if (childTableSelectRowData[key]) {
          childTableSelectRowData[key] = []
        }
      }
    }
  }

  // 监听子table的handleOnSelectionChange
  const handleOnSelectionChange = (selection, row) => {
    // 保存子table选中的行
    childTableSelectRowData[row.id] = selection
    // row为子table数据的父级数据
    // 判断选中的行数是否等于总行数
    const res = row.subList.length === selection.length
    if (!res) {
      // 不等于总行数
      tableRef.value.toggleRowSelection(row, false) // 设置父级的checkbox
      rowSelectStatus[row.id] = false // 保存table行的选中状态
    } else {
      // 等于总行数
      tableRef.value.toggleRowSelection(row, true) // 设置父级的checkbox
      rowSelectStatus[row.id] = true // 保存table行的选中状态
    }
  }

  // 行展开
  const handleOnExpandChange = async ({ id, subList }, status) => {
    await nextTick()
    if (status.length) {
      // 展示
      if (rowSelectStatus[id]) {
        // table行选中状态
        subList.forEach((item) => {
          childTableRef[id].toggleRowSelection(item, true)
        })
      } else {
        // table行不是选中状态，判断子table选中的行
        const rows = childTableSelectRowData[id] || []
        if (rows.length) {
          rows.forEach((item) => {
            childTableRef[id].toggleRowSelection(item, true)
          })
        }
      }
    } else {
      // 收起状态
    }
  }
  // 监听table选择行
  const handleOnSelect = (selection, { id, subList }) => {
    rowSelectStatus[id] = selection.some((item) => item.id === id) // 保存table行的选中状态
    if (rowSelectStatus[id]) {
      // 选中状态
      if (childTableRef[id]) {
        // 当前行的子table存在， 设置子tabe所有行选中
        subList.forEach((item) => {
          childTableRef[id].toggleRowSelection(item, true)
        })
      } else {
        // 当前行的子table不存在,保存子table的选中行
        childTableSelectRowData[id] = subList
      }
    } else {
      // 非选中状态
      if (childTableRef[id]) {
        // 当前行的子table存在，清除子table的选中状态
        childTableRef[id].clearSelection()
      } else {
        // 当前行的子不table存在，清空子table的选中行
        childTableSelectRowData[id] = []
      }
    }
  }

  return {
    setTableRef,
    handleOnSelecyAll,
    handleOnSelectionChange,
    handleOnExpandChange,
    handleOnSelect,
  }
}
