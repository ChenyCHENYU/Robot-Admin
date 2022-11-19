/*
 * @Author: GeekQiaQia
 * @Date: 2022-01-10 10:35:31
 * @LastEditTime: 2022-11-19 20:48:54
 * @LastEditors: ChenYu
 * @Description:
 * @FilePath: \vue3_vite3_element-plus_admin\src\views\home\useInitBarChart.ts
 */

import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  type TooltipComponentOption,
  GridComponent,
  type GridComponentOption,
} from 'echarts/components'

import { BarChart, type BarSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TooltipComponent, GridComponent, BarChart, CanvasRenderer])
type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | GridComponentOption | BarSeriesOption
>

let option: EChartsOption

export const useInitBarChart = (chartDom: HTMLElement | undefined) => {
  // let chartDom = document.getElementById('main')!;

  const myChart = echarts.init(chartDom as HTMLElement)

  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      show: false,
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
      },
    ],
    color: '#409eff',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        axis: 'auto',
        label: {
          backgroundColor: '#283b56',
        },
      },
    },
  }

  // eslint-disable-next-line no-unused-expressions
  option && myChart.setOption(option)
}

export default { useInitBarChart }
