<template>
  <div style="display: flex; flex-direction: column; gap: var(--space-1);">
    <span>Some stuff inside a modal</span>
    <span>Message: {{ message }}</span>
    <span>Depth: {{ depth }}</span>

    <button @click="onShowOverlay">Show Modal</button>
  </div>

</template>

<script setup lang="ts">
import {showModal} from "../../components/Overlays/OverlayPlugin.ts";
import ExampleModal from "./ExampleModal.vue";
import {PropType} from "vue";

const props = defineProps({
  message: {type: String, required: true},
  depth: {type: Number, default: 0},
  onClose: {
    type: Function as PropType<(cancelPressed: boolean) => void>,
    default: () => {}
  }
})



function onShowOverlay() {
  showModal(ExampleModal, {message: props.message, depth: props.depth + 1})
}
</script>

<style scoped>

</style>