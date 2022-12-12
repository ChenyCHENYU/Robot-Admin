<!-- 分栏布局 -->
<template>
  <el-container class="layout">
    <div class="aside-split">
      <div class="logo flx-center">
        <img src="https://www.helloimg.com/images/2022/11/30/ZuLEQb.png" />
      </div>
      <el-scrollbar>
        <div class="split-list">
          <div
            class="split-item"
            :class="{
              'split-active':
                splitActive == item.path ||
                `/${splitActive.split('/')[1]}` == item.path,
            }"
            v-for="item in menuList"
            :key="item.path"
            @click="changeSubMenu(item)"
          >
            <C_Icon :iconName="item.meta.icon" outside />
            <span class="title">{{ item.meta.title }}</span>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <el-aside
      :class="{ 'not-aside': !subMenu.length }"
      :style="{ width: isCollapse ? '65px' : '210px' }"
    >
      <div class="logo flx-center">
        <span v-show="subMenu.length">{{
          isCollapse ? 'R' : 'Robot Admin'
        }}</span>
      </div>
      <el-scrollbar>
        <el-menu
          :default-active="activeMenu"
          :router="false"
          :collapse="isCollapse"
          :collapse-transition="false"
          :unique-opened="true"
          background-color="pink"
          text-color="#6c3133"
          active-text-color="#ffffff"
        >
          <SubMenu :menuList="subMenu" />
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <C_NavHeader v-model:isCollapse="isCollapse" />
      </el-header>
      <ElMain>
        <C_TagsView id="guide-tags" />
        <RouterView v-slot="{ Component, route }">
          <transition name="fade-transform" mode="out-in">
            <div :key="route.path" style="height: 100%">
              <component :is="Component" />
            </div>
          </transition>
        </RouterView>
      </ElMain>
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="layoutColumns">
import { s_permissionStore } from '@/store/permission'
// import { GlobalStore } from '@/stores'
import SubMenu from './SubMenu.vue'

const route = useRoute()
const router = useRouter()
// const globalStore = GlobalStore()
const activeMenu = computed(() => route.path)
const permissionStore = s_permissionStore()
const menuList = computed(() => permissionStore.showMenuListGet)
const isCollapse = ref(true)

const subMenu = ref<Menu.MenuOptions[]>([])
const splitActive = ref<string>('')

watch(
  () => [menuList, route],
  () => {
    // 当前路由存在 tabs 白名单中 || 当前菜单没有数据直接 return
    if (
      ['/403', '/404', '/500', '/login'].includes(route.path) ||
      !menuList.value.length
    )
      return
    splitActive.value = route.path
    const menuItem = menuList.value.filter((item: Menu.MenuOptions) =>
      route.path.includes(item.path)
    )
    menuItem.forEach((item, index) => {
      if (menuItem[index].children?.length)
        return (subMenu.value = menuItem[index].children)
      subMenu.value = []
    })
  },
  {
    deep: true,
    immediate: true,
  }
)

// 切换 SubMenu
const changeSubMenu = (item: Menu.MenuOptions) => {
  splitActive.value = item.path
  if (item.children?.length) return (subMenu.value = item.children)
  subMenu.value = []
  router.push(item.path)
}
</script>

<style lang="scss">
@import './index.scss';
</style>

<style lang="scss">
.columns {
  .el-menu,
  .el-menu--popup {
    .el-menu-item {
      &.is-active {
        background: var(--el-color-primary-light-9);
        &::before {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 4px;
          content: '';
          background: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
