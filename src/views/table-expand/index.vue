<template>
  <div class="app-container">
    <div class="divMain mgTop_20 middle">
      <el-table
        ref="tableRef"
        :data="tableData"
        @expand-change="onExpandChange"
      >
        <el-table-column width="50">
          <!-- 自定义行的复选框 -->
          <template #default="scope">
            <div>
              <el-checkbox
                v-model="checkList[scope.row.id]"
                :indeterminate="indeterminateList[scope.row.id]"
                @change="(val) => onChangeCheckbox(val, scope.row)"
              />
            </div>
          </template>

          <!-- 自定义表头复选框 -->
          <template #header>
            <div>
              <el-checkbox
                v-model="checkHead"
                :indeterminate="indeterminate"
                @change="onSelecyAll"
              />
            </div>
          </template>
        </el-table-column>
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
import { computed, nextTick, reactive, ref, watch } from 'vue'
import mock from './data.json'
const tableData = ref(mock.list) // 初始化table数据
const tableDataLength = tableData.value.length // table数据的数量

/**
 * 数据变量
 */
const rowSelectStatus = reactive({}) // 保存table行的选中状态
const childTableSelectRowData = reactive({}) // 保存子table选中的行的数据
const checkList = reactive({}) // 自定义table行复选框的值
const checkHead = ref(false) // 自定义表头复选框
const indeterminateList = reactive({}) // 自定义table行复选框indeterminate的值
/**
 * 监听自定义table行复选框的值
 */
const onChangeCheckbox = (val, row) => {
  onSelect({ id: row.id, value: val, subList: row.subList })
}
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
  return data
})

/**
 *  自定义table行复选框选中的数量
 */
const checkedCount = computed(() => {
  const checkedList = []
  for (const key in checkList) {
    if (checkList[key]) {
      checkedList.push(key)
    }
  }
  return checkedList.length
})

/**
 * 自定义表头复选框indeterminate值
 */
const indeterminate = computed(() => {
  return checkedCount.value > 0 && checkedCount.value < tableDataLength
})
/**
 * 监听自定义table行复选框选中的数量，设置自定义表头复选框是否被选中
 */
watch(
  () => checkedCount.value,
  (val) => {
    if (checkedCount.value < tableDataLength) {
      checkHead.value = false
    } else {
      checkHead.value = true
    }
  }
)
/**
 * 监听自定义表头复选框
 */
const onSelecyAll = (val) => {
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
/**
 * 监听table选择行
 */
const onSelect = ({ id, value, subList }) => {
  rowSelectStatus[id] = value // 保存table行的选中状态
  if (rowSelectStatus[id]) {
    // 选中状态
    if (childTableRef[id]) {
      // 当前行的子table存在， 设置子tabe所有行选中
      childTableSelectRowData[id] = subList
      subList.forEach((item) => {
        childTableRef[id].toggleRowSelection(item, true)
      })
    } else {
      // 当前行的子table不存在,保存子table的选中行
      childTableSelectRowData[id] = subList
    }
  } else {
    // 非选中状态
    childTableSelectRowData[id] = []
    if (childTableRef[id]) {
      // 当前行的子table存在，清除子table的选中状态
      childTableRef[id].clearSelection()
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
