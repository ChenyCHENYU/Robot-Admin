<!--
 * @Author: 杨晨誉
 * @Date: 2022-03-23 14:53:17
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-30 14:33:33
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
    <ElTable
      :max-height="500"
      :data="tableData"
      v-loading="isLoading"
      element-loading-text="表着急，正在加载，小伙砸..."
      v-bind="$attrs"
      row-key="id"
      :default-expand-all="false"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <template v-for="item of tableColumns" :key="item">
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
                    @click="deleteCurrRow(item.actionBtns?.delete, scope.row)"
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
          </template>
        </ElTableColumn>
      </template>
    </ElTable>
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
</template>

<script lang="tsx" setup>
import { ElMessageBox } from 'element-plus'
import printJS from 'print-js'
import type { I_FormItem } from '_c/C_FormSearch/types'
import { d_ElMessage, d_ElNotiy } from '_utils/d_tips'
import './index.scss'
import RenderSlot from './RenderSlot'
import type { I_FormParams, I_TableColumns } from './types'

// 下面是用来处理行内编辑单元格编辑相应的副作用处理的引用
import {
  activeLineEdit,
  clickConfirmOrCancel,
  clickSaveUnitOrConfirm,
  editBtnClick,
  isEditLine,
} from '_c/C_Table/useEffect'

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
  getTableData: (params: I_FormParams) => Promise<any>
  // FormSearch 检索区域的检索参数
  formParams?: I_FormParams
  // 表格检索区域项
  formItemList?: I_FormItem[]
  // 需要缓存的自定义字符串
  formSearchInputHistoryString?: string
  // 是否显示表格工具
  toolButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  pageSizes: () => [10, 50, 100, 150, 200],
  isShowPage: true,
  pageAlign: 'right',
  shadow: 'hover',
  formSearchInputHistoryString: 'testInputHistory',
  toolButton: true,
})

const isShowSearch = ref(true)
const tableData = ref()
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const isLoading = ref(true)

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

// 需要一个用来接收不同返回数据类型的适配器, 这里先简单处理，后面根据实际需要完善
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
  const res = await props.getTableData(_disposeParmas(parmas))
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

// 进行列表项数据删除的接口
const deleteCurrRow = async (callback, { id }) => {
  try {
    const actionInfo = await ElMessageBox.confirm(
      '数据删除将不可恢复，请谨慎操作!',
      '警告',
      { confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning' }
    )
    if (actionInfo === 'confirm') {
      const res = await callback(id)
      if (res.code === '0') d_ElNotiy('数据已删除')
    }
  } catch {
    d_ElMessage('已取消操作', 'info')
  }
}

onMounted(() => getDataFn(initFormParams.value))

defineExpose({ getDataFn, initFormParams, dialogAddVisible })

// 列设置
const tableColumns = ref<I_TableColumns[]>(props.columns)
// 给每一项 column 添加 isShow
tableColumns?.value.forEach((col) => {
  col.isShow = col.isShow ?? true
})

const colRef = ref()
// 过滤掉不需要设置显隐的列（页面直接隐藏的列不需要列设置）

const colSetting = tableColumns.value?.filter((item: I_TableColumns) => {
  return (
    item.isShow &&
    item.type !== 'selection' &&
    item.type !== 'index' &&
    item.type !== 'expand' &&
    item.prop !== 'operation'
  )
})

// 打开列设置抽屉
const openColSetting = () => colRef.value.openColSetting()

// FIXME: 后续组件化的时候将打印的处理挪到外部
const handlePrint = () => {
  const gridHeaderStyle =
    'border: 1px solid #ebeef5; height: 45px;font-size: 14px;color: #232425;text-align: center;background-color: #fafafa;'
  const gridStyle =
    'border: 1px solid #ebeef5;height: 40px;font-size: 14px;color: #494b4e;text-align: center'
  const header = `<div style="display: flex;flex-direction: column;text-align: center"><h2>${'测试标题哦'}</h2></div>`
  const properties = props.columns
    .filter(
      (item) =>
        item.print &&
        item.type !== 'selection' &&
        item.type !== 'index' &&
        item.type !== 'expand' &&
        item.label !== '操作'
    )
    .map((item) => {
      return {
        field: item.print,
        displayName: item.label,
      }
    })
  printJS({
    printable: tableData.value,
    header,
    properties,
    type: 'json',
    gridHeaderStyle,
    gridStyle,
  })
}
</script>
