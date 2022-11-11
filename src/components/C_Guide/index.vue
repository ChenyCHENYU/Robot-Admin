<!--
 * @Author: ChenYu
 * @Date: 2022-04-15 23:53:58
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-11 14:16:11
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_Guide\index.vue
 * @Description: 引导组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <ElTooltip :content="$t('navBar.guide')">
    <IconGuide v-pointer @click="onClick" />
  </ElTooltip>
</template>

<script lang="ts" setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { useI18n } from 'vue-i18n'
import steps from './steps'

const i18n = useI18n()

let driver
onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    // closeBtnText: '关闭'
    closeBtnText: i18n.t('guide.close'),
    nextBtnText: i18n.t('guide.next'),
    prevBtnText: i18n.t('guide.prev'),
  })
})

const onClick = () => {
  driver.defineSteps(steps(i18n))
  driver.start()
}
</script>
