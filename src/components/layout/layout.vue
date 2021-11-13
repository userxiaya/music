<template>
  <ConfigProvider :theme-vars="themeVars" class="page">
    <router-view />
  </ConfigProvider>
</template>
<script lang="ts" setup>
import { ConfigProvider } from 'vant'
import { ref } from 'vue'

const themeVars = ref({
  navBarBackgroundColor: 'transparent', // 透明
  tabsNavBackgroundColor: 'transparent',
  navBarIconColor: '#07c160',
  navBarTitleTextColor: '#07c160',
  tabActiveTextColor: '#07c160',
  tabsBottomBarColor: '#07c160',
  tabsLineHeight: '45px' // tab 默认高度
})
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
