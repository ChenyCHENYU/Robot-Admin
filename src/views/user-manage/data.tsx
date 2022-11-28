/*
 * @Author: ChenYu
 * @Date: 2022-04-22 09:32:08
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-28 10:57:08
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\user-manage\data.tsx
 * @Description: 用户管理数据源
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import { deleteUser } from '@/api/user-manage'
import router from '@/router'
import { ElMessageBox } from 'element-plus'
import type { I_TableColumns } from '_c/C_Table/types'
import { d_ElMessage, d_ElNotiy } from '_utils/d_tips'

export const COLUMNS = (tableRef): I_TableColumns[] => {
  return [
    {
      type: 'index',
      label: '序号',
      width: 60,
    },
    {
      label: '姓名',
      prop: 'username',
    },
    {
      label: '联系方式',
      prop: 'mobile',
    },
    {
      label: '头像',
      render: ({ row }) => <el-avatar size={50} src={row.avatar} />,
    },

    {
      //表头
      label: '角色',
      // 字段名称
      render: ({ row }: any) => (
        <>
          {row.role?.map((item) => {
            return <el-tag>{item.title}</el-tag>
          })}
        </>
      ),
    },
    {
      //表头
      label: '开通时间',
      prop: 'openTime',
    },
    {
      label: '操作',
      render: ({ row }: any) => (
        <div>
          <el-button
            link
            size='small'
            type='primary'
            onClick={() => handleClickView(row.id)}>
            查看
          </el-button>
          <el-button
            link
            size='small'
            type='primary'
            onClick={() => onShowRoleClick(row)}>
            角色
          </el-button>
          <el-button
            link
            size='small'
            type='danger'
            onClick={() => onRemoveClick(row, tableRef)}>
            删除
          </el-button>
        </div>
      ),
    },
  ]
}

const handleClickView = (id) => {
  router.push({
    name: 'user-manage-detail',
    params: { id },
  })
}

const roleVisible = ref(false)
const selectUserId = ref()

const onShowRoleClick = (row) => {
  roleVisible.value = true
  selectUserId.value = row._id
}

const onRemoveClick = async (row, tableRef) => {
  try {
    const actionInfo = await ElMessageBox.confirm(
      '数据删除将不可恢复，请谨慎操作!',
      '警告',
      { confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning' }
    )
    if (actionInfo === 'confirm') {
      const res = await deleteUser(row.id)
      if (res.code === '0') {
        d_ElNotiy('数据已删除')
        tableRef.getDataFn(tableRef.initFormParams)
      }
    }
  } catch {
    d_ElMessage('已取消操作', 'info')
  }
}

export const useVisable = () => {
  return {
    roleVisible,
    selectUserId,
  }
}
