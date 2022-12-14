<template>
  <ElDrawer v-model="drawerVisible" title="布局设置" size="300px">
    <!-- 布局切换 -->
    <ElDivider class="divider" content-position="center">
      <ElIconNotification />
      布局切换
    </ElDivider>
    <div class="layout-box">
      <ElTooltip effect="dark" content="纵向" placement="top" :show-after="200">
        <div
          :class="[
            'layout-item layout-vertical',
            themeConfig.layout == 'vertical' ? 'is-active' : '',
          ]"
          @click="changeLayout('vertical')"
        >
          <div class="layout-dark"></div>
          <div class="layout-container">
            <div class="layout-light"></div>
            <div class="layout-content"></div>
          </div>
          <ElIconCircleCheckFilled v-if="themeConfig.layout == 'vertical'" />
        </div>
      </ElTooltip>
      <ElTooltip effect="dark" content="经典" placement="top" :show-after="200">
        <div
          :class="[
            'layout-item layout-classic',
            themeConfig.layout == 'classic' ? 'is-active' : '',
          ]"
          @click="changeLayout('classic')"
        >
          <div class="layout-dark"></div>
          <div class="layout-container">
            <div class="layout-light"></div>
            <div class="layout-content"></div>
          </div>
          <ElIconCircleCheckFilled v-if="themeConfig.layout == 'classic'" />
        </div>
      </ElTooltip>
      <ElTooltip effect="dark" content="横向" placement="top" :show-after="200">
        <div
          :class="[
            'layout-item layout-transverse',
            themeConfig.layout == 'transverse' ? 'is-active' : '',
          ]"
          @click="changeLayout('transverse')"
        >
          <div class="layout-dark"></div>
          <div class="layout-content"></div>
          <ElIconCircleCheckFilled v-if="themeConfig.layout == 'transverse'" />
        </div>
      </ElTooltip>
      <ElTooltip effect="dark" content="分栏" placement="top" :show-after="200">
        <div
          :class="[
            'layout-item layout-columns',
            themeConfig.layout == 'columns' ? 'is-active' : '',
          ]"
          @click="changeLayout('columns')"
        >
          <div class="layout-dark"></div>
          <div class="layout-light"></div>
          <div class="layout-content"></div>
          <ElIconCircleCheckFilled v-if="themeConfig.layout == 'columns'" />
        </div>
      </ElTooltip>
    </div>
    <br />

    <!-- 全局主题 -->
    <ElDivider class="divider" content-position="center">
      <ElIconColdDrink />
      全局主题
    </ElDivider>
    <div class="theme-item">
      <span>主题颜色</span>
      <ElColorPicker
        v-model="themeConfig.primary"
        :predefine="predefineColors"
        @change="changePrimary"
      />
    </div>
    <div class="theme-item">
      <span>暗黑模式</span>
      <C_SwitchDark />
    </div>
    <div class="theme-item">
      <span>灰色模式</span>
      <ElSwitch
        v-model="themeConfig.isGrey"
        @change="changeGreyOrWeak($event, 'grey')"
      />
    </div>
    <div class="theme-item">
      <span>色弱模式</span>
      <ElSwitch
        v-model="themeConfig.isWeak"
        @change="changeGreyOrWeak($event, 'weak')"
      />
    </div>
    <br />

    <!-- 界面设置 -->
    <el-divider class="divider" content-position="center">
      <ElIconSetting />
      界面设置
    </el-divider>

    <div class="theme-item">
      <span>面包屑</span>
      <ElSwitch v-model="themeConfig.breadcrumb" />
    </div>
    <div class="theme-item">
      <span>面包屑图标</span>
      <el-switch v-model="themeConfig.breadcrumbIcon" />
    </div>
    <div class="theme-item">
      <span>标签栏</span>
      <el-switch v-model="themeConfig.tabs" />
    </div>
    <div class="theme-item">
      <span>页脚</span>
      <el-switch v-model="themeConfig.footer" />
    </div>
  </ElDrawer>
</template>

<script setup lang="ts">
import { DEFAULT_PRIMARY } from '@/constant'
import { useTheme } from '@/hooks/useTheme'
import { s_globalStore } from '@/store'
import mittBus from '_utils/d_mittBus'
const globalStore = s_globalStore()

// 预定义色值
const predefineColors = [
  DEFAULT_PRIMARY,
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
]

const { changePrimary, changeGreyOrWeak } = useTheme()

// 切换布局方式
const changeLayout = (val: string) => {
  globalStore.setThemeConfig({ ...themeConfig.value, layout: val })
}

const themeConfig = computed(() => globalStore.themeConfig)

// 监听布局变化，在 body 上添加相对应的 layout class
watch(
  () => themeConfig.value.layout,
  () => {
    const body = document.body as HTMLElement
    body.setAttribute('class', themeConfig.value.layout)
  },
  { immediate: true }
)

// 打开主题设置
const drawerVisible = ref(false)
mittBus.on('openThemeDrawer', () => (drawerVisible.value = true))
</script>

<style scoped lang="scss">
@import './index.scss';
svg {
  vertical-align: middle;
}
</style>
