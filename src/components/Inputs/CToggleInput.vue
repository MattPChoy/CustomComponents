<template>
  <input-component-wrapper :label="label" :show-validation="false">
    <template #input>
      <div
        class="toggle-input-container"
        @click="onToggle"
        :class="{ true: model }">
        <div class="toggle-pill" />
      </div>
    </template>
  </input-component-wrapper>
</template>

<script setup lang="ts">
import InputComponentWrapper from './InputComponentWrapper.vue'

const model = defineModel({ type: Boolean, required: true })
defineProps({
  label: { type: String },
})
function onToggle() {
  model.value = !model.value
}
</script>

<style scoped>
.toggle-input-container {
  --toggle-width: var(--space-6);
  --toggle-height: var(--space-3);
  position: relative;
  border-radius: calc(var(--toggle-height) / 2);
  height: var(--toggle-height);
  background-color: var(--bg-main-30);
  width: var(--toggle-width);
  cursor: pointer;
  transition: background-color 0.4s;

  /* To compensate for hiding the validation block, add a bit of bottom whitespace*/
  margin-bottom: var(--space-1);
}

.toggle-pill {
  --toggle-pill-size: var(--space-2-5);
  position: absolute;
  height: var(--toggle-pill-size);
  width: var(--toggle-pill-size);
  border-radius: 50%;
  background-color: var(--primary);
  top: calc((var(--toggle-height) - var(--toggle-pill-size)) / 2);
  left: calc((var(--toggle-height) - var(--toggle-pill-size)) / 2);
  transition: transform 0.4s;
}

.toggle-input-container.true {
  background-color: var(--primary);
}

.toggle-input-container.true .toggle-pill {
  background-color: white;
  transform: translateX(calc(var(--toggle-width) - var(--toggle-height)));
}
</style>
