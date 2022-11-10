<!--
 * @Author: ChenYu
 * @Date: 2022-04-27 16:09:22
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-27 17:15:41
 * @FilePath: \v3-el-components\src\views\role-list\assignPermissionsDialog.vue
 * @Description: 分配权限
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <ElDialog
    :title="$t('excel.roleDialogTitle')"
    :model-value="visible"
    @close="closed"
  >
    <ElTree
      ref="treeRef"
      :data="allPermission"
      show-checkbox
      check-strictly
      node-key="id"
      default-expand-all
      :props="defaultProps"
    />

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
import { d_ElNotiy } from '_utils/d_tips'
import { t } from '_utils/d_i18n'
import { permissionList } from '_api/permission'
import { distributePermission, rolePermission } from '_api/role'

interface Props {
  visible: boolean
  roleId: string
}

const props = defineProps<Props>()

const emits = defineEmits(['update:visible'])

// 属性结构配置
const defaultProps = {
  children: 'children',
  label: 'permissionName',
}

const onConfirm = async () => {
  const res = await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys(),
  })
  if (res.code === '0') {
    d_ElNotiy(t('role.updateRoleSuccess'))
    closed()
  }
}

const closed = () => {
  emits('update:visible', false)
}

// 所有权限
const allPermission = ref([])
const getPermissionList = async () => {
  const res = await permissionList()
  if (res.code === '0') {
    allPermission.value = res.data
  }
}

const treeRef = ref()

// 当前角色的权限
const getRolePermission = async () => {
  const res = await rolePermission(props.roleId)
  treeRef.value.setCheckedKeys(res.data)
}

onMounted(() => {
  getPermissionList()
  getRolePermission()
})
</script>
<style lang="scss" scoped></style>
