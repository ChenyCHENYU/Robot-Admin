<!--
 * @Author: 杨晨誉
 * @Date: 2022-03-23 14:53:17
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-11 14:18:06
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_Table\index.vue
 * @Description: 表格组件
 * 
-->
<template>
  <ElCard :header="title">
    <slot />
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
            <span>{{ scope.row[item.prop] }}</span>
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
import RenderSlot from './RenderSlot'
import type { I_TableColumns } from './types'

interface Props {
  title?: string
  // 表格项
  columns: I_TableColumns[]
  // 表格数据源
  tableData: any[]
  // 当前是第几页的数据
  page: number
  // 分页器页码区间
  pageSizes?: number[]
  // 当前页多少条数据
  pageSize: number
  // 总条数
  total: number
  // 是否显示分页
  isShowPage?: boolean
  // 分页的排列方式
  pageAlign?: 'left' | 'center' | 'right'
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
  // isLoading: true,
})

const emits = defineEmits(['e_handlePageSizeChange', 'e_handlePageChange'])

// 分页的页数改变
const handleSizeChange = (pageSize: number) => {
  emits('e_handlePageSizeChange', pageSize)
}
// 分页的页数改变
const handleCurrentChange = (page: number) => {
  emits('e_handlePageChange', page)
}
// 表格是否在加载中
const isLoading = computed(() => !props.tableData || !props.tableData.length)

// 分页器的排列方式
const pageAlignJustifyContent = computed(() => {
  if (props.pageAlign === 'left') return 'flex-start'
  else if (props.pageAlign === 'center') return 'center'
  else return 'flex-end'
})
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  margin-top: 16px;
  // justify-content: flex-end;
}
</style>
