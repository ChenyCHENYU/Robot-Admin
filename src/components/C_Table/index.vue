<!--
 * @Author: 杨晨誉
 * @Date: 2022-03-23 14:53:17
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-28 11:39:47
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_Table\index.vue
 * @Description: 表格组件
 * 
-->
<template>
  <C_FormSearch
    v-if="formItemList"
    :formParams="initFormParams"
    :formItemList="formItemList"
    @e_dispatchGetDataFn="e_dispatchGetDataFn"
    :formSearchInputHistoryString="formSearchInputHistoryString"
    :class="isShowSearch ? 'show-search' : 'none-search'"
  />

  <ElCard :header="title" :shadow="shadow">
    <!-- 表格头部 操作按钮 -->
    <div class="table-header">
      <div class="header-button-lf">
        <slot name="tableHeader"></slot>
        <ElButton type="primary" plain @click="batchAdd" v-if="batchAddOptions">
          批量导入
        </ElButton>
        <ElButton
          type="primary"
          plain
          @click="downloadFile"
          v-if="(batchAddOptions && isExport) || batchExportFn"
        >
          批量导出
        </ElButton>
        <ElButton
          v-if="multipleSelectionDelFn"
          type="danger"
          plain
          @click="multipleDelete"
          :disabled="multipleSelection?.length ? false : true"
        >
          批量删除
        </ElButton>
      </div>

      <!-- TODO: 一些小的交互操作 -->
      <div class="header-button-cen">
        <el-tooltip content="斑马纹" placement="top">
          <ElSwitch
            v-model="stripe"
            inline-prompt
            active-icon="ElIconCheck"
            inactive-icon="ElIconClose"
          />
        </el-tooltip>
        <el-tooltip content="边框 (可拉伸列)" placement="top">
          <ElSwitch
            v-model="border"
            inline-prompt
            active-icon="ElIconCheck"
            inactive-icon="ElIconClose"
          />
        </el-tooltip>
      </div>

      <!-- TODO: 表格工具栏 -->
      <div v-if="toolButton" class="header-button-ri">
        <ElButton
          icon="ElIconRefresh"
          circle
          @click="getDataFn(props.formParams!)"
        >
        </ElButton>
        <ElButton icon="ElIconPrinter" circle @click="handlePrint"> </ElButton>
        <ElButton icon="ElIconOperation" circle @click="openColSetting">
        </ElButton>
        <ElButton
          icon="ElIconSearch"
          circle
          @click="() => (isShowSearch = !isShowSearch)"
        >
        </ElButton>
      </div>
    </div>
    <!-- TODO: 表格 -->
    <div ref="changeTablebox">
      <ElTable
        ref="tableRef"
        :border="border"
        :stripe="stripe"
        :max-height="500"
        :data="tableData"
        v-loading="isLoading"
        element-loading-text="表着急，正在加载，小伙砸..."
        v-bind="$attrs"
        row-key="id"
        :default-expand-all="false"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @selection-change="handleSelectionChange"
        @expand-change="handleOnExpandChange"
        v-waterMarker="waterMarker"
      >
        <!-- TODO:L 考虑 一种独立的场景，就是 expand 展开行，要替换原有的checkbox 的情况，这里做一种取舍，跟下面不做耦合 -->
        <ElTableColumn width="40" v-if="subListItemSelectFn">
          <!-- 自定义行的复选框 -->
          <template #default="scope">
            <div>
              <ElCheckbox
                v-model="checkList[scope.row.id]"
                :indeterminate="indeterminateList[scope.row.id]"
                @change="(val) => handleOnChangeCheckbox(val, scope.row)"
              />
            </div>
          </template>
          <!-- 自定义表头复选框 -->
          <template #header>
            <div>
              <ElCheckbox
                v-model="checkHead"
                :indeterminate="indeterminate"
                @change="handleOnSelecyAll"
              />
            </div>
          </template>
        </ElTableColumn>

        <template v-for="(item, index) of tableColumns" :key="item">
          <!-- TODO: 没有自定义列的情况 slot配置属性不存在的情况 -->
          <ElTableColumn
            v-if="item.isShow"
            :label="item.label"
            :prop="item.prop"
            :align="item.align || 'center'"
            :type="item.type"
            :width="item.width"
            :fixed="item.fixed"
            show-overflow-tooltip
            :index="disposeIndex(index)"
            :filters="item.filters"
            :filter-method="item.filters ? handlerFilter : null"
          >
            <!-- TODO: 自定义表头 -->
            <template #header>
              <component
                v-if="item.slotHeader"
                :is="item.slotHeader"
                :item="item"
              />
              <div v-else>{{ item.label }}</div>
            </template>

            <!-- TODO: render函数的插槽自定义渲染列表项内容 -->
            <template #default="scope" v-if="item.render">
              <!-- 右侧操作区域 -->
              <div class="action">
                <!-- 封装写在 Table 组件中删改查功能 -->
                <div
                  v-if="item.label === '操作' && item.actionBtns"
                  class="action-group-btns"
                >
                  <span v-show="activeLineEdit !== scope.$index || !isEditLine">
                    <ElButton
                      v-if="item.actionBtns.lineEdit"
                      size="small"
                      type="warning"
                      @click="editBtnClick(scope.row, scope.$index)"
                    >
                      <ElIconEdit />
                    </ElButton>
                    <ElButton
                      v-if="item.actionBtns.delete"
                      size="small"
                      type="danger"
                      @click="
                        d_ElMessageBox(
                          item.actionBtns?.delete,
                          scope.row.id,
                          getDataFn,
                          initFormParams
                        )
                      "
                    >
                      <ElIconDelete />
                    </ElButton>
                    <ElButton
                      v-if="item.actionBtns.detail"
                      size="small"
                      type="primary"
                      @click="getDetail(item.actionBtns?.detail, scope.row)"
                    >
                      <ElIconView />
                    </ElButton>
                  </span>
                  <span v-show="activeLineEdit === scope.$index && isEditLine">
                    <ElButton
                      v-show="scope.row.isShowConfirm"
                      size="small"
                      type="primary"
                      @click="clickSaveUnitOrConfirm(tableData, scope.$index)"
                    >
                      确定
                    </ElButton>
                    <ElButton size="small" @click="clickConfirmOrCancel">
                      取消
                    </ElButton>
                  </span>
                </div>
                <!-- 通过 render 函数选软的 -->
                <RenderSlot
                  :render="item.render"
                  :row="scope.row"
                  :index="scope.$index"
                  :column="scope.column"
                  :label="item.label"
                />
                <span>{{ scope.row[item.prop!] }}</span>
              </div>

              <!-- TODO: 这里是 Expand 展开行的封装 -->
              <div
                class="expand"
                v-if="item.type === 'expand' && subListColumns"
              >
                <ElTable
                  :ref="(el) => setTableRef(el, scope.row)"
                  :data="scope.row.subList"
                  style="width: 100%"
                  stripe
                  @selection-change="
                    (selection) => handleOnSelectionChange(selection, scope.row)
                  "
                >
                  <template v-for="sub of subListColumns" :key="sub">
                    <ElTableColumn
                      :type="sub.type"
                      :prop="sub.prop"
                      :label="sub.label"
                      :width="sub.width"
                    >
                    </ElTableColumn>
                  </template>
                </ElTable>
              </div>
            </template>
          </ElTableColumn>
        </template>
      </ElTable>
    </div>
    <!-- 用来渲染展示展开行选中的列表数据 -->
    <div class="expand-select-data" v-if="selectedData.length > 0">
      <h4>展开行选中的数据</h4>
      <ElTable :data="selectedData" style="width: 100%">
        <template v-for="expandItem of subListFilterColumns" :key="expandItem">
          <ElTableColumn
            :type="expandItem.type"
            :prop="expandItem.prop"
            :label="expandItem.label"
          />
        </template>
      </ElTable>
      <ElButton type="primary" @click="expandSubmit">提交数据</ElButton>
    </div>

    <!-- TODO: 分页器 -->
    <div
      v-if="isShowPage"
      class="pagination"
      :style="{
        justifyContent: pageAlignJustifyContent,
      }"
    >
      <ElPagination
        v-model:currentPage="page"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        :small="'small'"
        :disabled="false"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </ElCard>

  <!-- TODO: 注意，这个地方写一个插槽，用来渲染新增页 -->
  <ElDialog v-model="dialogAddVisible" title="新增" draggable>
    <!-- 下面的插槽用来给各页面自定义自己要渲染的详情页 -->
    <slot name="addDialog" />
  </ElDialog>

  <!-- TODO: 注意，这个地方写一个插槽，用来渲染详情页 -->
  <ElDialog v-model="dialogDetailVisible" title="详情" draggable>
    <!-- 下面的插槽用来给各页面自定义自己要渲染的详情页 -->
    <slot name="detailDialog" :detailData="detailData" />
  </ElDialog>

  <!-- 列设置组件 -->
  <C_ColSetting ref="colRef" v-model:colSetting="colSetting" />

  <!-- 批量导入组件 -->
  <C_ImportExcel ref="batchAddRef" />
</template>

<script lang="tsx" setup>
import type { I_FormItem } from '_c/C_FormSearch/types'
import { d_ElMessageBox, d_ElNotiy } from '_utils/d_tips'
import printJS from 'print-js'
import RenderSlot from './RenderSlot'
import './index.scss'
import type {
  I_BatchAddOptions,
  I_FormParams,
  I_TableColumns,
  I_WaterMaker,
} from './types'

// 下面是用来处理行内编辑单元格编辑相应的副作用处理的引用
import {
  activeLineEdit,
  clickConfirmOrCancel,
  clickSaveUnitOrConfirm,
  editBtnClick,
  isEditLine,
} from '@/components/C_Table/uesLineEditEffect'

import { useExpandEffect } from '@/components/C_Table/useExpandSelectEffect'

import type { I_Uncertain } from '@/interface'

import { useDownload } from '_hooks/useDownload'
import html2canvas from 'html2canvas'
interface Props {
  title?: string
  // 表格项
  columns: I_TableColumns[]
  // 分页器页码区间
  pageSizes?: number[]
  // 是否显示分页
  isShowPage?: boolean
  // 分页的排列方式
  pageAlign?: 'left' | 'center' | 'right'
  // 卡片阴影样式
  shadow?: 'always' | 'hover' | 'never'
  // Table 组件获取数据调用的异步方法
  getTableDataFn: (params: I_FormParams) => Promise<any>
  // FormSearch 检索区域的检索参数
  formParams?: I_FormParams
  // 表格检索区域项
  formItemList?: I_FormItem[]
  // 需要缓存的自定义字符串
  formSearchInputHistoryString?: string
  // 是否显示表格工具
  toolButton?: boolean
  // 多选删除传递的方法
  multipleSelectionDelFn?: (idData: string[]) => Promise<any>
  // 导入配置项
  batchAddOptions?: I_BatchAddOptions
  // 单独导出数据配置项
  batchExportFn?: () => Promise<any>
  // 默认情况下，只要传递了导入 batchAddOptions 属性的，就默认开放导入导出按钮功能，除非增加 isExport 为 false
  isExport?: boolean
  // 展开行嵌套表格渲染的列表项
  subListColumns?: any[]
  // 选择展开行的数据，提交给后台的接口API
  subListItemSelectFn?: (ids: string[]) => Promise<any>
  waterMarker?: I_WaterMaker
}

const props = withDefaults(defineProps<Props>(), {
  pageSizes: () => [10, 50, 100, 150, 200],
  isShowPage: true,
  pageAlign: 'right',
  shadow: 'hover',
  formSearchInputHistoryString: 'testInputHistory',
  toolButton: true,
  isExport: true,
})

const isShowSearch = ref(true)
const tableData = ref()
const changeTablebox = ref()
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const isLoading = ref(true)
const stripe = ref(false)
const border = ref(false)

// 检索区域需要检索的时候调用
const e_dispatchGetDataFn = (formParams: I_FormParams) => getDataFn(formParams)

// 分页的页数改变
const handleSizeChange = (pageSizeVal: number) => (pageSize.value = pageSizeVal)

// 分页的页数改变
const handleCurrentChange = (pageVal: number) => (page.value = pageVal)

// 分页器的排列方式
const pageAlignJustifyContent = computed(() => {
  if (props.pageAlign === 'left') return 'flex-start'
  else if (props.pageAlign === 'center') return 'center'
  else return 'flex-end'
})

// 处理检索清除以后，值自动变为 unfined 的情况
const _disposeParmas = (formParams: I_FormParams): I_FormParams => {
  const paramas = Object.fromEntries(
    Object.entries(formParams).filter(([, value]) => value !== '')
  )
  return paramas as I_FormParams
}

const baseParams = ref({ pageNum: 1, pageSize: 10 })

// 用来初始默认传递 pageNum 和 pageSzie，避免每个组件使用 Tabel 重复传递该参数
const initFormParams = computed(() => {
  return { ...baseParams.value, ...props.formParams }
})

const emits = defineEmits(['e_sendTableData'])

//FIXME: 需要一个用来接收不同返回数据类型的适配器, 这里先简单处理，后面根据实际需要完善
const _resDataAdapter = (resData) => {
  if (Array.isArray(resData)) {
    return resData
  } else {
    return resData.list
  }
}

// 获取列表数据源，在子组件直接调用接口方法
const getDataFn = async (formParams: I_FormParams): Promise<void> => {
  // 这个判断用来阻断不需要检索区域的逻辑
  const parmas = formParams ? formParams : baseParams.value
  const res = await props.getTableDataFn(_disposeParmas(parmas))
  if (res.code === '0') {
    tableData.value = _resDataAdapter(res.data)
    emits('e_sendTableData', tableData)
    isLoading.value = false
  }
}

// TODO: dialog 弹出框
const dialogAddVisible = ref(false) // 新增弹出框控制器

const dialogDetailVisible = ref(false) // 详情弹出框控制器
const detailData = ref() // 详情弹出框渲染的数据

// 获取详情的接口封装
const getDetail = async (callback, { id }): Promise<void> => {
  dialogDetailVisible.value = true
  // 查询数据的时候，将 rowId 传递给后台获取详情数据
  const res = await callback(id)
  if (res.code === '0') {
    detailData.value = res.data
    console.log('我拿到了详情数据', res.data)
  }
}

// TODO: 多选逻辑处理

const multipleSelection = ref()

// 多选事件
const handleSelectionChange = (val: object) => (multipleSelection.value = val)

// 多选批量删除
const multipleDelete = async () => {
  // multipleSelectIds
  const ids: string[] = []
  multipleSelection.value.forEach((item: I_Uncertain) => ids.push(item.id))
  if (props?.multipleSelectionDelFn) {
    d_ElMessageBox(
      props.multipleSelectionDelFn,
      ids,
      getDataFn,
      initFormParams.value
    )
  }
}

// 列数据筛选
const handlerFilter = (value: string, row, column) => {
  const property = column['property']
  return row[property] === value
}

// 处理表格的 index
const disposeIndex = (index) => index + 1 + (page.value - 1) * pageSize.value

onMounted(() => getDataFn(initFormParams.value))

const tableRef = ref()

defineExpose({ getDataFn, initFormParams, dialogAddVisible })

// 列设置
const tableColumns = ref<I_TableColumns[]>(props.columns)

// 打开列设置抽屉
const openColSetting = () => colRef.value.openColSetting()

// 给每一项 column 添加 isShow

tableColumns?.value.forEach((col) => (col.isShow = col.isShow ?? true))

const colRef = ref()
// 过滤掉不需要设置显隐的列（页面直接隐藏的列不需要列设置）

const colSetting = tableColumns?.value?.filter((item: I_TableColumns) => {
  return (
    item.isShow &&
    item.type !== 'selection' &&
    item.type !== 'index' &&
    item.type !== 'expand' &&
    item.prop !== 'operation'
  )
})

// TODO: 批量导入
const batchAddRef = ref()

const batchAdd = () => {
  let params = {
    ...props.batchAddOptions,
    getTableList: getDataFn,
  }
  batchAddRef.value.acceptParams(params)
}

// TODO: 批量导出
const downloadFile = async () => {
  const isAllImportOrExport = props.batchAddOptions
    ? props.batchAddOptions?.tempApi
    : props.batchExportFn
  useDownload(
    isAllImportOrExport!,
    props.batchAddOptions?.title || document.title,
    initFormParams.value
  )
}

// TODO: Expand 展开行嵌套 table 多选对应的逻辑

// 数据变量
const rowSelectStatus = reactive({}) // 保存table行的选中状态
const childTableSelectRowData = reactive({}) // 保存子table选中行的数据
const childTableRef = reactive({})
const checkList = reactive({}) // 自定义table行复选框的值
const checkHead = ref(false) // 自定义表头复选框
const indeterminateList = reactive({}) // 自定义table行复选框

// 部分处理的核心逻辑剥离到了 effect
const {
  setTableRef,
  handleOnChangeCheckbox,
  handleOnSelectionChange,
  handleOnExpandChange,
  handleOnSelecyAll,
  clearExpandSubmitData,
  indeterminate,
  multipleSelectIds,
} = useExpandEffect(
  tableRef,
  tableData,
  childTableRef,
  rowSelectStatus,
  childTableSelectRowData,
  checkList,
  indeterminateList,
  checkHead
)

// 触发多选，为嵌套表格自定义的Checkbox服务
multipleSelection.value = multipleSelectIds

// 选中数据
const selectedData = computed(() => {
  let data: any[] = []
  for (const key in childTableSelectRowData) {
    if (childTableSelectRowData[key]) {
      data = [...data, ...childTableSelectRowData[key]]
    }
  }
  console.log('data ===> 后面传递给后台的数据', data)
  return data
})

// 选中数据展示行不需要做选择操作，需要过滤里面的 expand
const subListFilterColumns = computed(() =>
  props.subListColumns!.filter((item) => item.type !== 'selection')
)

// 提交选中行的数据给后台
const expandSubmit = async () => {
  const ids = selectedData?.value.map((item) => item.id)
  const res = await props?.subListItemSelectFn!(ids)
  if (res.code === '0') {
    d_ElNotiy('筛选数据提交成功')
    clearExpandSubmitData()
  }
}

// FIXME: 后续组件化的时候将打印的处理挪到外部
// const handlePrint = () => {
//   const gridHeaderStyle =
//     'border: 1px solid #ebeef5; height: 45px;font-size: 14px;color: #232425;text-align: center;background-color: #fafafa;'
//   const gridStyle =
//     'border: 1px solid #ebeef5;height: 40px;font-size: 14px;color: #494b4e;text-align: center'
//   const header = `<div style="display: flex;flex-direction: column;text-align: center"><h2>${'测试标题哦'}</h2></div>`
//   const properties = props.columns
//     .filter(
//       (item) =>
//         item.print &&
//         item.type !== 'selection' &&
//         item.type !== 'index' &&
//         item.type !== 'expand' &&
//         item.label !== '操作'
//     )
//     .map((item) => {
//       return {
//         field: item.print,
//         displayName: item.label,
//       }
//     })
//   printJS({
//     printable: tableData.value,
//     header,
//     properties,
//     type: 'json',
//     gridHeaderStyle,
//     gridStyle,
//   })
// }

const printLoading = ref(false)
const handlePrint = async () => {
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
      },
      onPrintDialogClose: () => {
        clearInterval(focuser)
      },
    })
  })
}
</script>
