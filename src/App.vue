<template>
  <WebviewLayout v-if="iswebview" />
  <Layout v-else />
</template>
<script lang="ts" setup>
import { isWebView } from '@/utils/tools'
import WebviewLayout from '@/components/layout/webviewLayout.vue'
import Layout from '@/components/layout/layout.vue'
const iswebview = isWebView()
</script>
