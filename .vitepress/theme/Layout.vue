<script setup lang="ts">
import { useData } from 'vitepress'

const { page } = useData()
</script>

<template>
  <div v-if="page.isNotFound" class="not-found">
    <a class="wordmark" href="/">发艺视界 <small>HAIR WORLDS</small></a>
    <p class="eyebrow">404 / A NEW DIRECTION</p>
    <h1>换个方向，<br />灵感就在下一页。</h1>
    <a class="button primary" href="/">回到首页 <span>↗</span></a>
  </div>
  <Content v-else />
</template>
