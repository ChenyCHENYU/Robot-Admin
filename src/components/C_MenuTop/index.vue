<template>
  <div class="menu-top">
    <img
      class="img"
      src="https://cdn.jsdelivr.net/gh/chenyCHENYU/images/RobotAdmin/blue-right.png"
    />
    <h4 v-if="!isCollapse">AGILE TEAM</h4>
  </div>
</template>

<script lang="ts" setup>
import './index.scss'
defineProps<{
  isCollapse?: boolean
}>()
</script>
