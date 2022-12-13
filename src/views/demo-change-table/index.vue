<!--
 * @Author: 赵成刚
 * @Description: 表格动态行示例
-->
<template>
  <div>
    表格动态行示例
    <C_ChangeTable
      :tableData="state.tableData"
      :tableColumn="state.tableColumn"
      :isRadio="true"
      @change_Table_Row="changeTableRow"
    >
      <template #date="scope">
        <el-date-picker
          v-model="scope.row.date"
          type="date"
          placeholder="Pick a day"
        />
      </template>
      <template #name="scope">
        <el-input v-model="scope.row.name" />
      </template>
      <template #address="scope">
        <el-input v-model="scope.row.address" />
      </template>
    </C_ChangeTable>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
const state = reactive({
  tableData: [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      id: '1111',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      id: '2222',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      id: '3333',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      id: '4444',
    },
  ],
  tableColumn: [
    {
      type: 'index',
      label: '序号',
      width: 80,
    },
    {
      prop: 'date',
      label: '时间',
      slots: 'date',
    },
    {
      prop: 'id',
      label: '主键',
    },
    {
      prop: 'name',
      label: '姓名',
      slots: 'name',
    },
    {
      prop: 'address',
      label: '地址',
      slots: 'address',
    },
  ],
})
//调整后的数据
const changeTableRow = (val: any) => {
  console.log('调整后的数据', val)
}
</script>
