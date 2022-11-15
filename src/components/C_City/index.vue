<!--
 * @Author: ChenYu
 * @Date: 2022-03-18 00:57:09
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-15 23:15:09
 * @FilePath: \vue3_vite3_element-plus_admin\src\components\C_City\index.vue
 * @Description: 城市组件 - 容器组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <ElPopover
    :visible="visible"
    placement="bottom-start"
    :width="430"
    trigger="click"
  >
    <template #reference>
      <div class="result" @click="visible = !visible" ref="targetRef">
        <div>{{ result }}</div>
        <div>
          <ElIconArrowDown :class="{ rotate: visible }" />
        </div>
      </div>
    </template>
    <!-- TODO: 内容区域 -->
    <div>
      <ElRow>
        <ElCol :span="10">
          <ElRadioGroup v-model="radioVal">
            <ElRadioButton label="按城市" />
            <ElRadioButton label="按省份" />
          </ElRadioGroup>
        </ElCol>
        <ElCol :span="14">
          <C_CityFilterable
            @e_clickChangeCity="e_clickChangeCity"
            :radioVal="radioVal"
          />
        </ElCol>
      </ElRow>
      <!-- 城市 或 省城 组件 -->
      <C_CityView
        :radioVal="radioVal"
        :visible="visible"
        :result="result"
        @e_clickChangeCity="e_clickChangeCity"
      />
    </div>
  </ElPopover>
</template>

<script lang="ts" setup>
import { useOnClickOutside } from '_hooks/useOnClickOutside'
import './index.scss'

// 最终选择的结果
const result = ref('请选择')
// 控制弹出层的显示
let visible = ref(false)
// 控制模态框外部点击关闭
const targetRef = ref(null)
// 单选框的值 按城市还是省份
const radioVal = ref('按城市')

const e_clickChangeCity = (selectCityName: string) => {
  result.value = selectCityName
  visible.value = false
}

// TODO: 点击空白处关闭选择弹出层
useOnClickOutside(targetRef, visible)
</script>
