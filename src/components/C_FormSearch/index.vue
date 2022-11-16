<!--
 * @Author: ChenYu
 * @Date: 2022-04-11 17:05:02
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-16 14:17:19
 * @FilePath: \vue3_vite3_elementPlus_admin\src\components\C_FormSearch\index.vue
 * @Description: 表单检索组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <ElCard class="el-card">
    <ElForm class="form-search" :model="formParams" ref="formRef">
      <div
        class="form-serach-item-box"
        v-for="(item, index) of disposeFormItemList"
        :key="index"
      >
        <ElFormItem
          class="form-item-input"
          v-if="item.type !== '%'"
          colon
          :label="item.label"
          :prop="item.prop"
        >
          <!-- TODO: 基本 input 检索 -->
          <ElInput
            v-if="item.type === 'input'"
            clearable
            v-model="formParams[item.prop]"
            :placeholder="item.placeholder"
            @focus="handleFocus(item.prop)"
            @blur="handleBlur"
          />
          <!-- 缓存的input检索历史信息 -->
          <div class="input-history" v-if="item.isFocus">
            <p
              @click="selectHisItem(_hisItem, item.prop)"
              v-for="_hisItem of item.hisList"
              :key="_hisItem"
            >
              {{ _hisItem }}
            </p>
          </div>

          <!-- TODO: 基本 select 检索 -->
          <ElSelect
            v-if="item.type === 'select'"
            v-model="formParams[item.prop]"
            :placeholder="item.placeholder"
            clearable
          >
            <ElOption
              v-for="item_c of item.list"
              :key="item_c"
              :value="item_c.labelDefault"
            >
              {{ item_c.labelDefault }}
            </ElOption>
          </ElSelect>

          <!-- TODO: 基本 双向时间选择器 检索  考虑到检索区域一般都是开始截止时间筛选，未配其他，需要自行扩展-->
          <ElDatePicker
            v-if="item.type === 'date-range'"
            type="datetimerange"
            v-model="formParams[item.prop]"
            format="YYYY-MM-DD HH:mm"
            value-format="YYYY-MM-DD HH:mm"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            clearable
            editable
          />
        </ElFormItem>
      </div>
      <!-- TODO: 搜索、重置、展开按钮 -->
      <ElFormItem>
        <div>
          <ElTooltip content="搜索">
            <ElButton type="primary" @click="searchFn">
              <ElIconSearch />
            </ElButton>
          </ElTooltip>
          <ElTooltip content="重置">
            <ElButton @click="cleanFn()">
              <ElIconRefresh />
            </ElButton>
          </ElTooltip>
          <ElTooltip
            v-if="formItemList.length > 4"
            :content="flag ? '收起' : '展开'"
          >
            <ElButton @click="changeFoldState">
              <span v-if="flag">
                <ElIconArrowUp />
              </span>
              <span v-else>
                <ElIconArrowDown />
              </span>
            </ElButton>
          </ElTooltip>
        </div>
      </ElFormItem>
    </ElForm>
  </ElCard>
</template>

<script lang="ts" setup>
// 处理 input 缓存历史记录
import { getItem, setItem } from '_hooks/useStorage/index'
import { d_ElMessage } from '_utils/d_tips'
import './index.scss'
import type { I_FormItem, I_Object } from './types'

export interface Props {
  formItemList: I_FormItem[]
  formParams: I_Object
  formSearchInputHistoryNum?: string
}

const props = withDefaults(defineProps<Props>(), {
  formItemList: () => [],
})

const emits = defineEmits(['e_dispatchGetDataFn', 'e_changeParms'])
// TODO: 缓存 input 框搜索内容记录

const formItemList = ref(props.formItemList)
// const formParams = ref(props.formParams)
const formParams = ref(JSON.parse(JSON.stringify(props.formParams)))

// 需要缓存的 input 框点击的时候获取焦点
const handleFocus = (itemProp: string) => {
  // 先从浏览器获取数据

  const tempFormItemList = getItem(props.formSearchInputHistoryNum!)
  formItemList.value = tempFormItemList ? tempFormItemList : formItemList.value

  // 第二步判断是否显示
  formItemList.value.forEach((item: I_FormItem) => {
    if (item.hisList && item.prop === itemProp) item.isFocus = true
    else item.isFocus = false
  })
}

// 选择一条历史记录
const selectHisItem = (value: string, itemProp: string) => {
  formParams.value[itemProp] = value
}

// 需要缓存的 input 框失去焦点处理
const handleBlur = () => {
  formItemList?.value.forEach((item: I_FormItem) => {
    setTimeout(() => {
      item.isFocus = item.isFocus ? false : undefined
    }, 200)
  })
}

// 中间存值
const saveParamsDisposeFormItemList = (_item: string) => {
  formItemList?.value.forEach((item: I_FormItem) => {
    if (item.hisList && item.prop === _item) {
      item.isFocus = true
      Object.entries(formParams.value).forEach(([key, val]) => {
        if (_item === key) {
          item?.hisList?.unshift(val as string)
          let setList = [...new Set(item.hisList)]
          item.hisList = setList.length > 4 ? setList.slice(0, 5) : setList
        }
      })
    } else {
      item.isFocus = false
    }
  })
}

//浏览器存检索值
const clickInputHistoryStorage = () => {
  //检索字段有值存中间存值
  for (let key in formParams.value) {
    if (formParams.value[key]) {
      saveParamsDisposeFormItemList(key)
    }
  }
  //检索字段恢复默认状态
  formItemList.value.forEach((item: I_FormItem) => (item.isFocus = false))
  setItem(props.formSearchInputHistoryNum!, formItemList.value)
}

// TODO: 来吧 处理搜索的逻辑
const searchFn = () => {
  const flag = Object.entries(formParams.value)
    .filter(([key]) => key !== 'pageNum' && key !== 'pageSize')
    .every(
      ([key, value]) =>
        value === undefined ||
        (key.includes('Time') && Array.isArray(value) && !value[0])
    )
  if (flag) d_ElMessage('请输入搜索内容，或选择筛选条件', 'warning')
  // TODO: 派发一个事件，父组件监听该事件调用获取数据的接口
  else {
    // 搜索执行的时候，将需要缓存 input 输入的内容进行存储
    if (props.formSearchInputHistoryNum) clickInputHistoryStorage()
    // 调用父级方法
    emits('e_dispatchGetDataFn')
  }
}

const formRef = ref()
const cleanFn = () => {
  formRef.value.resetFields()
  // 告知爸爸，你要把分页信息重置
  emits('e_changeParms')
  emits('e_dispatchGetDataFn')
}

formItemList.value.forEach((item: I_FormItem) => (item.isFocus = false))

// 展开收起 更多查询条件
const flag = ref(false)
const changeFoldState = () => {
  flag.value = !flag.value
  // 调用源数据的派生方法
  formItemList.value.forEach((ele: I_FormItem, index: number) => {
    // 第二行的时候执行取反
    if (index > 3) ele.show = !ele.show
    setItem(props.formSearchInputHistoryNum!, formItemList.value)
  })
}

// TODO: 处理 formItem
const disposeFormItemList = computed<I_FormItem[]>(() =>
  formItemList.value.filter((item: I_FormItem) => item.show !== false)
)
</script>
