<template>
  <div class="editorWrapper">
    <div class="info">
      <ElDivider content-position="left">JSON编辑器</ElDivider>
      <span style="text-align: left">
        JSON编辑器编辑通常用于JSON格式配置文件、例如oss配置资源场景。</span
      >
    </div>
    <div>
      <ElRow>
        <ElCol :offset="1" :span="22">
          <div class="grid-content bg-purple-dark">
            <ElCard class="box-card">
              <div style="text-align: left">
                <span>JSON编辑器</span>
                <ElDivider></ElDivider>
              </div>
              <div class="form-container">
                <ElForm
                  ref="form"
                  :model="state.selectForm"
                  label-width="120px"
                >
                  <ElFormItem
                    label="主题 theme"
                    :inline="true"
                    label-position="right"
                  >
                    <ElSelect
                      v-model="state.selectForm.theme"
                      placeholder="请选择活动区域"
                    >
                      <ElOption
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></ElOption>
                    </ElSelect>
                  </ElFormItem>
                </ElForm>
              </div>
              <div class="editor-container">
                <C_CodeEditor
                  :model-value="value"
                  :theme="state.selectForm.theme"
                  @changed="handleChanged"
                  @input="handleInput"
                  @update:modelValue="handleUpdate"
                />
              </div>
            </ElCard>
          </div>
        </ElCol>
      </ElRow>
    </div>
  </div>
</template>
<script setup lang="ts" name="CodeEditor">
import './index.scss'
const jsonData =
  '[{"_id":"post 1","author":"Bob","content":"...","page_views":5},{"_id":"post 2","author":"Bob","content":"...","page_views":9},{"_id":"post 3","author":"Bob","content":"...","page_views":8},{"_id":"post 4","author":"Bob","content":"...","page_views":7}]'

const value = ref(JSON.parse(jsonData))
const options = [
  {
    value: 'shadowfox',
    label: 'shadowfox',
  },
  {
    value: 'night',
    label: 'night',
  },
  {
    value: 'rubyblue',
    label: 'rubyblue',
  },
  {
    value: 'solarized',
    label: 'solarized',
  },
  {
    value: 'material-ocean',
    label: 'material-ocean',
  },
]
const state = reactive({
  selectForm: {
    theme: 'material-ocean',
  },
})

const handleUpdate = () => {
  console.log('sss')
}
const handleInput = (ev: any) => {
  console.log('input handleInput', ev)
}
const handleChanged = (ev: any) => {
  console.log('changed handleChanged', ev)
}
</script>
