<!--
 * @Author: ChenYu
 * @Date: 2022-04-07 16:12:02
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-19 16:13:24
 * @FilePath: \v3-el-components\src\views\profile\index.vue
 * @Description: 
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <div class="my-container">
    <ElRow>
      <ElCol :span="6">
        <c_ProjectCard
          class="my-container-project-card"
          :features="_featureData"
        />
      </ElCol>
      <ElCol :span="18">
        <ElCard>
          <ElTabs v-model="activeName">
            <ElTabPane :label="$t('profile.feature')" name="feature">
              <c_Feature :features="_featureData" />
            </ElTabPane>
            <ElTabPane :label="$t('profile.author')" name="author">
              <c_Author />
            </ElTabPane>
          </ElTabs>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts" setup>
import './index.scss'
import c_Author from './components/c_Author.vue'
import c_Feature from './components/c_Feature.vue'
import c_ProjectCard from './components/c_ProjectCard.vue'
import { featureData } from './data'
const _featureData = featureData
const activeName = ref('feature')
// 如果获取的后台数据，切换语言要执行d_watchSwitchLang传递后台调用获取数据的方法
</script>
