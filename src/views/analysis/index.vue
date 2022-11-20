<template>
  <div class="analysis-info">
    <ElRow style="margin: 15px">
      <ElCol :span="24" class="page-title-box">
        <h4 class="page-title">Dashboard</h4>
        <div class="page-title-right">
          <div style="margin-right: 10px">
            <ElDatePicker v-model="pickDate" type="date" placeholder="选择日期">
            </ElDatePicker>
          </div>
          <ElButton
            :icon="Refresh"
            circle
            type="primary"
            style="maring-left: 10px"
          ></ElButton>
          <ElButton :icon="Search" circle type="primary"></ElButton>
        </div>
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :xl="10">
        <ElRow>
          <ElCol :lg="12">
            <ElCard shadow="hover" class="card">
              <div class="card-header">
                <h5 class="text-muted">Customers</h5>
                <i class="widget-icon"><ShoppingCartFull /></i>
              </div>
              <div class="card-middle margin-top-2 margin-bottom-2">
                <h3>37,258</h3>
              </div>
              <div class="card-footer text-muted">
                <Top />
                <span class="text-success margin-right-1"> 6.28% </span>
                <span class="text-nowrap">since last week </span>
              </div>
            </ElCard>
          </ElCol>
          <ElCol :lg="12">
            <ElCard shadow="hover" class="card">
              <div class="card-header">
                <h5 class="text-muted">Orders</h5>
                <i class="widget-icon"><GoodsFilled /></i>
              </div>
              <div class="card-middle margin-top-2 margin-bottom-2">
                <h3>3,258</h3>
              </div>
              <div class="card-footer text-muted">
                <Top />
                <span class="text-danger margin-right-1"> 2.28% </span>
                <span class="text-nowrap">since last week </span>
              </div>
            </ElCard>
          </ElCol>
        </ElRow>
        <ElRow>
          <ElCol :lg="12">
            <ElCard shadow="hover" class="card">
              <div class="card-header">
                <h5 class="text-muted">Revenue</h5>

                <i class="widget-icon"><Coin /></i>
              </div>
              <div class="card-middle margin-top-2 margin-bottom-2">
                <h3>￥3,258</h3>
              </div>
              <div class="card-footer text-muted">
                <Top />
                <span class="text-danger margin-right-1"> 3.28% </span>
                <span class="text-nowrap">since last week </span>
              </div>
            </ElCard>
          </ElCol>
          <ElCol :lg="12">
            <ElCard shadow="hover" class="card">
              <div class="card-header">
                <h5 class="text-muted">Growth</h5>
                <i class="widget-icon"><DataLine /></i>
              </div>
              <div class="card-middle margin-top-2 margin-bottom-2">
                <h3>+ 20.48%</h3>
              </div>
              <div class="card-footer text-muted">
                <Top />
                <span class="text-success margin-right-1"> 5.28% </span>
                <span class="text-nowrap">since last week </span>
              </div>
            </ElCard>
          </ElCol>
        </ElRow>
      </ElCol>
      <ElCol :xl="14">
        <ElCard shadow="hover" class="card">
          <div class="header-title">
            <h4 class="text-muted">products</h4>
            <div class="dropdown"><MoreFilled /></div>
          </div>
          <div style="height: 268px" class="e-chart">
            <div ref="refProduct" style="width: inherit; height: inherit"></div>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="16">
        <ElCard shadow="hover" class="card">
          <div class="header-title">
            <h4 class="text-muted">Revene</h4>
            <div class="dropdown"><MoreFilled /></div>
          </div>
          <div class="chart-bg padding-top-1 padding-bottom-1">
            <ElRow>
              <ElCol :md="12">
                <p class="text-muted text-muted-flag">current week</p>
                <h2 class="font-nomal text-center">
                  <small class="text-primary dot bg-primary"></small>
                  <span>￥23.976</span>
                </h2>
              </ElCol>
              <ElCol :md="12">
                <p class="text-muted text-muted-flag">previous week</p>
                <h2 class="font-nomal text-center">
                  <small class="text-primary dot bg-green"></small>
                  <span>￥23.976</span>
                </h2>
              </ElCol>
            </ElRow>
          </div>
          <div class="e-chart" style="height: 364px">
            <div
              ref="refLineChart"
              style="width: inherit; height: inherit"
            ></div>
          </div>
        </ElCard>
      </ElCol>
      <ElCol :span="8">
        <ElCard shadow="hover" class="card">
          <div class="header-title">
            <h4 class="text-muted">Revene by Location</h4>
            <div class="dropdown"><MoreFilled /></div>
          </div>

          <div class="margin-top-2 margin-bottom-2">
            <div class="e-chart" style="height: 364px">
              <div
                ref="refTreeMap"
                style="width: inherit; height: inherit"
              ></div>
            </div>
            <h5 class="font-nomal margin-bottom- text-left">New York</h5>
            <ElProgress class="margin-bottom-pro" :percentage="88">
              <span>88k</span>
            </ElProgress>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :xl="12">
        <ElCard shadow="hover" class="card">
          <div class="header-title" style="margin-bottom: 32px">
            <h4 class="text-muted">TOP SELLING PRODUCTS</h4>
            <div class="btn-link">
              <span style="margin-right: 5px; display: inline-block"
                >Export</span
              ><i class="el-icon-download"></i>
            </div>
          </div>
          <ElTable
            id="tableId"
            ref="tableRef"
            :data="state.tableData"
            highlight-current-row
            style="width: 100%"
          >
            <ElTableColumn
              v-for="item in tableColumn"
              :key="item.prop"
              :fixed="item.fixed"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
            >
            </ElTableColumn>
          </ElTable>
        </ElCard>
      </ElCol>
      <ElCol :xl="6">
        <ElCard shadow="hover" class="card">
          <div class="header-title">
            <h4 class="text-muted">TOTAL SALES</h4>
            <div class="dropdown"><MoreFilled /></div>
          </div>
          <div class="e-chart" style="height: 201px; width: 100%">
            <!-- <div class="chartjs-size-monitor" style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;">
              </div> -->
            <div
              ref="refAverageSales"
              style="width: inherit; height: inherit"
            ></div>
          </div>
          <div class="chart-widget-list">
            <p>
              <span><i class="icon-square yellow"></i> Union Ads </span
              ><span>￥26000</span>
            </p>
            <p>
              <span><i class="icon-square green"></i> Direct </span
              ><span>￥26000</span>
            </p>
            <p>
              <span><i class="icon-square deep-blue"></i> Search Engine</span>
              <span>￥26000</span>
            </p>
            <p>
              <span><i class="icon-square red"></i> Video Ads </span
              ><span>￥26000</span>
            </p>
          </div>
        </ElCard></ElCol
      >
      <ElCol :xl="6">
        <ElCard shadow="hover" class="card bg-primary">
          <div class="header-title">
            <h4 style="color: #98a6ad">AVERAGE SALE SIZE</h4>
            <div class="dropdown">
              <MoreFilled />
            </div>
          </div>
          <div
            style="
              background: #46a0fc;
              text-align: center;
              padding: 4px 0 20px 0;
            "
          >
            <div class="text-badge">
              <span class="badge badge-danger">-23.47%</span>
            </div>
            <h3 class="font-nomal text-white">￥156.37</h3>
            <p class="text-light font-13">Per sale</p>
            <ElButton type="primary" plain
              >more <i class="el-icon-arrow-right el-icon--right"></i
            ></ElButton>
          </div>
        </ElCard>
        <ElCard shadow="hover" class="card">
          <div class="header-title">
            <h4 class="text-muted">RECENT ACTIVITY</h4>
            <div class="dropdown"><MoreFilled /></div>
          </div>
          <div style="height: 128px; overflow: scroll; padding: 5px">
            <ElTimeline>
              <ElTimelineItem
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.timestamp"
              >
                {{ activity.content }}
              </ElTimelineItem>
            </ElTimeline>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>
<script setup lang="ts">
import {
  Top,
  MoreFilled,
  ShoppingCartFull,
  Refresh,
  Search,
  GoodsFilled,
  Coin,
  DataLine,
} from '@element-plus/icons-vue'

import type XLSX from 'xlsx'
import { useInitChart } from './useInitEcharts'
import { useInitLineChart } from './useInitLineCharts'
import { useInitPieChart } from './useInitPieCharts'
import { useInitTreeMap } from './useInitTreeMap'

interface stateTypes {
  tableData: {
    date: string
    name: string
    province: string
    city: string
    address: string
    zip: number
  }[]
  form: {
    fileName: string
    fileType: XLSX.BookType
  }
}

const pickDate = ref('')
const refProduct = ref<HTMLElement | undefined>()
const refLineChart = ref<HTMLElement | undefined>()
const refAverageSales = ref<HTMLElement | undefined>()
const refTreeMap = ref<HTMLElement | undefined>()
const state = reactive<stateTypes>({
  tableData: [
    {
      date: '2016-05-02',
      name: 'cheny',
      province: '西安',
      city: '未央区',
      address: '西安市未央区太华南路888号',
      zip: 710000,
    },
    {
      date: '2016-05-02',
      name: 'cheny',
      province: '西安',
      city: '未央区',
      address: '西安市未央区太华南路888号',
      zip: 710000,
    },
    {
      date: '2016-05-02',
      name: 'cheny',
      province: '西安',
      city: '未央区',
      address: '西安市未央区太华南路888号',
      zip: 710000,
    },
    {
      date: '2016-05-02',
      name: 'cheny',
      province: '西安',
      city: '未央区',
      address: '西安市未央区太华南路888号',
      zip: 710000,
    },
    {
      date: '2016-05-04',
      name: 'cheny',
      province: '西安',
      city: '未央区',
      address: '西安市未央区太华南路888号',
      zip: 710000,
    },
    {
      date: '2016-05-01',
      name: 'cheny',
      province: '西安',
      city: '未央区',
      address: '西安市未央区太华南路888号',
      zip: 710000,
    },
    {
      date: '2016-05-03',
      name: 'cheny',
      province: '西安',
      city: '未央区',
      address: '西安市未央区太华南路888号',
      zip: 710000,
    },
  ],
  form: {
    fileName: 'exportExcel',
    fileType: 'xlsx',
  },
})
const activities = [
  {
    content: '支持使用图标',
    timestamp: '2018-04-12 20:46',
    size: 'large',
    type: 'primary',
    icon: 'el-icon-more',
  },
  {
    content: '支持自定义颜色',
    timestamp: '2018-04-03 20:46',
    color: '#0bbd87',
  },
  {
    content: '支持自定义尺寸',
    timestamp: '2018-04-03 20:46',
    size: 'large',
  },
  {
    content: '默认样式的节点',
    timestamp: '2018-04-03 20:46',
  },
]
const tableColumn = [
  {
    prop: 'date',
    fixed: true,
    width: '150',
    label: '日期',
  },
  {
    prop: 'name',
    fixed: false,
    width: '120',
    label: '姓名',
  },
  {
    prop: 'province',
    fixed: false,
    width: '120',
    label: '省份',
  },
  {
    prop: 'city',
    fixed: false,
    width: '120',
    label: '市区',
  },
  {
    prop: 'address',
    fixed: false,
    width: '400',
    label: '地址',
  },
  {
    prop: 'zip',
    fixed: false,
    width: '120',
    label: '邮编',
  },
]

const tableRef = ref()

onMounted(() => {
  useInitChart(refProduct.value)
  useInitLineChart(refLineChart.value)
  useInitPieChart(refAverageSales.value)
  useInitTreeMap(refTreeMap.value)
})
</script>
<style lang="scss">
.analysis-info {
  color: black;
  padding: 0px 20px;
  background-color: #fafbfe;
  .page-title-box {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #6c757d;
    .page-title {
      font-size: 18px;
      margin: 0;
      line-height: 85px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: inherit;
      font-weight: 700;
    }
    .page-title-right {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
    }
  }
  :deep(.ElCard) {
    margin-bottom: 30px;
    margin-right: 20px;
  }
  :deep(.ElCard.bg-primary) {
    background-color: #46a0fc;
  }
  :deep(.text-white.el-icon-more) {
    color: white;
  }
  .card {
    margin: 6px 6px;
    .padding-top-1 {
      padding-top: 10px;
    }
    .padding-bottom-1 {
      padding-bottom: 10px;
    }
    .margin-bottom-pro {
      margin-bottom: 15px;
    }
    .margin-right-1 {
      vertical-align: top;
      margin-right: 10px;
    }
    .margin-top-2 {
      margin-top: 20px;
    }
    .margin-bottom-1 {
      margin-bottom: 10px;
    }
    .margin-bottom-2 {
      margin-bottom: 20px;
    }
    .font-nomal {
      font-weight: 400;
    }
    .icon {
      width: 14px;
      height: 14px;
      display: inline-block;
      border-radius: 50%;
    }
    .text-muted {
      color: #98a6ad;
    }
    .text-muted-flag {
      margin-left: 40%;
    }
    .text-left {
      text-align: left;
    }
    .text-nowrap {
      white-space: nowrap;
    }
    .text-success {
      color: #0acf97;
    }
    .text-danger {
      color: #fa5c7c;
    }
    .text-primary {
      color: #409eff;
    }
    .text-light {
      color: #e3eaef;
    }
    .text-white {
      color: white;
    }
    .text-center {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .text-badge {
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .font-13 {
      font-size: 13px;
    }
    .badge {
      display: inline-block;
      padding: 0.25em 0.4em;
      font-size: 75%;
      font-weight: 700;
      line-height: 1;
      text-align: center;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: 0.25rem;
      -webkit-transition: color 0.15s ease-in-out,
        background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
        -webkit-box-shadow 0.15s ease-in-out;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
        -webkit-box-shadow 0.15s ease-in-out;
    }
    .badge-danger {
      color: #fff;
      background-color: #fa5c7c;
    }
    .btn-link {
      font-weight: 400;
      color: #409eff;
      text-decoration: none;
      cursor: pointer;
    }
    .bg-primary {
      background-color: #409eff;
    }
    .bg-green {
      background-color: green;
    }
    .icon-square {
      width: 12px;
      height: 12px;
      display: inline-block;
    }
    .red {
      background-color: #ec6769;
    }
    .green {
      background-color: #93cb79;
    }
    .yellow {
      background-color: #f9c761;
    }
    .deep-blue {
      background-color: #5572c3;
    }
    .dot {
      width: 12px;
      height: 12px;
      display: inline-block;
      border-radius: 50%;
    }
    .chart-widget-list p {
      border-bottom: 1px solid #f1f3fa;
      margin-bottom: 0.5rem;
      padding-bottom: 0.5rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .header-title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
      .dropdown {
        cursor: pointer;
      }
    }
    .chart-bg {
      background-color: #f9f9fd;
    }
    .card-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      .widget-icon {
        color: #248fed;
        font-size: 20px;
        background-color: #7fbdf33b;
        height: 40px;
        width: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 3px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .icon {
          width: 20px;
          height: 20px;
        }
      }
    }
    .card-middle {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      color: #6c757d;
    }
    .card-footer {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }
    .e-chart {
      margin: auto;
      position: relative;
      width: 100%;
    }
  }
}
</style>
