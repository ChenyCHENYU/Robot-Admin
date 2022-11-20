<!--
 * @Author: ChenYu
 * @Date: 2022-11-20 11:10:02
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-20 11:48:56
 * @FilePath: \vue3_vite3_element-plus_admin\src\views\markdown-editor\index.vue
 * @Description: Markdonw 编辑器页面
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <div class="editorWrapper">
    <div class="info">
      <el-divider content-position="left">markdown编辑器</el-divider>
      <span style="text-align: left"
        >markdown编辑器常用于技术型文本编辑场景。</span
      >
    </div>
    <div>
      <ElRow>
        <ElCol :offset="1" :span="22">
          <div class="grid-content bg-purple-dark">
            <ElCard class="box-card">
              <div style="text-align: left">
                <span
                  >Toast UI Editor markdown编辑器
                  <ElLink
                    type="primary"
                    href="https://nhn.github.io/tui.editor/latest/tutorial-example01-editor-basic"
                    >Toast UI Editor
                  </ElLink></span
                >
                <el-divider></el-divider>
              </div>
              <C_MarkdownEditor :model-value="content" />
            </ElCard>
          </div>
        </ElCol>
      </ElRow>
    </div>
  </div>
</template>
<script setup lang="ts">
import './index.scss'
const content = '# wesome Editor! Toast UI'
</script>
