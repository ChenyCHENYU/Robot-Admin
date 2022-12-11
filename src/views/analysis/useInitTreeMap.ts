/*
 * @Author: ChenYu
 * @Date: 2022-11-19 23:57:42
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-12-11 10:55:09
 * @FilePath: \vue3_vite3_element-plus_admin\src\views\analysis\useInitTreeMap.ts
 * @Description: 旭日图和树图动态切换
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import * as echarts from 'echarts/core'
import {
  TreemapChart,
  type TreemapSeriesOption,
  SunburstChart,
  type SunburstSeriesOption,
} from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TreemapChart, SunburstChart, CanvasRenderer, UniversalTransition])

type EChartsOption = echarts.ComposeOption<
  SunburstSeriesOption | TreemapSeriesOption
>

let treemapOption: EChartsOption
let sunburstOption: EChartsOption

import data from './echarts-package-size.json'

export const useInitTreeMap = (chartDom: HTMLElement | undefined) => {
  const myChart = echarts.init(chartDom as HTMLElement)

  treemapOption = {
    series: [
      {
        type: 'treemap',
        id: 'echarts-package-size',
        animationDurationUpdate: 1000,
        roam: false,
        nodeClick: undefined,
        data: data.children,
        universalTransition: true,
        label: {
          show: true,
        },
        breadcrumb: {
          show: false,
        },
      },
    ],
  }

  sunburstOption = {
    series: [
      {
        type: 'sunburst',
        id: 'echarts-package-size',
        radius: ['20%', '90%'],
        animationDurationUpdate: 1000,
        nodeClick: undefined,
        data: data.children,
        universalTransition: true,
        itemStyle: {
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,.5)',
        },
        label: {
          show: false,
        },
      },
    ],
  }

  let currentOption = treemapOption

  myChart.setOption(currentOption)

  setInterval(function () {
    currentOption =
      currentOption === treemapOption ? sunburstOption : treemapOption
    myChart.setOption(currentOption)
  }, 3000)
}

export default { useInitTreeMap }
