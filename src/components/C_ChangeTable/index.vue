<!--
 * @Author: 赵成刚
 * @Description: 表格动态行组件
-->
<template>
  <div class="C-ChangeTable-box">
    <div :class="obtainTopButtonPosition(topButtonPosition)">
      <div v-if="isRadio" class="C-ChangeTable-top-btn-box">
        <ElButton @click="addRoWBtn"> 增行 </ElButton>
        <ElButton @click="insertRoWBtn"> 插行 </ElButton>
        <ElButton
          @click="deleteRoWBtn"
          :disabled="state.currentChoosIndex ? false : true"
        >
          删除行
          <el-tooltip
            class="box-item"
            effect="dark"
            content="删除行先要选择数据"
            placement="top"
          >
            <el-icon class="el-icon--right">
              <InfoFilled />
            </el-icon>
          </el-tooltip>
        </ElButton>
        <ElButton
          @click="copyRoWBtn"
          :disabled="state.currentChoosIndex ? false : true"
        >
          复制行
          <el-tooltip
            class="box-item"
            effect="dark"
            content="复制行先要选择数据"
            placement="top"
          >
            <el-icon class="el-icon--right">
              <InfoFilled />
            </el-icon>
          </el-tooltip>
        </ElButton>
        <ElButton
          @click="adjustmentRoWBtn"
          :disabled="state.currentChoosIndex ? false : true"
        >
          调整行
          <el-tooltip
            class="box-item"
            effect="dark"
            content="调整行先要选择数据"
            placement="top"
          >
            <el-icon class="el-icon--right">
              <InfoFilled />
            </el-icon>
          </el-tooltip>
        </ElButton>
      </div>
    </div>
    <ElTable :data="state.tableData" style="width: 100%" row-key="rowIndex">
      <ElTableColumn v-if="isSelection" type="selection" />
      <ElTableColumn v-if="isRadio" width="55" label="选择">
        <template #default="scope">
          <el-radio
            class="radio"
            v-model="state.currentChoosIndex"
            :label="scope.row.rowIndex"
            >&nbsp;</el-radio
          >
        </template>
      </ElTableColumn>
      <ElTableColumn
        v-for="(item, index) in tableColumn"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :type="item.type"
        :fixed="item.fixed"
        :align="item.align"
        :key="index"
      >
        <!-- 插槽暴露 -->
        <template #default="scope" v-if="item.slots">
          <slot :name="item.slots" v-bind="scope"></slot>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import type { PropType } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { d_ElMessage } from '_utils/d_tips'
import type { RecordList, ColumnList } from './type'
const emits = defineEmits(['change_Table_Row'])
const props = defineProps({
  //table数据
  tableData: {
    type: Array as PropType<RecordList[]>,
    default: () => [],
  },
  //table列数据
  tableColumn: {
    type: Array as PropType<ColumnList[]>,
    default: () => [],
  },
  //table是否单选
  isRadio: {
    type: Boolean,
    default: false,
  },
  //table是否多选
  isSelection: {
    type: Boolean,
    default: false,
  },
  //table唯一主键
  rowKey: {
    type: String,
    default: 'id',
  },
  //顶部按钮位置
  topButtonPosition: {
    type: String,
    default: 'left',
  },
})
//管理数据
const state = reactive({
  tableData: [],
  currentChoosIndex: undefined, //选择的主键值
  currentChooseTable: null, //选择的数据对象
})
//重置table主键index
const resetRowIndexFn = () => {
  props.tableData.forEach((item, index) => {
    item.rowIndex = index
  })
  state.tableData = props.tableData
}
//监听传入源数据
watch(
  () => props.tableData,
  () => {
    resetRowIndexFn()
  },
  { immediate: true }
)
//监听单选框选择数据
watch(
  () => state.currentChoosIndex,
  () => {
    state.currentChooseTable = props.tableData.filter(
      (i) => state.currentChoosIndex == i.rowIndex
    )[0]
  },
  { immediate: true }
)
const obtainTopButtonPosition = (val) => {
  console.log(val)
}
//行增加
const addRoWBtn = () => {
  props.tableData.push({})
  resetRowIndexFn()
  emits('change_Table_Row', state.tableData)
}
//插行
const insertRoWBtn = () => {
  if (state.currentChooseTable) {
    props.tableData.splice(state.currentChoosIndex, 0, {})
    resetRowIndexFn()
  } else {
    addRoWBtn()
  }
  emits('change_Table_Row', state.tableData)
}
//删行
const deleteRoWBtn = () => {
  if (state.currentChooseTable) {
    props.tableData.splice(state.currentChoosIndex, 1)
    state.currentChoosIndex = undefined
    resetRowIndexFn()
    emits('change_Table_Row', state.tableData)
  } else {
    d_ElMessage('请选择删除数据!', 'warning')
  }
}
//复制行
const copyRoWBtn = () => {
  if (state.currentChooseTable) {
    const copyList = JSON.parse(
      JSON.stringify(
        props.tableData.filter(
          (item, index) => item.rowIndex == state.currentChoosIndex
        )[0]
      )
    )
    delete copyList[props.rowKey]
    props.tableData.push(copyList)
    resetRowIndexFn()
    emits('change_Table_Row', state.tableData)
  } else {
    d_ElMessage('请选择要复制的数据!', 'warning')
  }
}
//调整行
const adjustmentRoWBtn = () => {
  if (state.currentChoosIndex != undefined) {
    if (state.currentChoosIndex != 0) {
      props.tableData[state.currentChoosIndex] = props.tableData.splice(
        state.currentChoosIndex - 1,
        1,
        props.tableData[state.currentChoosIndex]
      )[0]
      state.currentChoosIndex = state.currentChoosIndex - 1
    } else {
      props.tableData.push(props.tableData.shift())
      state.currentChoosIndex = props.tableData.length - 1
    }
    resetRowIndexFn()
    emits('change_Table_Row', state.tableData)
  } else {
    d_ElMessage('请选择要调整的数据!', 'warning')
  }
}
</script>
<style scoped lang="scss">
.C-ChangeTable-box {
  .C-ChangeTable-top-btn-box {
  }
}
</style>
