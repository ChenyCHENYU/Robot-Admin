/*
 * @Author: ChenYu
 * @Date: 2022-04-22 09:32:08
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-27 18:01:03
 * @FilePath: \v3-el-components\src\views\user-manage\data.tsx
 * @Description: 用户管理数据源
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import { deleteUser } from '@/api/user-manage'
import router from '@/router'
import { I_TableColumns } from '_c/C_Table/types'
import { d_ElNotiy, d_ElMessageBox } from '_utils/d_tips'

export const COLUMNS = ({
  getListData,
  roleDialogVisible,
  selectUserId,
}: any): I_TableColumns[] => {
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
          {row.role.map((item) => {
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
      render: ({ row, index }: any) => (
        <div>
          <el-button
            size="small"
            type="text"
            onClick={() => handleClickView(row.id)}
          >
            查看
          </el-button>
          <el-button
            size="small"
            type="text"
            onClick={() =>
              onShowRoleClick(row, roleDialogVisible, selectUserId)
            }
          >
            角色
          </el-button>
          <el-button
            size="small"
            type="text"
            onClick={() => onRemoveClick(row, getListData)}
          >
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

const onShowRoleClick = (row, roleDialogVisible, selectUserId) => {
  roleDialogVisible.value = true
  selectUserId.value = row._id
}

const onRemoveClick = (row, getListData) => {
  d_ElMessageBox(deleteUsers, { row, getListData })
  // 这里调用删除接口
}

const deleteUsers = async ({ row, getListData }) => {
  const res = await deleteUser(row.id)
  if (res.code === '0') {
    d_ElNotiy('删除成功')
  }
  console.log('res ===>', res)
  // 删除数据后重新调用获取数据的接口
  getListData()
}
