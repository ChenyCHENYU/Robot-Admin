/*
 * @Author: ChenYu
 * @Date: 2022-04-27 10:13:31
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-27 11:33:26
 * @FilePath: \v3-el-components\src\views\permission-list\data.tsx
 * @Description:
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
/*
 * @Author: ChenYu
 * @Date: 2022-04-27 08:56:05
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-04-27 10:05:52
 * @FilePath: \v3-el-components\src\views\role-list\data.tsx
 * @Description:
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

import { t } from '_utils/d_i18n'

// TODO: 要渲染的列表项
export const COLUMNS = (tableData: any): I_TableColumns[] => {
  return [
    {
      type: 'index',
      label: '序号',
      width: 60,
    },
    {
      label: t('permission.name'),
      prop: 'permissionName',
    },
    {
      label: t('permission.mark'),
      prop: 'permissionMark',
    },
    {
      label: t('permission.desc'),
      prop: 'permissionDesc',
    },
  ]
}
