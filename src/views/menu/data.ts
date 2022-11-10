/*
 * @Author: ChenYu
 * @Date: 2022-03-14 00:15:13
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-03-14 17:19:39
 * @FilePath: \v3-el-components\src\views\menu\data.ts
 * @Description: 数据层
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */

export const MENU_DATA = [
  {
    a: '导航1',
    b: '1',
    c: 'ElIconDocument',
  },
  {
    a: '导航2',
    b: '2',
    c: 'ElIconDocument',
  },
  {
    a: '导航3',
    b: '3',
    c: 'ElIconDocument',
    d: [
      {
        a: '导航3-1',
        b: '3-1',
        c: 'ElIconDocument',
        d: [
          {
            a: '导航3-1-1',
            b: '3-1-1',
            c: 'ElIconDocument',
          },
        ],
      },
    ],
  },
]
export const MENU_DATA_INIT = [
  {
    name: '导航1',
    index: '1',
    icon: 'ElIconDocument',
  },
  {
    name: '导航2',
    index: '2',
    icon: 'ElIconDocument',
  },
  {
    name: '导航3',
    index: '3',
    icon: 'ElIconDocument',
    children: [
      {
        name: '导航3-1',
        index: '3-1',
        icon: 'ElIconDocument',
        children: [
          {
            name: '导航3-1-1',
            index: '3-1-1',
            icon: 'ElIconDocument',
          },
        ],
      },
    ],
  },
]
