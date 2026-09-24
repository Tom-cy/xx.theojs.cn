<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { screenshotPath, screenshots } from '../screenshots'

const props = withDefaults(defineProps<{ screen?: string; priority?: boolean }>(), { screen: 'store', priority: false })
const shot = computed(() => screenshots.find((item) => item.key === props.screen) || screenshots[0])
const lightbox = ref<HTMLDialogElement>()
let opener: HTMLElement | null = null
let previousOverflow = ''
async function openImage() {
  opener = document.activeElement as HTMLElement
  previousOverflow = document.body.style.overflow
  await nextTick()
  lightbox.value?.showModal()
  document.body.style.overflow = 'hidden'
}
function restore() {
  document.body.style.overflow = previousOverflow
  opener?.focus()
}
onBeforeUnmount(() => {
  if (lightbox.value?.open) document.body.style.overflow = previousOverflow
})
</script>
<template>
  <div class="screenshot-preview">
    <button class="screenshot-trigger" :aria-label="`放大查看${shot.title}真实截图`" @click="openImage">
      <img
        :src="screenshotPath(shot.key)"
        :alt="`甲艺空间小程序实拍：${shot.title}`"
        :width="shot.width"
        :height="shot.height"
        :loading="priority ? 'eager' : 'lazy'"
        :fetchpriority="priority ? 'high' : 'auto'"
        decoding="async"
      />
      <span class="zoom-hint">点击查看大图 ↗</span>
    </button>
    <dialog
      ref="lightbox"
      class="screenshot-lightbox"
      :aria-label="`${shot.title}截图大图`"
      @close="restore"
      @click="
        (event) => {
          if (event.target === lightbox) lightbox?.close()
        }
      "
    >
      <div class="lightbox-toolbar">
        <span>{{ shot.title }} · 真实截图</span><button aria-label="关闭截图" @click="lightbox?.close()">关闭 ×</button>
      </div>
      <div class="lightbox-image">
        <img
          v-if="lightbox"
          :src="screenshotPath(shot.key)"
          :alt="`甲艺空间小程序：${shot.title}完整截图`"
          :width="shot.width"
          :height="shot.height"
          loading="lazy"
        />
      </div>
    </dialog>
  </div>
</template>
