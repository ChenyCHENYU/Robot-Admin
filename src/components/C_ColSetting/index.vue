<!--
 * @Description: 列设置组件
 * @Author: ChenYu ycyplus@163.com
 * @Date: 2022-11-28 16:39:55
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-29 18:00:29
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_ColSetting\index.vue
 * Copyright (c) 2022 西安天智 AgileTeam by ChenYu email: ycyplus@163.com, All Rights Reserved.
-->
<template>
  <!-- 列设置 -->
  <ElDrawer title="列设置" v-model="drawerVisible" size="500px">
    <div class="table" ref="colTableRef">
      <ElTable
        :data="colSetting"
        :border="true"
        row-key="prop"
        default-expand-all
        :tree-props="{ children: '_children' }"
      >
        <ElTableColumn prop="label" align="center" label="列名" />
        <ElTableColumn prop="isShow" align="center" label="显示" v-slot="scope">
          <ElSwitch v-model="scope.row.isShow"></ElSwitch>
        </ElTableColumn>
        <ElTableColumn
          prop="sortable"
          align="center"
          label="排序"
          v-slot="scope"
        >
          <ElSwitch v-model="scope.row.sortable"></ElSwitch>
        </ElTableColumn>
        <template #empty>
          <div class="table-empty">
            <img src="@/assets/images/notData.png" alt="notData" />
            <div>暂无可配置列</div>
          </div>
        </template>
      </ElTable>
    </div>
  </ElDrawer>
</template>

<script setup lang="ts" name="colSetting">
import type { I_TableColumns } from '_c/C_Table/types'

defineProps<{ colSetting: I_TableColumns[] }>()

const drawerVisible = ref<boolean>(false)
// 打开列设置
const openColSetting = () => (drawerVisible.value = true)

defineExpose({ openColSetting })
</script>
