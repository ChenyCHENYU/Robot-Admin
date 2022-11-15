<!--
 * @Author: ChenYu
 * @Date: 2022-03-17 21:12:15
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-15 22:53:58
 * @FilePath: \vue3_vite3_element-plus_admin\src\components\C_Date\index.vue
 * @Description: 日期选择器封装
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <div style="display: flex">
    <div style="margin-right: 10px">
      <ElDatePicker
        v-model="startDate"
        type="date"
        :placeholder="startPlaceholder"
        :disabledDate="startDisabledDate"
        v-bind="$attrs.startDateOptionsProps"
        value-format="YYYY-MM-DD"
      />
    </div>
    <div>
      <ElDatePicker
        v-model="endDate"
        type="date"
        :placeholder="endPlaceholder"
        :disabled="endDataDisabled"
        :disabledDate="endDisabledDate"
        v-bind="$attrs.endDateOptionsProps"
        value-format="YYYY-MM-DD"
      />
    </div>
  </div>
</template>
s

<script lang="ts" setup>
const startDate = ref<Date | null>(null)
const endDate = ref<Date | null>(null)
const endDataDisabled = ref(true)

interface Props {
  startPlaceholder?: string
  endPlaceholder?: string
  disabledToday?: boolean // 是否禁用今天之前的日期
}

const props = withDefaults(defineProps<Props>(), {
  startPlaceholder: '请选择开始日期',
  endPlaceholder: '请选择结束日期',
  disabledToday: true,
})

const emits = defineEmits(['e_changeStartEndDate'])

//TODO: 禁用开始日期的函数
const startDisabledDate = (time: Date) => {
  if (props.disabledToday)
    // TODO: 选择的时间戳 小于 当前时间戳 - 一天的时间
    return time.getTime() < Date.now() - 1000 * 60 * 60 * 24
}
//TODO: 禁用结束日期的函数
const endDisabledDate = (time: Date) => {
  if (startDate.value) {
    // TODO: 选择的时间戳 小于 当前时间戳 - 一天的时间
    return (
      time.getTime() < new Date(startDate.value).getTime() - 1000 * 60 * 60 * 24
    )
  }
}

// TODO: 监听日期的变化
watch(
  () => [startDate.value, endDate.value],
  ([starVal, envVAL]) => {
    if (!startDate.value) {
      endDate.value = null
      endDataDisabled.value = true
    } else if (starVal) {
      endDataDisabled.value = false
    }
    // 当选择完时间以后，当数据传递给父组件
    if (envVAL) {
      emits('e_changeStartEndDate', [starVal, envVAL])
    }
  }
)
</script>
