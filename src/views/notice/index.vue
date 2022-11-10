<!--
 * @Author: 杨晨誉
 * @Date: 2022-03-10 15:29:56
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-03-14 12:47:27
 * @FilePath: \v3-el-components\src\views\notice\index.vue
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
import { LIST, ACTIONS } from './data'

let e_clickItem = (val: any) => {
  console.log(val)
}
let e_clickAction = (val: any) => {
  console.log(val)
}
</script>
