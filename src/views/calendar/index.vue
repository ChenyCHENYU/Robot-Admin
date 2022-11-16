<!--
 * @Author: ChenYu
 * @Date: 2022-03-28 01:28:14
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-16 14:52:44
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\calendar\index.vue
 * @Description: 日历组件视图层
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <C_Calendar
    :events="events"
    :eventContent="eventContent"
    displayEventEnd
    @e_dateClick="e_dateClick"
    @e_eventClick="e_eventClick"
  />
</template>

<script lang="ts" setup>
import type { EventClickArg, EventContentArg } from '@fullcalendar/core'
import type { DateClickArg } from '@fullcalendar/interaction'
import type { I_EventItem } from '_c/C_Calendar/types'
let events = ref<I_EventItem[]>([
  {
    title: '居家隔离',
    start: '2022-03-16 08:00',
    end: '2022-03-16 24:00',
    editable: true,
  },
  {
    title: '上班搬砖，搬丫搬',
    start: '2022-03-28 10:00',
    end: '2022-03-28 18:00',
  },
])
// 点击日历上的某一天
const e_dateClick = (info: DateClickArg) => {
  events.value.push({
    title: '学习',
    start: info.dateStr + ' 12:00',
    end: info.dateStr + ' 18:00',
  })
}
// 点击日历上的代办事件
const e_eventClick = (info: EventClickArg) => {
  console.log('info', info)
}

// 自定义日历渲染内容

const eventContent = (arg: EventContentArg) => {
  const el = document.createElement('div')
  const timeTextArr = arg.timeText.split('-')
  const start = timeTextArr[0]
  const end = timeTextArr[1]
  el.innerHTML = `
    <img src="src/assets/logo.svg" width="30"/>
    <div>事件：${arg.event._def.title}</div>
    <div>开始时间：${start}</div>
    <div>结束时间：${end}</div>
    `
  return {
    domNodes: [el],
  }
}
</script>
