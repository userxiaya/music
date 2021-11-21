<template>
  <Layout />
  <MinBar />
</template>
<script lang="ts" setup>
import MinBar from './components/min-bar.vue'
import Layout from '@/components/layout/layout.vue'
</script>
<style lang="less">
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0px;
}
:root {
  --min-bar-height: 100px;
}
.fullDom {
  width: 100%;
  height: 100%;
}
.page-loading {
  text-align: center;
  margin-top: 100px;
}
</style>
