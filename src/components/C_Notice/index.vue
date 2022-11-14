<!--
 * @Author: 杨晨誉
 * @Date: 2022-03-10 15:28:46
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-14 09:02:59
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_Notice\index.vue
 * @Description: 消息数列通知组件
 * 
-->

<template>
  <ElPopover placement="bottom" :width="300" trigger="click">
    <!-- 在此使用插槽自定义popover里面的内容 -->
    <template #default>
      <slot></slot>
    </template>
    <template #reference>
      <ElBadge :value="value" :max="max" :isDot="false">
        <component :is="icon"></component>
      </ElBadge>
    </template>
  </ElPopover>
</template>

<script lang="ts" setup>
interface Props {
  icon?: string //显示的图标
  value?: number | string // 通知的数量
  max?: number // 通知数量最大值
  isDot?: boolean // 是否显示小圆点
}

withDefaults(defineProps<Props>(), {
  icon: 'ElIconBell',
  value: '',
  isDot: false,
})
</script>
