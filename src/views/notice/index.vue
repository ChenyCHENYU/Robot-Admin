<!--
 * @Author: 杨晨誉
 * @Date: 2022-03-10 15:29:56
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-14 09:45:31
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\notice\index.vue
 * @Description: 消息通知组件页面
 * 
-->

<template>
  <C_Notice value="12">
    <template #default>
      <C_List
        @e_clickItem="e_clickItem"
        @e_clickAction="e_clickAction"
        :LIST="LIST"
        :ACTIONS="ACTIONS"
      />
    </template>
  </C_Notice>
  <br />
</template>
<script lang="ts" setup>
import { ACTIONS, LIST } from './data'

const e_clickItem = (val: any) => console.log(val)
const e_clickAction = (val: any) => console.log(val)
</script>
