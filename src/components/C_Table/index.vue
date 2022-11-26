<!--
 * @Author: 杨晨誉
 * @Date: 2022-03-23 14:53:17
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-25 15:32:45
 * @FilePath: \vue3_vite3_element-plus_admin\src\components\C_Table\index.vue
 * @Description: 表格组件
 * 
-->
<template>
  <C_FormSearch
    :formParams="initFormParams"
    :formItemList="formItemList"
    @e_dispatchGetDataFn="e_dispatchGetDataFn"
    :formSearchInputHistoryString="formSearchInputHistoryString"
  />

  <ElCard :header="title" :shadow="shadow">
    <!-- <slot /> -->

    <!-- 表格头部 操作按钮 -->
    <div class="table-header">
      <div class="header-button-lf">
        <slot name="tableHeader"></slot>
      </div>
      <!-- TODO: 表格工具栏 -->
      <div class="header-button-ri" v-if="true">
        <ElButton
          icon="ElIconRefresh"
          circle
          @click="getDataFn(props.formParams)"
        >
        </ElButton>
        <ElButton icon="ElIconPrinter" circle @click="handlePrint"> </ElButton>
        <ElButton icon="ElIconOperation" circle> </ElButton>
        <ElButton icon="ElIconSearch" circle> </ElButton>
      </div>
    </div>
    <!-- TODO: 表格 -->
    <ElTable
      :data="tableData"
      v-loading="isLoading"
      element-loading-text="表着急，正在加载，小伙砸..."
      v-bind="$attrs"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <template v-for="item of columns" :key="item">
        <!-- TODO: 没有自定义列的情况 slot配置属性不存在的情况 -->
        <ElTableColumn
          :label="item.label"
          :prop="item.prop"
          :align="item.align || 'center'"
          :type="item.type"
          :width="item.width"
          :fixed="item.fixed"
        >
          <!-- TODO: render函数的插槽 -->
          <template #default="scope" v-if="item.render">
            <RenderSlot
              :render="item.render"
              :row="scope.row"
              :index="scope.$index"
              :column="scope.column"
            />
            <span>{{ scope.row[item.prop!] }}</span>
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
</template>
<script lang="ts" setup>
import printJS from 'print-js'
import type { I_FormItem } from '_c/C_FormSearch/types'
import './index.scss'
import RenderSlot from './RenderSlot'
import type { I_TableColumns, I_FormParams } from './types'

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
  formParams: I_FormParams
  // 表格检索区域项
  formItemList: I_FormItem[]
  // 需要缓存的自定义字符串
  formSearchInputHistoryString?: string
}

const props = withDefaults(defineProps<Props>(), {
  pageSizes: () => [10, 50, 100, 150, 200],
  isShowPage: true,
  pageAlign: 'right',
  shadow: 'hover',
  formSearchInputHistoryString: 'testInputHistory',
})

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

const emits = defineEmits(['e_sendTableData'])

// 尝试在子组件直接调用接口方法
const getDataFn = async (fomrParmas: I_FormParams): Promise<void> => {
  const res = await props.getTableData(_disposeParmas(fomrParmas))
  if (res.code === '0') {
    tableData.value = res.data
    emits('e_sendTableData', tableData)
    setTimeout(() => (isLoading.value = false), 500)
  }
}

// 处理检索清除以后，值自动变为 unfined 的情况
const _disposeParmas = (fomrParmas: I_FormParams): I_FormParams => {
  const paramas = Object.fromEntries(
    Object.entries(fomrParmas).filter(([, value]) => value !== '')
  )
  return paramas as I_FormParams
}

// 用来初始默认传递 pageNum 和 pageSzie，避免每个组件使用 Tabel 重复传递该参数
const initFormParams = computed(() => {
  const baseParams = { pageNum: 1, pageSize: 10 }
  return { ...baseParams, ...props.formParams }
})

onMounted(() => getDataFn(props.formParams))

defineExpose({ tableData, page })

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
