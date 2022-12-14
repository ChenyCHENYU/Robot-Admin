<!--
 * @Author: 赵成刚
 * @Description: 表格动态行组件
-->
<template>
  <div class="C-ChangeTable-box" ref="changeTablebox">
    <div :class="obtainTopButtonPosition(topButtonPosition)">
      <ElButton @click="prinkWdos">水印打印 </ElButton>

      <div v-if="isRadio">
        <ElButton @click="addRoWBtn"> 增行 </ElButton>
        <ElButton @click="insertRoWBtn"> 插行 </ElButton>
        <ElButton
          @click="deleteRoWBtn"
          :disabled="state.currentChooseTable ? false : true"
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
          :disabled="state.currentChooseTable ? false : true"
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
          :disabled="state.currentChooseTable ? false : true"
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
    <ElTable
      ref="dragTable"
      :data="state.tableData"
      style="width: 100%"
      row-key="rowIndex"
    >
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
    <!-- 水印盒子 -->
    <div
      class="watermark-box"
      v-if="isTurnOnWatermark"
      ref="watermarkbox"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import Sortable from 'sortablejs'
import html2canvas from 'html2canvas'
import printJS from 'print-js'
import { d_ElMessage } from '_utils/d_tips'
import { useWatermark } from '_hooks/useWatermark'
import type { Nullable, RecordList, ColumnList } from './type'
interface Props {
  //table数据
  tableData: RecordList[]
  //table列数据
  tableColumn: ColumnList[]
  //table是否单选
  isRadio?: boolean
  //table是否多选
  isSelection?: boolean
  //table唯一主键
  rowKey?: string
  //顶部按钮位置
  topButtonPosition?: string
  //是否开启水印
  isTurnOnWatermark?: boolean
  //是否开启水印
  turnOnWatermarkText?: string
}
const props = withDefaults(defineProps<Props>(), {
  isRadio: false,
  isSelection: false,
  rowKey: 'id',
  topButtonPosition: 'right',
  isTurnOnWatermark: true,
  turnOnWatermarkText: 'SXJBJT',
})
const changeTablebox = ref<Nullable<HTMLElement>>(null)
const dragTable = ref<Nullable<HTMLElement>>(null)
const watermarkbox = ref<Nullable<HTMLElement>>(null)
const emits = defineEmits(['change_Table_Row'])

//管理数据
const state = reactive<any>({
  tableData: [],
  currentChoosIndex: -2, //选择的主键值
  currentChooseTable: null, //选择的数据对象
  sortable: null,
  watermarklist: 14,
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
//顶部按钮位置函数
const obtainTopButtonPosition = (val: string) => {
  let setupclass = ''
  switch (val) {
    case 'left':
      setupclass = 'd-flex-left'
      break
    case 'center':
      setupclass = 'd-flex-center'
      break
    default:
      setupclass = 'd-flex-right'
  }
  return setupclass
}
//表格行拖拽
const setSort = () => {
  const tbody = document.querySelector('.el-table__body-wrapper tbody')
  state.sortable = Sortable.create(tbody, {
    onEnd({ newIndex, oldIndex }) {
      const currRow = state.tableData.splice(oldIndex, 1)[0]
      state.tableData.splice(newIndex, 0, currRow)
      emits('change_Table_Row', state.tableData)
    },
  })
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
    state.currentChoosIndex = state.currentChoosIndex + 1
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
    state.currentChoosIndex = -2
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
  if (state.currentChooseTable) {
    if (state.currentChoosIndex > 0) {
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
//TODO:打印
const printLoading = ref(false)
const prinkWdos = async () => {
  const { setWatermark, clear } = useWatermark(watermarkbox.value)
  setWatermark('SXJBJT')
  let urlList: any = []
  printLoading.value = true
  nextTick(async () => {
    const image1 = await html2canvas(changeTablebox.value, {
      logging: false,
      dpi: window.devicePixelRatio * 4, // 将分辨率提高到特定的DPI 提高四倍
      scale: 1, // 按比例增加分辨率，调整显示比例
      allowTaint: true,
      useCORS: true,
    })
    urlList.push(image1.toDataURL())
    let focuser = setInterval(
      () => window.dispatchEvent(new Event('focus')),
      500
    )
    printJS({
      printable: urlList, // 图片路径，支持多张图片
      type: 'image',
      style: '@page {margin:10mm 10mm 0 10mm};',
      onLoadingEnd: () => {
        printLoading.value = false
        clear()
      },
      onPrintDialogClose: () => {
        clearInterval(focuser)
      },
    })
  })
}

onMounted(() => {
  setSort()
})
</script>
<style scoped lang="scss">
.C-ChangeTable-box {
  width: 100%;
  height: 100%;
  .d-flex-left {
    display: flex;
    justify-content: left;
    align-items: center;
  }
  .d-flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .d-flex-right {
    display: flex;
    justify-content: end;
    align-items: center;
  }

  position: relative;
  .watermark-box {
    width: 100%;
    height: 100%;
    z-index: 2;
    position: absolute;
    top: 0%;
    left: 0%;
    color: #a5a19d80;
    pointer-events: none;
  }
}
</style>
