/*
 * @Author: ChenYu
 * @Date: 2022-03-13 00:00:53
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-12-06 12:09:28
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_NavHeader\data.ts
 * @Description: notice 页面需要的数据信息
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
export const LIST = [
  {
    title: '通知',
    content: [
      {
        title: 'LiLi 回复了你的邮件',
        time: '2022-05-08 14:33:18',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      },
      {
        title: 'Chay 邀请你参加会议',
        time: '2022-05-18 15:13:28',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      },
      {
        title: '领导已批准了你的休假申请',
        time: '2022-06-11 17:12:39',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
      },
    ],
  },
  {
    title: '关注',
    content: [
      {
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '赵成刚 评论了你',
        desc: '跟着 Cheny 有肉吃',
        time: '1小时前',
      },
      {
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '张东 评论了你',
        desc: 'Hey，Cheny，敢不敢跟我一样肝?',
        time: '3小时前',
      },
      {
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '小马哥 评论了你',
        desc: '来，喊上 Aris，我把我大腿烤了我们一起吃',
        time: '6小时前',
      },
    ],
  },
  {
    title: '待办',
    content: [
      {
        title: '杀马特',
        desc: '任务需要在 2022-12-21 20:00 前启动',
        tag: '未开始',
        tagType: '',
      },
      {
        title: 'Code Review',
        desc: '伟伟提交于 2022-12-1，需在 2022-12-10 前完成代码变更任务',
        tag: '马上到期',
        tagType: 'danger',
      },
      {
        title: '年终答辩',
        desc: '协同部门 2022-12-17 前完成答辩PPT准备',
        tag: '已耗时0天',
        tagType: 'warning',
      },
    ],
  },
]
export const ACTIONS = [
  {
    text: '清空代办',
    icon: 'ElIconDelete',
  },
  {
    text: '查看更多',
    icon: 'ElIconEdit',
  },
]
