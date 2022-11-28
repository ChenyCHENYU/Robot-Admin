/*
 * @Author: ChenYu
 * @Date: 2022-04-27 08:56:05
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-18 08:43:27
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\role-list\data.tsx
 * @Description:
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import { t } from '_utils/d_i18n'

// TODO: 要渲染的列表项
export const COLUMNS = (
  tableData: any,
  visible: Ref<boolean>,
  selectRoleId: string
): I_TableColumns[] => {
  return [
    {
      type: 'index',
      label: '序号',
      width: 60,
    },
    {
      label: t('role.name'),
      prop: 'title',
    },
    {
      label: t('role.desc'),
      prop: 'describe',
    },
    {
      label: t('role.action'),
      render: ({ row }) => (
        <el-button
          link
          type='primary'
          onClick={() => onAssignPermissionsClick(row, visible, selectRoleId)}>
          分配权限
        </el-button>
      ),
    },
  ]
}

const onAssignPermissionsClick = (row, visible, selectRoleId) => {
  visible.value = true
  selectRoleId.value = row.id
}
