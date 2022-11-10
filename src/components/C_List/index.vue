<!--
 * @Author: 杨晨誉
 * @Date: 2022-03-10 17:24:18
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-03-13 00:52:13
 * @FilePath: \v3-el-components\src\components\C_List\index.vue
 * @Description: list组件
 * 
-->

<template>
  <div class="islist-tabs-item">
    <ElTabs>
      <ElTabPane v-for="(item, index) in LIST" :key="index" :label="item.title">
        <ElScrollbar max-height="300px">
          <div
            class="container"
            @click="clickItem(item1, index1)"
            v-for="(item1, index1) in item.content"
            :key="index1"
          >
            <div class="avatar" v-if="item1.avatar">
              <ElAvatar size="small" :src="item1.avatar" />
            </div>
            <div class="content">
              <div v-if="item1.title" class="title">
                <div>{{ item1.title }}</div>
                <ElTag v-if="item1.tag" size="small" :type="item1.tagType">
                  {{ item1.tag }}
                </ElTag>
              </div>
              <div class="time" v-if="item1.desc">{{ item1.desc }}</div>
              <div class="time" v-if="item1.time">{{ item1.time }}</div>
            </div>
          </div>
          <div class="actions">
            <div
              class="a-item"
              :class="{ border: i !== ACTIONS.length }"
              v-for="(item, i) in ACTIONS"
              :key="i"
              @click="clickAction(item, i)"
            >
              <div class="a-icon" v-if="item.icon">
                <component :is="item.icon"></component>
              </div>
              <div class="a-text">{{ item.text }}</div>
            </div>
          </div>
        </ElScrollbar>
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<script lang="ts" setup>
import './index.scss'
import { I_ListItem, I_ListOptions, I_ActionOptions } from '_views/notice/types'

interface Props {
  LIST: I_ListOptions[] // 列表的内容
  ACTIONS: I_ActionOptions[] // 操作的内容
}

withDefaults(defineProps<Props>(), {
  ACTIONS: () => [],
})

let emits = defineEmits(['e_clickItem', 'e_clickAction'])

let clickItem = (item: I_ListItem, index: number) => {
  emits('e_clickItem', { item, index })
}
let clickAction = (item: I_ActionOptions, index: number) => {
  emits('e_clickAction', { item, index })
}
</script>
