<!--
 * @Author: 杨晨誉
 * @Date: 2022-03-23 14:53:17
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-24 21:14:05
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_Table\index.vue
 * @Description: 表格组件
 * 
-->
<template>
  <C_FormSearch
    :formParams="formParams"
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
import './index.scss'
import RenderSlot from './RenderSlot'
import type { I_TableColumns } from './types'

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
  shadow?: 'always' | 'hover' | 'never'
  getTableData: (params) => any
  formParams: any // 表格检索区域字段
  formItemList: any // 表格检索区域项
  formSearchInputHistoryString?: string
  // isLoading?: boolean
  //
  // // 加载文案
  // elementLoadingText?: string
  // // 加载图标名
  // elementLoadingSpinner?: string
  // // 加载背景颜色
  // elementLoadingBackground?: string
  // // 加载svg
  // elementLoadingSvg?: string
  // // 加载 svg的配置
  // elementLoadingSvgViewBox?: string
}

const props = withDefaults(defineProps<Props>(), {
  page: 1,
  pageSizes: () => [10, 50, 100, 150, 200],
  pageSize: 10,
  isShowPage: true,
  pageAlign: 'right',
  shadow: 'hover',
  formSearchInputHistoryString: 'testInputHistory',
  // isLoading: true,
})

// 检索区域需要检索的时候调用
const e_dispatchGetDataFn = (formParams) => {
  getDataFn(formParams)
}

// 分页的页数改变
const handleSizeChange = (pageSizeVal: number) => {
  pageSize.value = pageSizeVal
}
// 分页的页数改变
const handleCurrentChange = (pageVal: number) => {
  page.value = pageVal
}
// 表格是否在加载中
// const isLoading = computed(() => !props.tableData || !props.tableData.length)
const isLoading = computed(() => false)

// 分页器的排列方式
const pageAlignJustifyContent = computed(() => {
  if (props.pageAlign === 'left') return 'flex-start'
  else if (props.pageAlign === 'center') return 'center'
  else return 'flex-end'
})

function getParameterNames(fn) {
  console.log('fn=>', fn)
  if (typeof fn !== 'function') return []
  var COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm
  var code = fn.toString().replace(COMMENTS, '')
  var result = code
    .slice(code.indexOf('(') + 1, code.indexOf(')'))
    .match(/([^\s,]+)/g)
  return result === null ? [] : result
}

// FIXME: 要查看文档完善 打印表格数据（💥 多级表头数据打印时，只能扁平化成一维数组，printJs 不支持多级表头打印）\
const handlePrint = () => {
  printJS({
    printable: tableData.value,
    header:
      '标题哈哈哈' &&
      `<div style="display: flex;flex-direction: column;text-align: center"><h2>${'标题哦'}</h2></div>`,
    properties: props.columns
      .filter(
        (item) =>
          item.type !== 'selection' &&
          item.type !== 'index' &&
          item.type !== 'expand' &&
          item.label !== '操作'
      )
      .map((item) => {
        const res = getParameterNames(item.render)
        console.log('res ===>', res)
        return {
          field: item.label,
          displayName: item.label,
        }
      }),
    type: 'json',
    gridHeaderStyle:
      'border: 1px solid #ebeef5;height: 45px;font-size: 14px;color: #232425;text-align: center;background-color: #fafafa;',
    gridStyle:
      'border: 1px solid #ebeef5;height: 40px;font-size: 14px;color: #494b4e;text-align: center',
  })
}

// FIXME: 测试
const tableData = ref()
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 尝试在子组件直接调用接口方法
const getDataFn = async (fomrParmas) => {
  const res = await props.getTableData(_disposeParmas(fomrParmas))
  if (res.code === '0') {
    tableData.value = res.data
  }
}

// 处理检索清除以后，值自动变为 unfined 的情况
const _disposeParmas = (fomrParmas) => {
  const paramas = Object.fromEntries(
    Object.entries(fomrParmas).filter(([, value]) => value !== '')
  )
  return paramas
}

defineExpose({ tableData, getDataFn })

onMounted(() => getDataFn(props.formParams))
</script>
