<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <ElSubMenu
      v-if="subItem.children && subItem.children.length > 0"
      :index="subItem.path"
    >
      <template #title>
        <ElIcon>
          <ElIconMenu v-if="themeConfig.layout === 'columns'" />
          <component v-else :is="subItem.meta.icon"></component>
        </ElIcon>
        <span>{{ subItem.meta.title }}</span>
      </template>
      <SubMenu :menuList="subItem.children" />
    </ElSubMenu>
    <ElMenuItem v-else :index="subItem.path" @click="handleClickMenu(subItem)">
      <ElIcon>
        <ElIconMenu v-if="themeConfig.layout === 'columns'" />
        <component v-else :is="subItem.meta.icon"></component>
      </ElIcon>
      <template #title>
        <span>{{ subItem.meta.title }}</span>
      </template>
    </ElMenuItem>
  </template>
</template>

<script setup lang="ts">
import { s_globalStore } from '@/store'

defineProps<{ menuList: Menu.MenuOptions[] }>()

const globalStore = s_globalStore()
const themeConfig = computed(() => globalStore.themeConfig)

const router = useRouter()
const handleClickMenu = (subItem: Menu.MenuOptions) => {
  if (subItem.path.includes('http'))
    return window.open(subItem.meta.link, '_blank')
  router.push(subItem.path)
}
</script>
