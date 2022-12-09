// TODO: 处理 expand 展开行多选的逻辑

import type { I_Uncertain } from '@/interface'
import type { Ref } from 'vue'

const multipleSelectIds: string[] = []

export const useExpandEffect = (
  tableRef: Ref,
  tableData: Ref<[]>,
  childTableRef: I_Uncertain,
  rowSelectStatus: I_Uncertain,
  childTableSelectRowData: I_Uncertain,
  checkList: I_Uncertain,
  indeterminateList: I_Uncertain,
  checkHead: Ref<boolean>
) => {
  // 监听table选择行
  const _onSelect = ({ id, value, subList }) => {
    rowSelectStatus[id] = value // 保存table行的选中状态
    if (rowSelectStatus[id]) {
      // 选中状态
      childTableSelectRowData[id] = subList
      if (childTableRef[id]) {
        // 当前行的子table存在， 设置子tabe所有行选中
        subList.forEach((item) => {
          childTableRef[id].toggleRowSelection(item, true)
        })
      }
    } else {
      // 非选中状态
      childTableSelectRowData[id] = []
      if (childTableRef[id]) {
        // 当前行的子table存在，清除子table的选中状态
        childTableRef[id].clearSelection()
      }
    }
    // 配合选择数据
    if (value) multipleSelectIds.push(id)
    else multipleSelectIds.splice(multipleSelectIds.indexOf(id), 1)
  }

  // 监听自定义table行复选框的值
  const handleOnChangeCheckbox = (val: string, row: I_Uncertain) => {
    _onSelect({ id: row.id, value: val, subList: row.subList })
  }

  const setTableRef = (el: Element, { id }) => {
    if (el) childTableRef[id] = el
  }

  // 监听子table的handleOnSelectionChange
  const handleOnSelectionChange = (
    selection: I_Uncertain[],
    row: I_Uncertain
  ) => {
    // 保存子table选中的行
    childTableSelectRowData[row.id] = selection
    // row为子table数据的父级数据
    if (row.subList.length === selection.length) {
      // 等于总行数
      checkList[row.id] = true // 设置当前行自定义复选框为true
      rowSelectStatus[row.id] = true // 保存table行的选中状态
      indeterminateList[row.id] = false // 设置当前行自定义复选框indeterminate值
    } else if (selection.length === 0) {
      // 等于0
      checkList[row.id] = false // 设置当前行自定义复选框为false
      rowSelectStatus[row.id] = false // 保存table行的选中状态
      indeterminateList[row.id] = false // 设置当前行自定义复选框indeterminate值
    } else {
      // 不等于总行数
      checkList[row.id] = false // 设置当前行自定义复选框为false
      indeterminateList[row.id] = true // 设置当前行自定义复选框indeterminate值
      rowSelectStatus[row.id] = false // 保存table行的选中状态
    }
  }

  // 行展开
  const handleOnExpandChange = async (
    { id, subList },
    status: I_Uncertain[]
  ) => {
    await nextTick()
    if (status.length) {
      // 展开
      if (rowSelectStatus[id]) {
        // table行选中状态
        subList.forEach((item: I_Uncertain) => {
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
      // 收起
    }
  }

  // 自定义table行复选框选中的数量

  const checkedCount = computed(() => {
    const checkedList: any = []
    for (const key in checkList) {
      if (checkList[key]) {
        checkedList.push(key)
      }
    }
    return checkedList.length
  })

  // 自定义表头复选框indeterminate值

  const indeterminate = computed(() => {
    return checkedCount.value > 0 && checkedCount.value < tableData.value.length
  })

  // 监听自定义表头复选框

  const handleOnSelecyAll = (val: string) => {
    if (val) {
      // 选中
      tableData.value.forEach(({ id, subList }) => {
        rowSelectStatus[id] = true // 保存table行的选中状态
        checkList[id] = true // 设置自定table复选框的值为选中状态
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
      // 设置自定义复选框的值为false
      for (const key in checkList) {
        if (checkList[key]) {
          checkList[key] = false
        }
      }
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

  // 监听自定义table行复选框选中的数量，设置自定义表头复选框是否被选中

  watch(
    () => checkedCount.value,
    () => {
      if (checkedCount.value < tableData.value.length) {
        checkHead.value = false
      } else {
        checkHead.value = true
      }
    }
  )

  // 清空筛选出来的数据
  const clearExpandSubmitData = () => {
    for (const key in childTableSelectRowData) {
      if (childTableSelectRowData[key]) {
        childTableSelectRowData[key] = []
      }
    }
    // 清空子table的选中状态
    for (const key in childTableRef) {
      if (childTableRef[key]) {
        childTableRef[key].clearSelection()
      }
    }
    // 清空顶级选择的数据
    tableRef.value.clearSelection()
  }

  return {
    setTableRef,
    handleOnSelectionChange,
    handleOnExpandChange,
    handleOnChangeCheckbox,
    handleOnSelecyAll,
    clearExpandSubmitData,
    indeterminate,
    checkedCount,
    multipleSelectIds,
  }
}
