<!--
 * @Author: ChenYu
 * @Date: 2022-04-12 16:53:34
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-10 09:50:04
 * @FilePath: \v3-vite-elementPlus-admin\src\components\C_HeaderSearch\index.vue
 * @Description: 快捷搜索组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <div>
    <C_Icon
      id="guide-search"
      iconName="ElIconSearch"
      @click.stop="onShowClick"
    />
    <div class="header-search" :class="{ show: isShow }">
      <ElSelect
        ref="handlesearchSelectRef"
        class="header-search-select"
        v-model="search"
        filterable
        default-first-option
        remote
        :remote-method="querySearch"
        placeholder="search"
        @change="handleChange"
      >
        <ElOption
          v-for="option of searchOption"
          :key="option.item.path"
          :label="option.item.title.join(' > ')"
          :value="option.item"
        ></ElOption>
      </ElSelect>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 模糊检索的第三方库
import Fuse from 'fuse.js'
// 目前数据源仅仅是左侧菜单，后续根据需要再行扩展
import routes from '@/router/routes'
import { d_watchSwitchLang } from '_utils/d_i18n'
import { _generateData } from './index'

const router = useRouter()

let searchPool = computed(() => _generateData(routes))

// 搜索库相关
let fuse
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键，比如想让它根据路由数据源中的 title和path进行搜索
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7,
      },
      {
        name: 'path',
        weight: 0.3,
      },
    ],
  })
}
initFuse(searchPool.value)

// 控制 serach 展示
const isShow = ref(false)
const onShowClick = () => (isShow.value = !isShow.value)

// 关闭事件
const handlesearchSelectRef = ref()
const onClose = () => {
  handlesearchSelectRef.value.blur()
  isShow.value = false
  searchOption.value = []
}
watch(isShow, (val) => {
  if (val) document.body.addEventListener('click', onClose)
  else document.body.removeEventListener('click', onClose)
})

// TODO: search 相关
const search = ref('')
// FuseResult
const searchOption = ref<any[]>([])
// 搜索方法
const querySearch = (query) => {
  if (query !== '') {
    searchOption.value = fuse.search(query)
  } else {
    searchOption.value = []
  }
}
// 选中回调
const handleChange = (val) => router.push(val.path)

// 监听语言发生变化
d_watchSwitchLang(() => {
  searchPool = computed(() => _generateData(routes))
  initFuse(searchPool.value)
})
</script>
<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  margin: -26px 16px 0;
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
    :deep(.el-input__inner) {
      border-radius: 4px;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
      text-indent: 10px;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
