<!--
 * @Author: ChenYu
 * @Date: 2022-04-25 15:23:44
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-12-05 15:45:46
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\user-manage\detail.vue
 * @Description: 用户详情页面
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <div class="user-info-container">
    <ElCard class="print-box">
      <ElButton type="primary" :loading="printLoading" v-print="printObj">{{
        $t('userInfo.print')
      }}</ElButton>
    </ElCard>
    <ElCard>
      <div id="userInfoBox" class="user-info-box">
        <!-- 标题 -->
        <h2 class="title">{{ $t('userInfo.title') }}</h2>

        <div class="header">
          <!-- 头部渲染表格 -->
          <ElDescriptions :column="2" border>
            <ElDescriptionsItem :label="$t('userInfo.name')">{{
              detailData.username
            }}</ElDescriptionsItem>
            <ElDescriptionsItem :label="$t('userInfo.sex')">{{
              detailData.gender
            }}</ElDescriptionsItem>
            <ElDescriptionsItem :label="$t('userInfo.nation')">{{
              detailData.nationality
            }}</ElDescriptionsItem>
            <ElDescriptionsItem :label="$t('userInfo.mobile')">{{
              detailData.mobile
            }}</ElDescriptionsItem>
            <ElDescriptionsItem :label="$t('userInfo.province')">{{
              detailData.province
            }}</ElDescriptionsItem>
            <ElDescriptionsItem :label="$t('userInfo.date')">{{
              detailData.openTime
            }}</ElDescriptionsItem>
            <ElDescriptionsItem :label="$t('userInfo.remark')" :span="2">
              <ElTag
                class="remark"
                size="small"
                v-for="(item, index) in detailData.remark"
                :key="index"
                >{{ item }}</ElTag
              >
            </ElDescriptionsItem>
            <ElDescriptionsItem :label="$t('userInfo.address')" :span="2">{{
              detailData.address
            }}</ElDescriptionsItem>
          </ElDescriptions>
          <!-- 头像渲染 -->
          <ElImage
            class="avatar"
            :src="detailData.avatar"
            :preview-src-list="[detailData.avatar]"
          ></ElImage>
        </div>
        <div class="body">
          <!-- 内容渲染表格 -->
          <ElDescriptions direction="vertical" :column="1" border>
            <ElDescriptionsItem :label="$t('userInfo.experience')">
              <ul>
                <li v-for="(item, index) in detailData.experience" :key="index">
                  <span>
                    {{ item.startTime }}
                    ----
                    {{ item.endTime }}</span
                  >
                  <span>{{ item.title }}</span>
                  <span>{{ item.desc }}</span>
                </li>
              </ul>
            </ElDescriptionsItem>
            <ElDescriptionsItem :label="$t('userInfo.major')">
              {{ detailData.major }}
            </ElDescriptionsItem>
            <ElDescriptionsItem :label="$t('userInfo.glory')">
              {{ detailData.glory }}
            </ElDescriptionsItem>
          </ElDescriptions>
        </div>
        <!-- 尾部签名 -->
        <div class="foot">{{ $t('userInfo.foot') }}</div>
      </div>
    </ElCard>
  </div>
</template>

<script lang="ts" setup>
import { userDetail } from '@/api/user-manage'
import './index.scss'

interface Props {
  id: string // 路由传递过来的id,通过组件交互方式拿值
}

const props = defineProps<Props>()

const printLoading = ref(false)
const printObj = {
  // 打印区域
  id: 'userInfoBox',
  // 打印标题
  popTitle: '√',
  // 打印前
  beforeOpenCallback() {
    printLoading.value = true
  },
  // 执行打印
  openCallback() {
    printLoading.value = false
  },
}

const detailData = ref<any>({})
const getUserDetail = async () => {
  const res = await userDetail(props.id)
  if (res.code === '0') {
    detailData.value = res.data
    console.log('res===>', res)
  }
}

onMounted(() => {
  getUserDetail()
})
</script>
