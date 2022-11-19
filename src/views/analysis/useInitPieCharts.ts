/*
 * @Author: GeekQiaQia
 * @Date: 2021-12-31 14:16:33
 * @LastEditTime: 2022-11-19 23:01:40
 * @LastEditors: ChenYu
 * @Description:
 * @FilePath: \vue3_vite3_element-plus_admin\src\views\analysis\useInitPieCharts.ts
 */

import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  type TooltipComponentOption,
  LegendComponent,
  type LegendComponentOption,
} from 'echarts/components'
import { PieChart, type PieSeriesOption } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
])

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption
>

let option: EChartsOption

export const useInitPieChart = (chartDom: HTMLElement | undefined) => {
  // var chartDom = document.getElementById('main')!;
  const myChart = echarts.init(chartDom as HTMLElement)

  option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '2%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
      },
    ],
  }

  // eslint-disable-next-line no-unused-expressions
  option && myChart.setOption(option)
}

export default { useInitPieChart }
