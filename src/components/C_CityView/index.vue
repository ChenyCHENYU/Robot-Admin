<!--
 * @Author: ChenYu
 * @Date: 2022-03-20 14:50:50
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-03-27 23:36:21
 * @FilePath: \v3-el-components\src\components\C_CityView\index.vue
 * @Description: 城市选择视图组件, 木偶组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <div class="city">
    <div
      class="city-item"
      v-for="item of Object.keys(citysOrProvincesData)"
      :key="item"
      @click="clickLetterChangeCity(item)"
    >
      {{ item }}
    </div>
    <!-- TODO: 按城市 -->
    <!-- city.ts 中城市数据源 -->
    <ElScrollbar height="400px" v-if="radioVal === '按城市'">
      <template v-for="(value, key) of cities" :key="key">
        <ElRow :id="key">
          <ElCol :span="4"> {{ key }}： </ElCol>
          <ElCol :span="20">
            <span
              :class="
                visible && _item.name === result
                  ? 'city-item-name item-name-curr'
                  : 'city-item-name'
              "
              v-for="_item of value"
              :key="_item.id"
              @click="emits('e_clickChangeCity', _item.name)"
            >
              {{ _item.name }}
            </span>
          </ElCol>
        </ElRow>
        <div class="split" style="margin: 8px 0 12px 0" />
      </template>
    </ElScrollbar>

    <!-- TODO: 按省份 -->
    <!-- province.json 中城市数据源 -->
    <ElScrollbar height="400px" v-else>
      <template v-for="item of Object.values(provinces)" :key="item">
        <template v-for="_item of item" :key="_item.id">
          <ElRow :id="_item.id">
            <ElCol :span="4">
              <div>{{ _item.name }}：</div>
            </ElCol>
            <ElCol :span="20">
              <div>
                <span
                  :class="
                    visible && _itemName === result
                      ? 'city-item-name item-name-curr'
                      : 'city-item-name'
                  "
                  v-for="(_itemName, index) of _item.data"
                  :key="index"
                  @click="emits('e_clickChangeCity', _itemName)"
                >
                  {{ _itemName }}
                </span>
              </div>
            </ElCol>
          </ElRow>
        </template>
        <div class="split" style="margin: 8px 0 12px 0" />
      </template>
    </ElScrollbar>
  </div>
</template>

<script lang="ts" setup>
import './index.scss'
import citys from '_c/lib/city'
import province from '_c/lib/province.json'
import { reactive, computed } from 'vue'

interface Props {
  radioVal?: string
  visible?: boolean
  result?: string
}

const props = withDefaults(defineProps<Props>(), {
  radioVal: '按城市',
  visible: false,
})

const emits = defineEmits(['e_clickChangeCity'])

// 所有城市数据
const cities = reactive(citys.cities)
// 所有省份的数据
const provinces = reactive(province)

// TODO: 判断顶层到底要渲染的数据是按照城市还是按照省市
const citysOrProvincesData = computed(() => {
  if (props.radioVal === '按城市') return cities
  else return provinces
})

// TODO: 点击字母选择城市
const clickLetterChangeCity = (cityLetter: string) => {
  const el = document.getElementById(cityLetter)
  // TODO: 使用 scrollIntoView 绑定id的方式 实现锚点链接 + 动画效果
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>
