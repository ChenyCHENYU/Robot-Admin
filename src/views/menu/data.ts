/*
 * @Author: ChenYu
 * @Date: 2022-03-14 00:15:13
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-14 11:12:29
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\menu\data.ts
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
