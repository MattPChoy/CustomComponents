<template>
  <div class="modal-content-container">
    <DocWrapper title="Overlays">
      <template #usage>
        <c-button
          @click="onShowOverlay"
          text="Show modal"
          type="Primary"
          :disabled="false" />

        <c-text-input v-model="modalMessage" label="Modal message" />

        <p v-if="modalData">Modal said "{{ modalData }}"</p>
      </template>
    </DocWrapper>
  </div>
</template>

<script setup lang="ts">
import DocWrapper from './meta/DocWrapper.vue'
import { showModal } from '../components/Overlays/OverlayPlugin.ts'
import ExampleModal from './example/ExampleModal.vue'
import CTextInput from '../components/Inputs/CTextInput.vue'
import CButton from '../components/Inputs/CButton.vue'
import { ref } from 'vue'

const modalMessage = ref('Hello World!')
const modalData = ref()

function onShowOverlay() {
  showModal(
    ExampleModal,
    { message: modalMessage.value, depth: 0, useDefaultFooter: false },
    (_: boolean, data: string) => {
      console.log('Modal closed with result:', data)
      modalData.value = data
    }
  )
}
</script>

<style scoped></style>
