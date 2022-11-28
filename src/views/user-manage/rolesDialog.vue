<!--
 * @Author: ChenYu
 * @Date: 2022-04-27 11:44:23
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-28 09:56:03
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\user-manage\rolesDialog.vue
 * @Description: 角色选择
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <ElDialog
    :title="$t('excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <ElCheckboxGroup v-model="userRoleTitleList">
      <ElCheckbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      >
      </ElCheckbox>
    </ElCheckboxGroup>

    <template #footer>
      <span class="dialog-footer">
        <ElButton @click="closed">
          {{ $t('universal.cancel') }}
        </ElButton>
        <ElButton type="primary" @click="onConfirm">
          {{ $t('universal.confirm') }}
        </ElButton>
      </span>
    </template>
  </ElDialog>
</template>

<script lang="ts" setup>
import { roleList } from '_api/role'
import { updateRole, userRoles } from '_api/user-manage'
import { t } from '_utils/d_i18n'
import { d_ElNotiy } from '_utils/d_tips'

interface Props {
  modelValue: boolean
  userId: string
}

const props = defineProps<Props>()

console.log('props =>', props.userId)

const emits = defineEmits(['update:modelValue', 'e_updateRole'])

const onConfirm = async () => {
  const roles = userRoleTitleList.value.map((title) => {
    return allRoleList.value.find((role) => role.title === title)
  })
  const res = await updateRole(props.userId, roles)
  if (res.code === '0') {
    d_ElNotiy(t('role.updateRoleSuccess'))
    emits('e_updateRole')
    closed()
  }
}

const closed = () => {
  emits('update:modelValue', false)
}

// 所有角色
const allRoleList = ref<any>([])
// 获取所有角色数据的方法
const getListData = async () => {
  const res = await roleList()
  console.log('res ===>', res)
  if (res.code === '0') {
    allRoleList.value = res.data
  }
}

// 当前用户角色
const userRoleTitleList = ref([])
// 获取当前用户角色
const getUserRoles = async () => {
  const res = await userRoles(props.userId)
  userRoleTitleList.value = res.data.role.map((item) => item.title)
}

onMounted(() => {
  getListData()
  getUserRoles()
})
</script>
<style lang="scss" scoped></style>
