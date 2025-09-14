<template>
  <CAnchoredScrollable class="modal-container">
    <template #header v-if="header">
      <h2>{{ header }}</h2>
    </template>

    <template #content>
      <div class="modal-content-container">
        <slot name="content" v-bind="props.overlay?.close"></slot>
      </div>
    </template>

    <template #footer v-if="useDefaultFooter">
      <div class="modal-button-bar">
        <CButton text="Cancel" type="Secondary" @click="onCancelClicked"/>
        <CButton text="Ok" type="Primary" @click="onOkClicked"/>
      </div>
    </template>
  </CAnchoredScrollable>
</template>

<script setup lang="ts">
import CAnchoredScrollable from "../Layout/CAnchoredScrollable.vue";
import CButton from "../Inputs/CButton.vue";
import {PropType} from "vue";
import {ModalData} from "./OverlayPlugin.ts";

const props = defineProps({
  header: {type: String, default: undefined},
  overlay: {type: Object as PropType<ModalData>, required: true},
  useDefaultFooter: {type: Boolean, default: true},
});

function onCancelClicked() {
  props.overlay?.close(true);
}

function onOkClicked() {
  props.overlay?.close(false);
}


</script>

<style scoped>
.modal-container {
  background: var(--bg-main-10);
  border-radius: var(--space-1);

  position: absolute;
}

.modal-content-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);

  margin: var(--space-2);
}

.modal-button-bar {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: var(--space-1);
}
</style>