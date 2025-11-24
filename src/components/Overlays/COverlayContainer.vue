<template>
  <div class="overlay-container" v-if="overlays.length > 0" @click.self="onBackdropClick">
    <ModalWrapper
      v-bind="{ ...$props, ...overlay.props }"
      :overlay="overlay"
      v-for="overlay in overlays"
      :id="overlay.id">
      <template #content="onClose">
        <component
          :is="overlay.component"
          :onClose="onClose"
          v-bind="overlay.props" />
      </template>
    </ModalWrapper>
  </div>
</template>

<script setup lang="ts">
import { overlays } from './OverlayPlugin.ts'
import { onMounted } from 'vue'
import ModalWrapper from './ModalWrapper.vue'

// @ts-ignore: unused variable
const props = defineProps({
  header: { type: String, default: undefined },
  useDefaultFooter: { type: Boolean, default: true },
})

function onBackdropClick() {
  if (overlays.value.length === 0) return
  overlays.value.pop()
}

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    // There are no modals.
    if (overlays.value.length === 0) return
    if (e.key !== 'Escape') return

    overlays.value.pop()
  })
})
</script>

<style scoped>
.overlay-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: rgba(20, 20, 20, 0.7);
}
</style>
