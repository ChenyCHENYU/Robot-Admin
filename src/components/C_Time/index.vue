<!--
 * @Author: ChenYu
 * @Date: 2022-03-17 16:05:14
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-15 22:17:23
 * @FilePath: \vue3_vite3_element-plus_admin\src\components\C_Time\index.vue
 * @Description: 基于 elementPlus 的时间进行组件化二次封装
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <div style="display: flex">
    <div style="margin-right: 10px">
      <ElTimeSelect
        v-model="startTime"
        :max-time="endTime"
        class="mr-4"
        :placeholder="startPlaceholder"
        :start="startTimeInit"
        :step="startTimeStep"
        :end="endTimeInit"
        v-bind="$attrs.startTimeOptiosnProps"
      />
    </div>
    <div>
      <ElTimeSelect
        v-model="endTime"
        :min-time="startTime"
        :placeholder="endPlaceholder"
        :start="startTimeInit"
        :step="startTimeStep"
        :end="endTimeInit"
        :disabled="endTimeDisabled"
        v-bind="$attrs.endTimeOptiosnProps"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  startPlaceholder?: string
  endPlaceholder?: string
  startTimeInit?: string // 开始时间默认值
  startTimeStep?: string // 开始时间步进
  endTimeInit?: string // 结束时间默认值
}

withDefaults(defineProps<Props>(), {
  startPlaceholder: '请选择开始时间',
  endPlaceholder: '请选择结束时间',
  startTimeInit: '08:00',
  startTimeStep: '00:30',
  endTimeInit: '18:30',
})

const startTime = ref('')
const endTime = ref('')
const endTimeDisabled = ref(true)

const emits = defineEmits(['e_changeStartEndTime'])

// TODO: 监听时间的变化
watch(
  () => [startTime.value, endTime.value],
  ([starVal, envVAL]) => {
    if (starVal === '') {
      endTime.value = ''
      endTimeDisabled.value = true
    } else if (starVal) {
      endTimeDisabled.value = false
    }
    // 当选择完时间以后，当数据传递给父组件
    if (envVAL) {
      emits('e_changeStartEndTime', [starVal, envVAL])
    }
  }
)
</script>
