<!--
 * @Author: ChenYu
 * @Date: 2022-04-22 11:51:36
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-23 20:12:21
 * @FilePath: \vue3_vite3_elementPlus_admin\src\views\import\index.vue
 * @Description: 导入页面
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <C_UploadExcel :onSuccess="onSuccess" />
</template>

<script lang="ts" setup>
import { t } from '_utils/d_i18n'
import { d_ElMessage } from '_utils/d_tips'
const router = useRouter()

const onSuccess = async ({ header, results }) => {
  console.log('header ==>', header)
  // console.log('excelData', excelData)
  const updateData = generateData(results)
  // 下面调用上传的API接口方法
  // await userBatchImport(updateData)
  d_ElMessage(results.length + t('excel.importSuccess'))
  router.push('/user-manage')
}

// 筛选数据
const generateData = (results) => {
  const arr: any[] = []
  results.forEach((item) => {
    const userInfo = {}
    Object.keys(item).forEach((key) => {
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}

const USER_RELATIONS = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'role',
  开通时间: 'openTime',
}
</script>
<style lang="scss" scoped></style>
