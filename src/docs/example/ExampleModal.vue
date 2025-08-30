<template>
  <AnchoredScrollable>
    <template #header>
      <h2>Header!</h2>
    </template>

    <template #content>
      <div style="display: flex; flex-direction: column; gap: var(--space-1); padding-bottom: var(--space-2);">
        <span>Some stuff inside a modal</span>
        <span>Message: {{ message }}</span>
        <span>Depth: {{ depth }}</span>

        <c-button @click="onShowOverlay" text="Show Modal"></c-button>
      </div>
    </template>

    <template #footer>
      <div class="button-bar">
        <c-button text="Cancel" type="Secondary" @click="onClose(true)"/>
        <c-button text="Ok" type="Primary" @click="onClose(false)"/>
      </div>
    </template> 
  </AnchoredScrollable>
</template>

<script setup lang="ts">
import {showModal} from "../../components/Overlays/OverlayPlugin.ts";
import ExampleModal from "./ExampleModal.vue";
import {onMounted, PropType} from "vue";
import CButton from "../../components/Inputs/CButton.vue";
import AnchoredScrollable from "../../components/Layout/AnchoredScrollable.vue";

const props = defineProps({
  message: {type: String, required: true},
  depth: {type: Number, default: 0},
  onClose: {
    type: Function as PropType<(cancelPressed: boolean) => void>,
    default: () => {}
  }
});

onMounted(() => {
  console.log(props.onClose);
})

function onShowOverlay() {
  showModal(ExampleModal, {message: props.message, depth: props.depth + 1, useDefaultFooter:false})
}
</script>

<style scoped>
h2 {
  margin: 0;
}


.button-bar {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-1);
}
</style>