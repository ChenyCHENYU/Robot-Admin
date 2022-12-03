<template>
  <div class="app-container">
    <div class="divMain mgTop_20 middle">
      <el-table
        ref="tableRef"
        :data="tableData"
        @select="onSelect"
        @expand-change="onExpandChange"
        @select-all="onSelecyAll"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column prop="items" type="expand">
          <template #default="scope">
            <el-table
              :ref="(el) => setTableRef(el, scope.row)"
              :data="scope.row.subList"
              style="width: 100%"
              stripe
              @selection-change="
                (selection) => onSelectionChange(selection, scope.row)
              "
            >
              <el-table-column type="selection" width="50" />

              <el-table-column
                prop="customerOrderNo"
                label="采购单号"
                width="150"
              />

              <el-table-column prop="productCode" label="商品编码" />

              <el-table-column prop="productName" label="商品名称" />

              <el-table-column prop="brandName" label="品牌" />

              <el-table-column prop="model" label="型号" />

              <el-table-column prop="specification" label="规格" />

              <el-table-column prop="colorNo" label="色号" />

              <el-table-column prop="batchNo" label="批号" />

              <el-table-column
                prop="purchaseQuantity"
                label="采购数量"
                width="90"
              />

              <el-table-column
                prop="appointmentDeliveryQuantity"
                label="预约提货数量"
                width="110"
              />

              <el-table-column prop="unit" label="单位" width="100" />

              <el-table-column
                prop="settlementPrice"
                label="单价(元)"
                width="90"
              />

              <el-table-column prop="totalPrice" label="合计(元)" width="90" />

              <el-table-column
                prop="isException"
                label="是否异常"
                width="100"
              />
            </el-table>
          </template>
        </el-table-column>

        <el-table-column label="门店" prop="storeName" />

        <el-table-column label="业务单号" prop="businessNo" />

        <el-table-column label="收货人" prop="receiverName" />

        <el-table-column label="收货地址" prop="receiverAddress" />
      </el-table>
    </div>
    <div class="divMain mgTop_20">
      <p>发起配送单</p>

      <el-table :data="selectedData" style="width: 100%" class="mgTop_20">
        <el-table-column prop="productCode" label="商品编码" />

        <el-table-column prop="productName" label="商品名称" />

        <el-table-column prop="brandName" label="品牌" />

        <el-table-column prop="model" label="型号" />

        <el-table-column prop="specification" label="规格" />

        <el-table-column prop="purchaseQuantity" label="采购数量" />

        <el-table-column
          prop="appointmentDeliveryQuantity"
          label="预约提货数量"
          width="110"
        />

        <el-table-column prop="unit" label="单位" />

        <el-table-column prop="settlementPrice" label="单价(元)" />

        <el-table-column prop="totalPrice" label="合计(元)" />
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, nextTick, computed } from 'vue'
import mock from './data.json'
const tableData = ref(mock.list) // 初始化table数据

/**
 * 数据变量
 */
const rowSelectStatus = reactive({}) // 保存table行的选中状态
const childTableSelectRowData = reactive({}) // 保存子table选中的行的数据
/**
 * 获取子table的ref，子table的ref
 */
const tableRef = ref(null)
const childTableRef = reactive({})
const setTableRef = (el, { id, subList }) => {
  if (el) {
    childTableRef[id] = el
  }
}
/**
 * 选中数据
 */
const selectedData = computed(() => {
  let data = []
  for (const key in childTableSelectRowData) {
    if (childTableSelectRowData[key]) {
      data = [...data, ...childTableSelectRowData[key]]
    }
  }

  console.log('data ===>', data)
  return data
})
/**
 * 监听table全选
 */
const onSelecyAll = (selection) => {
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
/**
 * 监听table选择行
 */
const onSelect = (selection, { id, subList }) => {
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
/**
 * 监听子table的onSelectionChange
 */
const onSelectionChange = (selection, row) => {
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
/**
 * 行展开
 */
const onExpandChange = async ({ id, subList }, status) => {
  await nextTick()
  if (status.length) {
    // 展示
    if (rowSelectStatus[id]) {
      // table行选中状态
      subList.forEach((item) => {
        childTableRef[id].toggleRowSelection(item, true)
      })
    } else {
      // childTableRef[id].clearSelection()
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
</script>
