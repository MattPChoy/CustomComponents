<template>
  <CAnchoredScrollable>
    <template #header>
      <h2>Header!</h2>
    </template>

    <template #content>
      <div style="display: flex; flex-direction: column; gap: var(--space-1); padding-bottom: var(--space-2);">
        <span>Some stuff inside a modal</span>
        <span>Message: {{ message }}</span>
        <span>Depth: {{ depth }}</span>

        <c-button @click="onShowOverlay" text="Show Modal"></c-button>
        
        <CTextInput v-model="data" label="Data"/>
      </div>
    </template>

    <template #footer>
      <div class="button-bar">
        <c-button text="Cancel" type="Secondary" @click="handleClose(true)" />
        <c-button text="Ok" type="Primary" @click="handleClose(false)" />
      </div>
    </template>
  </CAnchoredScrollable>
</template>

<script setup lang="ts">
import { showModal } from "../../components/Overlays/OverlayPlugin.ts";
import ExampleModal from "./ExampleModal.vue";
import {onMounted, PropType, ref} from "vue";
import CButton from "../../components/Inputs/CButton.vue";
import CAnchoredScrollable from "../../components/Layout/CAnchoredScrollable.vue";
import CTextInput from "../../components/Inputs/CTextInput.vue";

const data = ref("Yo what up");

const props = defineProps({
  message: { type: String, required: true },
  depth: { type: Number, default: 0 },
  onClose: {
    type: Function as PropType<(cancelPressed: boolean, data?: any) => void>,
    default: () => {
      console.warn("onClose callback is not defined.");
    },
  },
});

onMounted(() => {
  console.log("onClose callback:", props.onClose);
});

function handleClose(cancelPressed: boolean) {
  console.log("handleClose called with cancelPressed:", cancelPressed);
  if (props.onClose) {
    props.onClose(cancelPressed, data.value);
  } else {
    console.warn("onClose callback is not defined.");
  }
}

function onShowOverlay() {
  showModal(ExampleModal, {
    message: props.message,
    depth: props.depth + 1,
    useDefaultFooter: false
  });
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