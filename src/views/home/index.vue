<!--
 * @Author: ChenYu
 * @Date: 2022-03-04 00:28:53
 * @LastEditors: Cheny ycyplus@gmail.com
 * @LastEditTime: 2022-12-14 09:01:16
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\home\index.vue
 * @Description: 
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <div class="home-container">
    <ElRow style="margin: 15px">
      <ElCol :span="24" class="page-title-box">
        <h4 class="page-title">Data Analysis</h4>
        <div class="page-title-right">
          <div style="margin-right: 10px">
            <ElDatePicker v-model="pickDate" type="date" placeholder="选择日期">
            </ElDatePicker>
          </div>
        </div>
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :md="12" :xl="6">
        <ElCard shadow="hover" class="card">
          <ElRow>
            <ElCol :span="12" style="text-align: left">
              <h5 class="text-muted">Visit</h5>
              <h3 class="margin-top-1 margin-bottom-1">6,168</h3>
              <p class="text-muted">
                <ElIconTop />
                <span class="text-success margin-right-1"> 3.66% </span>
              </p>
            </ElCol>
            <ElCol :span="12" class="flex flex-column flex-end">
              <div class="e-chart" style="height: 70px; width: 100%">
                <div
                  ref="Refcampagin"
                  style="width: inherit; height: inherit; min-height: 70px"
                ></div>
              </div>
            </ElCol>
          </ElRow>
        </ElCard>
      </ElCol>
      <ElCol :md="12" :xl="6">
        <ElCard shadow="hover" class="card">
          <ElRow>
            <ElCol :span="12" style="text-align: left">
              <h5 class="text-muted">new Leads</h5>
              <h3 class="margin-top-1 margin-bottom-1">6,168</h3>
              <p class="text-muted">
                <ElIconTop />
                <span class="text-success margin-right-1"> 4.66% </span>
              </p>
            </ElCol>
            <ElCol :span="12" class="flex flex-column flex-end">
              <div class="e-chart" style="height: 70px; width: 100%">
                <div
                  ref="RefLeads"
                  style="width: inherit; height: inherit; min-height: 70px"
                ></div>
              </div>
            </ElCol>
          </ElRow>
        </ElCard>
      </ElCol>

      <ElCol :md="12" :xl="6"
        ><ElCard shadow="hover" class="card">
          <ElRow>
            <ElCol :span="12" style="text-align: left">
              <h5 class="text-muted">Deals</h5>
              <h3 class="margin-top-1 margin-bottom-1">6,168</h3>
              <p class="text-muted">
                <ElIconTop />
                <span class="text-danger margin-right-1"> 2.66% </span>
              </p>
            </ElCol>
            <ElCol :span="12" class="flex flex-column flex-end">
              <div class="e-chart" style="height: 70px; width: 100%">
                <div
                  ref="RefDeals"
                  style="width: inherit; height: inherit; min-height: 70px"
                ></div>
              </div>
            </ElCol>
          </ElRow>
        </ElCard>
      </ElCol>

      <ElCol :md="12" :xl="6"
        ><ElCard shadow="hover" class="card">
          <ElRow>
            <ElCol :span="12" style="text-align: left">
              <h5 class="text-muted">Booked Revenue</h5>
              <h3 class="margin-top-1 margin-bottom-1">6,168</h3>
              <p class="text-muted">
                <ElIconTop />
                <span class="text-success margin-right-1"> 5.66% </span>
              </p>
            </ElCol>
            <ElCol :span="12" class="flex flex-column flex-end">
              <div class="e-chart" style="height: 70px; width: 100%">
                <div
                  ref="RefRevenue"
                  style="width: inherit; height: inherit; min-height: 70px"
                ></div>
              </div>
            </ElCol>
          </ElRow> </ElCard
      ></ElCol>
    </ElRow>
    <ElRow justify="center">
      <ElCol :xl="10">
        <ElCard shadow="hover" class="card">
          <div class="header-title">
            <h4 class="text-muted">CAMPAIGNS</h4>
            <div class="dropdown"><ElIconMoreFilled /></div>
          </div>
          <div class="e-chart" style="height: 320px; width: 100%">
            <div
              ref="RefPolorChart"
              style="width: inherit; height: inherit"
            ></div>
          </div>
          <ElRow>
            <ElCol :md="8">
              <div class="icon-container">
                <i class="widget-icon bg-light-lighten rounded-circle">
                  <ElIconPosition :size="20" />
                </i>
              </div>
              <div style="margin-left: 40%">
                <h3 class="font-nomal margin-top-2 margin-bottom-1">1620</h3>
                <p class="text-muted"><i class="icon total"></i> Total</p>
              </div>
            </ElCol>
            <ElCol :md="8">
              <div class="icon-container">
                <i class="widget-icon bg-light-lighten rounded-circle">
                  <ElIconFlag />
                </i>
              </div>
              <div style="margin-left: 40%">
                <h3 class="font-nomal margin-top-2 margin-bottom-1">3216</h3>
                <p class="text-muted"><i class="icon reached"></i> Reached</p>
              </div>
            </ElCol>
            <ElCol :md="8">
              <div class="icon-container">
                <i class="widget-icon bg-light-lighten rounded-circle">
                  <ElIconFolderOpened />
                </i>
              </div>
              <div style="margin-left: 40%">
                <h3 class="font-nomal margin-top-2 margin-bottom-1">6329</h3>
                <p class="text-muted"><i class="icon open"></i> Open</p>
              </div>
            </ElCol>
          </ElRow>
        </ElCard>
      </ElCol>
      <ElCol :xl="14">
        <ElCard shadow="hover" class="card">
          <div class="header-title">
            <h4 class="text-muted">Revene</h4>
            <div class="dropdown"><ElIconMoreFilled /></div>
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
          <div class="e-chart" style="height: 361px">
            <div
              ref="RefLineChart"
              style="width: inherit; height: inherit"
            ></div>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>
<script lang="ts" setup>
import { useInitBarChart } from './useInitBarChart'
import { useInitGridChart } from './useInitLineChart'
import { useInitPolorChart } from './useInitPolorChart'

const RefDeals = ref()
const RefRevenue = ref()
const Refcampagin = ref()
const RefLeads = ref()
const RefPolorChart = ref()
const RefLineChart = ref()
const pickDate = ref('')

onMounted(() => {
  useInitBarChart(Refcampagin.value)
  useInitBarChart(RefLeads.value)
  useInitBarChart(RefRevenue.value)
  useInitBarChart(RefDeals.value)
  useInitPolorChart(RefPolorChart.value)
  useInitGridChart(RefLineChart.value)
})
</script>

<style scoped lang="scss">
.home-container {
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
  :deep(.el-card) {
    margin-bottom: 30px;
    margin-right: 20px;
  }
  :deep(.el-card.bg-primary) {
    background-color: #46a0fc;
  }
  :deep(.text-white.el-icon-more) {
    color: white;
  }
  .flex {
    display: flex;
  }
  .flex-row {
    flex-direction: row;
  }
  .flex-column {
    flex-direction: column;
  }
  .flex-end {
    justify-content: flex-end;
  }
  .card {
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
    .margin-top-1 {
      margin-top: 10px;
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
    .icon {
      width: 14px;
      height: 14px;
      display: inline-block;
      border-radius: 50%;
    }
    .total {
      background-color: #5572c3;
    }
    .reached {
      background-color: #93cb79;
    }
    .open {
      background-color: #f9c761;
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
    }
    .rounded-circle {
      border-radius: 50% !important;
    }
    .bg-light-lighten {
      background-color: rgba(227, 234, 239, 0.25) !important;
    }
    .icon-container {
      display: flex;
      justify-content: center;
    }
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
