<!--
 * @Author: ChenYu
 * @Date: 2022-03-06 22:07:54
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-14 08:49:59
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_Cascade\index.vue
 * @Description: input 级联选择器 非
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <div>省市区选择</div>
  <ElSelect
    clearable
    placeholder="请选择省份"
    v-model="province"
    @clear="handleClear"
  >
    <ElOption
      v-for="item of props.sourceData"
      :key="item.code"
      :value="item.code"
      :label="item.name"
    >
    </ElOption>
  </ElSelect>

  <ElSelect
    clearable
    style="margin: 0 10px"
    :disabled="!province"
    placeholder="请选择城市"
    v-model="city"
    @clear="handleClear"
  >
    <ElOption
      v-for="item of selectCtiy"
      :key="item.code"
      :value="item.code"
      :label="item.name"
    >
    </ElOption>
  </ElSelect>

  <ElSelect
    clearable
    :disabled="!province || !city"
    placeholder="请选择区域"
    v-model="area"
  >
    <ElOption
      v-for="item of selectArea"
      :key="item.code"
      :value="item.code"
      :label="item.name"
    >
    </ElOption>
  </ElSelect>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
// import allprops.sourceData from '_c/lib/pca-code.json'

// TODO: 源数据接口类型
interface I_AreaItem {
  name: string
  code: string
  children?: I_AreaItem[]
}

// TODO: 传递的数据接口类型
interface I_AreaData {
  name: string
  code: string
}

interface Props {
  sourceData: I_AreaItem[]
}

const props = withDefaults(defineProps<Props>(), {
  sourceData: () => [],
})

const emits = defineEmits(['e_changeArae'])

const province = ref<string>('')
const city = ref<string>('')
const area = ref<string>('')

// 清空操作
const handleClear = () => {
  city.value = ''
  area.value = ''
}

// TODO: 获取选择的区域数据
const _selectDownInputAreaData = (
  arr: any,
  downSelect: Ref,
  attr = 'children'
) => arr.find((item: any) => item.code === downSelect.value)[attr]

// TODO: 处理组装选择的区域数据，获取到里面区域code对应的的name
const _disposeAreaData = (arr: I_AreaItem[], code: Ref) => {
  return {
    code: code.value,
    name: code.value && _selectDownInputAreaData(arr, code, 'name'),
  }
}

/**
 *
// FIXME: 弃用 城市下拉框的所有值  计算属性有副作用
const selectCtiy = computed(() => {
  if (!province.value) return []
  else {
    city.value = ''
    area.value = ''
    return _selectDownInputAreaData(props.sourceData, province)
  }
})
 */

const selectCtiy = ref<I_AreaItem[]>()
// TODO: 城市下拉框的所有值
watch(
  () => province.value,
  (val) => {
    if (val) {
      city.value = ''
      area.value = ''
      selectCtiy.value = _selectDownInputAreaData(props.sourceData, province)
    } else selectCtiy.value = []
  }
)

/**
 *

// FIXME:  弃用 区域下拉框的所有值 计算属性赋值有副作用
const selectArea = computed(() => {
  if (!city.value) return []
  else {
    area.value = ''
    return _selectDownInputAreaData(selectCtiy.value, city)
  }
})
 */

// TODO: 区域下拉框的所有值
const selectArea = ref<I_AreaData[]>()
watch(
  () => city.value,
  (val) => {
    if (val) {
      area.value = ''
      selectArea.value = _selectDownInputAreaData(selectCtiy.value, city)
    } else selectArea.value = []
  }
)

//TODO: 监听区域的值都获取到了，要传递给父组件选择的数据
watch(
  () => area.value,
  (val) => {
    // 只有值发生变化，我才去做如下组装数据和派发emit
    if (val) {
      const _province = _disposeAreaData(props.sourceData, province)
      const _city = _disposeAreaData(selectCtiy.value!, city)
      const _area = _disposeAreaData(selectArea.value!, area)
      emits('e_changeArae', { _province, _city, _area })
    }
  }
)
</script>
