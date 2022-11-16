<!--
 * @Author: ChenYu
 * @Date: 2022-03-28 01:27:00
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-16 14:43:15
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_Calendar\index.vue
 * @Description: 日历组件 - 基于 fullcalendar 网址: https://fullcalendar.io
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <div id="calendar"></div>
</template>

<script lang="ts" setup>
import type { EventClickArg } from '@fullcalendar/core'
import { Calendar } from '@fullcalendar/core'
import '@fullcalendar/core/vdom'
import daygrid from '@fullcalendar/daygrid'
import type { DateClickArg } from '@fullcalendar/interaction'
import interaction from '@fullcalendar/interaction'
import type { I_EventItem } from './types'

interface Props {
  // 语言
  local?: string
  // 视图模式
  initalView?: string
  // 按钮文字
  buttonText?: object
  // 头部工具栏
  headerToolbar?: object
  // 底部工具栏
  footerToolbar?: object
  // 事件源
  events: I_EventItem[]
  // 日历显示结束时间
  displayEventEnd?: boolean
  // 自定义渲染日历内容
  eventContent?: () => any
}

const props = withDefaults(defineProps<Props>(), {
  local: 'zh-cn',
  initalView: 'dayGridMonth',
  buttonText: () => {
    return {
      today: '今天',
      month: '月',
      week: '周',
      day: '日',
      prevYear: '上一年',
      nextYear: '下一年',
      prev: '上一月',
      next: '下一月',
    }
  },
  headerToolbar: () => {
    return {
      start: 'title',
      center: '',
      end: 'prev today next',
    }
  },
  footerToolbar: () => {
    return {}
  },
  events: () => [],
  displayEventEnd: false,
})

const emits = defineEmits(['e_dateClick', 'e_eventClick'])

// 日历实例
const calendar = ref<Calendar>()

// 渲染日历的方法
const renderCalendar = () => {
  const el = document.getElementById('calendar')
  if (el) {
    calendar.value = new Calendar(el, {
      locale: props.local,
      plugins: [daygrid, interaction],
      initialView: props.initalView,
      buttonText: props.buttonText,
      headerToolbar: props.headerToolbar,
      footerToolbar: props.footerToolbar,
      eventSources: [
        {
          // 渲染日历事件
          events(e, callback) {
            if (props.events.length) callback(props.events)
            else callback([])
          },
        },
      ],
      // 点击日历上的某一天
      dateClick(info: DateClickArg) {
        emits('e_dateClick', info)
      },
      // 点击日历上的代办事件
      eventClick(info: EventClickArg) {
        emits('e_eventClick', info)
      },
      // 渲染日历事件的结束时间
      displayEventEnd: props.displayEventEnd,
      // 渲染日历的自定义内容
      eventContent: props.eventContent,
    })
    calendar.value.render()
  }
}

watch(
  () => props.events,
  () => {
    renderCalendar()
  },
  { deep: true }
)

onMounted(() => {
  renderCalendar()
})
</script>
