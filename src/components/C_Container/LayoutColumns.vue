<!-- 分栏布局 -->
<template>
  <ElContainer class="layout">
    <div class="aside-split">
      <div class="logo flx-center logo-title">
        <img src="https://www.helloimg.com/images/2022/11/30/ZuLEQb.png" />
      </div>
      <ElScrollbar>
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
      </ElScrollbar>
    </div>
    <ElAside
      :class="{ 'not-aside': !subMenu.length }"
      :style="{ width: isCollapse ? '60px' : '200px' }"
    >
      <div class="logo flx-center logo-title">
        <span v-show="subMenu.length">
          {{ isCollapse ? 'R' : 'Robot Admin' }}
        </span>
      </div>
      <ElScrollbar>
        <ElMenu
          :default-active="activeMenu"
          :router="false"
          :collapse="isCollapse"
          :collapse-transition="false"
          :unique-opened="true"
          text-color="#6c3133"
        >
          <SubMenu :menuList="subMenu" />
        </ElMenu>
      </ElScrollbar>
    </ElAside>
    <ElContainer>
      <ElHeader>
        <C_NavHeader v-model:isCollapse="isCollapse" />
        <HeaderRight />
      </ElHeader>
      <C_Main />
    </ElContainer>
  </ElContainer>
</template>

<script setup lang="ts" name="layoutColumns">
import { TABS_WHITE_LIST } from '@/constant'
import { s_permissionStore } from '@/store/permission'
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
    if (TABS_WHITE_LIST.includes(route.path) || !menuList.value.length) return
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

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
  .aside-split {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 70px;
    height: 100%;
    border-right: 1px solid #ffffff;
    .logo {
      box-sizing: border-box;
      height: 55px;
      img {
        width: 32px;
        object-fit: contain;
      }
    }
    .el-scrollbar {
      height: calc(100% - 55px);
      .split-list {
        flex: 1;
        .split-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 70px;
          cursor: pointer;
          transition: all 0.3s ease;
          &:hover {
            background-color: #cce6ff;
          }
          .el-icon {
            font-size: 21px;
          }
          .title {
            margin-top: 6px;
            font-size: 12px;
            transform: scale(0.96);
          }
        }
        .split-active {
          background-color: #0c7eec !important;
          svg,
          .title {
            color: #ffffff;
          }
        }
      }
    }
  }
  .el-aside {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    background-color: #ffffff;
    border-right: 1px solid #f0eded;
    transition: all 0.3s ease;
    .el-scrollbar {
      height: calc(100% - 55px);
      .el-menu {
        height: calc(100% - 55px);
        overflow-x: hidden;
        border-right: none;
      }
    }
    .logo {
      box-sizing: border-box;
      height: 55px;
      border-bottom: 1px solid #f0eded;
      span {
        font-size: 24px;
        font-weight: bold;
        color: var(--el-menu-text-color);
        white-space: nowrap;
      }
    }
  }
  .not-aside {
    width: 0 !important;
  }
  .el-header {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
    padding: 0 15px;
    background-color: #ffffff;
    border-bottom: 1px solid #f1f1f1;
    :deep(.tool-bar-ri) {
      .toolBar-icon,
      .username {
        color: var(--el-text-color-primary);
      }
    }
  }
}

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
.el-menu-item {
  &.is-active {
    background-color: #e3f1ff;
    color: #409eff;
  }
}

.logo-title {
  line-height: 60px;
  text-align: center;
  img {
    width: 50px !important;
  }
}
</style>
