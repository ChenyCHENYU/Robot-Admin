<template xmlns="http://www.w3.org/1999/html">
  <div class="app-container">
    <div class="divMain mgTop_20 middle">
      <el-table
        ref="table"
        :data="tableData"
        style="width: 100%"
        @select="selectFather"
        @select-all="selectAllFather"
        @expand-change="expandChange"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column prop="items" type="expand">
          <template #default="scope">
            <el-table
              :ref="`childTable${scope.$index}`"
              :data="scope.row.subList"
              style="width: 100%"
              stripe
              @select="selectChild"
              @select-all="selectAllChild($event, scope.$index)"
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
      <el-table :data="ruleForm.items" style="width: 100%" class="mgTop_20">
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

<script>
import mock from './data.json'

export default {
  name: 'PriceList',
  data() {
    return {
      ruleForm: {
        items: [],
      },
      selectAllChildMap: new Map(),
      tableData: [],
    }
  },

  created() {
    this.tableData = mock.list
  },
  methods: {
    expandChange(row, expandedRows) {
      const expandedRowsIds = expandedRows.map((m) => m.id)
      this.$nextTick(() => {
        const ids = this.ruleForm.items.map((f) => f.customerOrderItemId)
        this.tableData.forEach((item, index) => {
          if (item.id === row.id && expandedRowsIds.includes(row.id)) {
            row.subList.forEach((item) => {
              if (ids.includes(item.customerOrderItemId)) {
                // 明细中有 应该给选中
                this.$refs[`childTable${index}`].toggleRowSelection(item, true)
              }
            })
          }
        })
      })
    },
    selectFather(selection, row) {
      const isCheck = selection.includes(row)
      this.tableData.forEach((item, index) => {
        if (item.id === row.id) {
          this.$refs.table.toggleRowExpansion(item, true)
          const tempList = row.subList
          this.$nextTick(() => {
            if (tempList.length !== 0) {
              tempList.forEach((childItem) => {
                this.selectAllChildMap.set(index, item)
                this.$refs[`childTable${index}`].toggleRowSelection(
                  childItem,
                  isCheck
                )
              })
            }
          })
        }
      })
      if (isCheck) {
        this.validIs(row.subList)
      } else {
        this.cleanIs(null, row)
      }
    },
    selectAllFather(selection) {
      this.tableData.forEach(async (item, index) => {
        await this.$refs['table'].toggleRowExpansion(item, true)
        if (selection.length !== 0) {
          this.selectFather([item], item)
          this.selectAllChild(item.subList, index)
        } else {
          this.cleanIs(null, item)
        }
        this.$refs[`childTable${index}`].clearSelection()
      })
    },
    selectAllChild(selection, clickIndex) {
      if (selection.length > 0) {
        const fatherRow = this.tableData.find((item) => {
          return item.id === selection[0].parentId
        })
        this.selectAllChildMap.set(clickIndex, fatherRow)
        this.$refs.table.toggleRowSelection(
          this.selectAllChildMap.get(clickIndex),
          true
        )
        // 非空时候 检验明细是否存在
        this.validIs(selection)
      } else {
        this.cleanIs(clickIndex)
        this.$refs.table.toggleRowSelection(
          this.selectAllChildMap.get(clickIndex),
          false
        )
        this.selectAllChildMap.delete(clickIndex)
      }
    },
    selectChild(selection, row) {
      //校验明细中是否存在  存在则删除 否则添加
      if (this.ruleForm.items.length === 0) {
        this.ruleForm.items.push(row)
      } else {
        const ids = this.ruleForm.items.map((f) => f.customerOrderItemId)
        ids.includes(row.customerOrderItemId)
          ? (this.ruleForm.items = this.ruleForm.items.filter(
              (f) => f.customerOrderItemId !== row.customerOrderItemId
            ))
          : this.ruleForm.items.push(row)
      }
      // --
      const isCheck = selection.length > 0
      this.tableData.forEach((item, index) => {
        if (item.id === row.parentId) {
          this.selectAllChildMap.set(index, item)
          this.$refs.table.toggleRowSelection(item, isCheck)
        }
      })
    },
    //一级勾选框和子级头部勾选框检验
    validIs(selection) {
      // 非空时候 检验明细是否存在
      if (this.ruleForm.items.length === 0) {
        this.ruleForm.items.push(...selection)
      } else {
        let ids = this.ruleForm.items.map((f) => f.customerOrderItemId)
        selection.forEach((f) => {
          if (ids.indexOf(f.customerOrderItemId) !== -1) {
            delete this.ruleForm.items[ids.indexOf(f.customerOrderItemId)]
          }
        })
        this.ruleForm.items = this.ruleForm.items.filter(
          (f) => f.customerOrderItemId
        )
        ids = this.ruleForm.items.map((f) => f.customerOrderItemId)
        this.ruleForm.items.push(...selection)
      }
    },
    //一级勾选框和子级头部勾选清空方法
    cleanIs(clickIndex, fatherRow) {
      const childIdList =
        clickIndex || clickIndex === 0
          ? this.tableData[clickIndex].childIdList
          : fatherRow.childIdList
      let ids = this.ruleForm.items.map((f) => f.customerOrderItemId)
      childIdList.forEach((f) => {
        if (ids.indexOf(f) !== -1) {
          delete this.ruleForm.items[ids.indexOf(f)]
        }
      })
      this.ruleForm.items = this.ruleForm.items.filter(
        (f) => f.customerOrderItemId
      )
      ids = this.ruleForm.items.map((f) => f.customerOrderItemId)
    },
  },
}
</script>
