<!--
 * @Author: ChenYu
 * @Date: 2022-11-21 22:52:27
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-21 23:35:22
 * @FilePath: \vue3_vite3_element-plus_admin\src\views\copy-text\index.vue
 * @Description: 复制文本组件页面
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <div class="copy-container">
    <div class="info">
      <ElDivider content-position="left">文本复制</ElDivider>
      <span style="text-align: left">
        文本复制常用于多数据拼接或者长文本内容复制场景。
      </span>
    </div>
    <div>
      <ElRow>
        <ElCol :offset="1" :span="22">
          <div class="grid-content bg-purple-dark">
            <ElCard class="box-card">
              <div style="text-align: left">
                <span>长文本内容复制场景</span>
                <ElDivider></ElDivider>
              </div>
              <div class="section">
                <ElInput
                  id="textarea"
                  v-model="inputContent"
                  style="width: 70%; margin: 0px 20px"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                />

                <ElButton
                  type="success"
                  plain
                  @click="handleCopyInput(inputContent, $event)"
                >
                  复制
                </ElButton>

                <ElButton
                  class="cut-btn"
                  type="warning"
                  plain
                  data-clipboard-action="cut"
                  data-clipboard-target="#textarea"
                >
                  剪切
                </ElButton>
              </div>
            </ElCard>
          </div>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol :offset="1" :span="22">
          <div class="grid-content bg-purple-dark">
            <ElCard class="box-card">
              <div style="text-align: left">
                <span>多数据拼接复制场景</span>
                <ElDivider></ElDivider>
              </div>
              <ElTable :data="tableData" style="width: 100%">
                <ElTableColumn label="姓名" width="180">
                  <template #default="scope">
                    <ElPopover effect="light" trigger="hover" placement="top">
                      <template #default>
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>住址: {{ scope.row.address }}</p>
                      </template>
                      <template #reference>
                        <ElInput
                          v-if="scope.row.edit"
                          v-model="scope.row.name"
                        />
                        <div v-else class="name-wrapper">
                          <ElTag>{{ scope.row.name }}</ElTag>
                        </div>
                      </template>
                    </ElPopover>
                  </template>
                </ElTableColumn>
                <ElTableColumn prop="province" label="省份" width="120">
                  <template #default="scope">
                    <ElInput
                      v-if="scope.row.edit"
                      v-model="scope.row.province"
                    />
                    <span v-else>{{ scope.row.province }}</span>
                  </template>
                </ElTableColumn>
                <ElTableColumn prop="city" label="市区" width="120">
                  <template #default="scope">
                    <ElInput v-if="scope.row.edit" v-model="scope.row.city" />
                    <span v-else>{{ scope.row.city }}</span>
                  </template>
                </ElTableColumn>
                <ElTableColumn prop="address" label="详细地址">
                  <template #default="scope">
                    <ElInput
                      v-if="scope.row.edit"
                      v-model="scope.row.address"
                    />
                    <span v-else>{{ scope.row.address }}</span>
                  </template>
                </ElTableColumn>
                <ElTableColumn label="操作" width="200">
                  <template #default="scope">
                    <ElButton
                      v-if="scope.row.edit"
                      type="success"
                      plain
                      @click="handleSave(scope.$index, scope.row)"
                    >
                      <ElIconCheck />
                      保存
                    </ElButton>

                    <ElButton
                      v-else
                      v-clip:copy="
                        `姓名:${scope.row.name},详细地址:${scope.row.address}`
                      "
                 
                      type="info"
                      plain
                    >
                      <ElIconCopyDocument />
                      复制
                    </ElButton>
                  </template>
                </ElTableColumn>
              </ElTable>
              <div style="margin: 5px">
                <ElButton @click="handleAddRecord">+ 新增记录</ElButton>
              </div>
            </ElCard>
          </div>
        </ElCol>
      </ElRow>
    </div>
  </div>
</template>
<script lang="ts">
import ClipboardJS from 'clipboard'
import { ElMessage } from 'element-plus'
import clipboard from '_utils/d_clipboard' // use clipboard directly
import clip from '@/directives/clipboard/clipboard'

export default defineComponent({
  directives: {
    clip,
  },
  setup() {
    const inputContent = ref('vue3+vite+typescirpt+ElementPlus')
    const cutClipboard = new ClipboardJS('.cut-btn')

    // clipboard's bug for event twice and cut clip
    onMounted(() => {
      if (cutClipboard) {
        cutClipboard.on('success', (e) => {
          ElMessage({
            type: 'success',
            message: '剪切成功',
          })
          e.clearSelection()
        })
      }
    })

    onUnmounted(() => {
      cutClipboard?.destroy()
    })

    const state = reactive({
      tableData: [
        {
          province: '上海市',
          city: '浦东新区',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 1518 弄',
          edit: false,
        },
        {
          province: '上海市',
          city: '浦东新区',
          name: '王小虎2',
          address: '上海市普陀区金沙江路 1517 弄',
          edit: false,
        },
        {
          province: '上海市',
          city: '浦东新区',
          name: '王小虎3',
          address: '上海市普陀区金沙江路 1519 弄',
          edit: false,
        },
        {
          province: '上海市',
          city: '浦东新区',
          name: '王小虎4',
          address: '上海市普陀区金沙江路 1516 弄',
          edit: true,
        },
      ],
    })

    const handleEdit = (index: any, row: any) => {
      // eslint-disable-next-line no-console
      console.log(index, row)
      state.tableData[index].edit = true
    }
    /**
     * @description  useXXX写法,代替mixin有待改进的地方
     * */
    const checkEmpty = (row: any) => {
      const result = Object.keys(row).some((key) => row[key] === '')
      return result
    }
    const handleSave = (index: any, row: any): boolean => {
      // eslint-disable-next-line no-console
      console.log(index, row)
      if (checkEmpty(row)) {
        ElMessage.warning('保存前请完善信息！')
        return false
      }
      // save current row data and update table data;
      state.tableData[index].edit = false
      state.tableData[index] = row
      return true
    }
    const handleDelete = (index: any, row: any) => {
      // eslint-disable-next-line no-console
      console.log(index, row)
      state.tableData.splice(index, 1)
    }
    /**
     * @description 新增一条记录
     * */
    const handleAddRecord = () => {
      state.tableData.push({
        province: '',
        city: '',
        name: '',
        address: '',
        edit: true,
      })
    }
    /**
     * @description 处理复制输入框
     */
    const handleCopyInput = (content: any, event: any) => {
      const options = {
        successTip: '复制成功',
        failedTip: '复制失败',
      }
      clipboard(content, event, options)
    }
    return {
      handleCopyInput,
      inputContent,
      handleAddRecord,
      handleEdit,
      handleSave,
      handleDelete,
      ...toRefs(state),
    }
  },
})
</script>
<style lang="scss" scoped>
.copy-container {
  color: black;
  padding: 0px 20px;
  background-color: #fafbfe;
  .info {
    text-align: left;
    padding-left: 20px;
    margin-bottom: 20px;
    font-size: 12px;
  }
  .section {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .el-row {
    margin-bottom: 20px;
  }
}
</style>
