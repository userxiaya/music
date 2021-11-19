<template>
  <Layout />
  <div class="minBar"></div>
</template>
<script lang="ts" setup>
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
.fullDom {
  width: 100%;
  height: 100%;
}
.page-loading {
  text-align: center;
  margin-top: 100px;
}
.minBar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  background: yellow;
}
</style>
