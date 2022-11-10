<!--
 * @Author: ChenYu
 * @Date: 2022-04-28 10:30:09
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-05-06 09:13:05
 * @FilePath: \v3-el-components\src\views\menu-manage\index.vue
 * @Description: 菜单管理页面
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <ElRow>
    <ElCol :span="7">
      <ElCard header="菜单资源">
        <ElTree :data="treeData" default-expand-all node-key="id">
          <template #default="scope">
            <div class="flex-box">
              <div class="custom-node">
                <C_Icon
                  v-if="scope.data.icon"
                  :iconName="scope.data.icon"
                  style="
                    display: inline-block;
                    vertical-align: bottom;
                    margin-right: 4px;
                  "
                />
                <span style="font-size: 14px"> {{ scope.node.label }}</span>
              </div>
              <div class="flex-box-action">
                <C_Icon
                  color="#409eff"
                  @click.stop="addResources('menu')"
                  iconName="DocumentAdd"
                />
                <C_Icon
                  color="#e6a23c"
                  @click.stop="editResources"
                  iconName="Edit"
                />
                <C_Icon
                  color="#f56c6c"
                  @click.stop="deleteMenu"
                  iconName="Delete"
                />
              </div>
            </div>
          </template>
        </ElTree>
      </ElCard>
    </ElCol>
    <ElCol :span="16" :push="1">
      <C_Table
        title="按钮资源"
        :columns="columns"
        :tableData="tableData"
        :page="page"
        :pageSize="pageSize"
        :total="total"
      >
        <ElButton
          class="btn-action"
          type="primary"
          @click="addResources('btn')"
        >
          新增
        </ElButton>
      </C_Table>
    </ElCol>
  </ElRow>
  <!-- TODO: 菜单弹出层 -->
  <C_FormModal
    v-model:visible="visible"
    :title="modelTitle"
    width="50%"
    :options="OPTIONS"
    isScroll
    ref="formModel"
  >
    <!-- 底部区域插槽 -->
    <template #footer="{ form }">
      <ElButton @click="cancel(form!)">取消</ElButton>
      <ElButton type="primary" @click="confirm(form!)"> 确认 </ElButton>
    </template>
  </C_FormModal>
</template>

<script lang="ts" setup>
import { treeData, COLUMNS, OPTIONS } from './data'
import { d_ElNotiy } from '_utils/d_tips'
import { I_FormInstance } from '_c/C_Form/types/types'

const tableData = ref([{}])
const columns = ref<any>([])

// 菜单资源
const visible = ref(false)
const modelTitle = ref('')

const page = ref(1)
const pageSize = ref(10)
const total = ref(0)

const formModel = ref()

const addResources = (type) => {
  console.log('type ===>', type)
  visible.value = true
  formModel.value?.c_form?.resetFields()
  modelTitle.value = type === 'menu' ? '添加菜单资源' : '添加按钮资源'
}

const editResources = (type) => {
  visible.value = true
  modelTitle.value = type === 'menu' ? '编辑菜单资源' : '编辑按钮资源'
}

const deleteMenu = () => {
  console.log('deleteMenu')
}

const confirm = (form: I_FormInstance) => {
  console.log('form ===>', form)
  const validate: any = form.validate()
  const model = (form as any).getFormData()
  console.log('model ===>', model)
  validate((valid: boolean) => {
    if (valid) {
      d_ElNotiy()
      visible.value = false
    } else {
      d_ElNotiy('请填写必填信息', 'error')
    }
  })
}
const cancel = (form: I_FormInstance) => {
  visible.value = false
}

// FIXME: 这一块后续需要调用接口完善
columns.value = COLUMNS(tableData, visible, '', editResources)
</script>
<style lang="scss">
.flex-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  &-action {
    display: flex;
    :nth-child(2) {
      margin: 0 4px;
    }
  }
}
.btn-action {
  margin-bottom: 20px;
}
</style>
