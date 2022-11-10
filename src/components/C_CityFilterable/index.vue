<!--
 * @Author: ChenYu
 * @Date: 2022-03-20 20:34:23
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-12 11:02:26
 * @FilePath: \v3-el-components\src\components\C_CityFilterable\index.vue
 * @Description: 下拉框筛选类型的城市
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <div>
    <ElSelect
      v-model="selectValue"
      filterable
      placeholder="请选择城市"
      @change="handleChange"
    >
      <ElOption
        v-for="item in cityOptions"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      />
    </ElSelect>
  </div>
</template>

<script lang="ts" setup>
import citys from '_c/lib/city'
const emits = defineEmits(['e_clickChangeCity'])
// 下拉框的值 搜索下拉框
const selectValue = ref('')

// const cityOptionsInit = ref<any[]>([])

// TODO: 下拉框显示城市的数据 [如果不需要检索拼音这个即可]
let cityOptions = computed(() => {
  return Object.values(citys.cities).flat(2)
})

// TODO: 如果需要拼音检索 开放下面的逻辑 radiowVal 变成动态数据
// const handleFilterMethod = (val: string) => {
//   const values = Object.values(citys.cities).flat(2)
//   if (val) {
//     if (radioVal === '按城市') {
//       // 中文和拼音一起过滤
//       cityOptionsInit.value = values.filter((item) => {
//         console.log('item.name', item.name)
//         return item.name.includes(val) || item.spell.includes(val)
//       })
//     } else {
//       // 只中文过滤
//       cityOptionsInit.value = values.filter((item) => {
//         return item.name.includes(val)
//       })
//     }
//   } else {
//     cityOptionsInit.value = values
//   }
// }

// onMounted(() => {
//   cityOptionsInit.value = Object.values(citys.cities).flat(2)
// })

const handleChange = (changeCity: string) => {
  emits('e_clickChangeCity', changeCity)
  selectValue.value = ''
}
</script>
