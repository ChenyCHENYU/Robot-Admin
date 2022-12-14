<!-- 横向布局 -->
<template>
  <el-container class="layout">
    <ElHeader>
      <C_MenuTop />
      <ElMenu
        mode="horizontal"
        :default-active="activeMenu"
        :router="false"
        :unique-opened="true"
        text-color="#6c3133"
        active-text-color="#ffffff"
      >
        <!-- 只有在这里写 submenu 才能触发 menu 三个点省略 -->
        <template v-for="subItem in menuList" :key="subItem.path">
          <ElSubMenu
            v-if="subItem.children?.length"
            :index="subItem.path"
            :key="subItem.path + 'el-sub-menu'"
          >
            <template #title>
              <C_Icon :iconName="subItem.meta.icon" outside />
              <span class="ment-title">{{ subItem.meta.title }}</span>
            </template>
            <SubMenu :menuList="subItem.children" />
          </ElSubMenu>
          <ElMenuItem
            v-else
            :index="subItem.path"
            :key="subItem.path + 'el-menu-item'"
            @click="handleClickMenu(subItem)"
          >
            <C_Icon :iconName="subItem.meta.icon" outside />
            <template #title>
              <span class="ment-title">{{ subItem.meta.title }}</span>
            </template>
          </ElMenuItem>
        </template>
      </ElMenu>
      <HeaderRight />
    </ElHeader>
    <C_Main />
  </el-container>
</template>

<script lang="ts" setup name="C_Container">
import { s_appStore } from '_store/app'
import { s_permissionStore } from '_store/permission'
import { d_watchSwitchLang, t } from '_utils/d_i18n'
import { d_isTags } from '_utils/d_tags'
import SubMenu from './SubMenu.vue'
const permissionStore = s_permissionStore()
const menuList = computed(() => permissionStore.showMenuListGet)

const router = useRouter()
const handleClickMenu = (subItem: Menu.MenuOptions) => {
  if (subItem.path.includes('http'))
    return window.open(subItem.meta.link, '_blank')
  router.push(subItem.path)
}

// TODO: 处理tagsView
const appStore = s_appStore()
const route = useRoute()
const activeMenu = computed(() => route.path)

// TODO: 生成获取 翻译中英文 title
const _getTitle = (route) => {
  let title = ''
  if (!route.meta) {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title =
      appStore.language === 'zh' ? route.meta.title : t(`route.${route.name}`)
  }
  return title
}

watch(
  route,
  (to) => {
    // 并不是所有路由都保存在 tags 中
    if (!d_isTags(to.path)) return
    const { fullPath, meta, name, params, path, query } = to
    appStore.addTagesViewList({
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: _getTitle(to),
    })
  },
  { immediate: true }
)

d_watchSwitchLang(() => {
  appStore.tagsViewList.forEach((route, index) => {
    appStore.changeTagesView({
      index,
      tag: { ...route, title: _getTitle(route) },
    })
  })
})
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
  .el-header {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
    padding: 0 15px 0 0;
    border-bottom: 1px solid #f1f1f1;

    :deep(.el-menu) {
      flex: 1;
      height: 50px;
      overflow: hidden;
      border-bottom: none;

      .is-active {
        background-color: var(--el-color-primary) !important;
        border-bottom-color: var(--el-color-primary) !important;
        .el-sub-menu__title {
          color: #ffffff !important;
          background-color: var(--el-color-primary) !important;
          border-bottom-color: var(--el-color-primary) !important;
        }
      }
    }
  }
}

.ment-title {
  margin-left: 4px;
}
</style>
