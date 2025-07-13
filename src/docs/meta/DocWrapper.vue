<template>
  <div class="documentation-item-container">
    <h2>{{ title }}</h2>
    <slot name="description" />
    <div><slot name="usage" /></div>
    <b v-if="hasPropsSection">Props</b>
    <div><slot name="props" /></div>
    <b v-if="hasSlotsSection">Slots</b>
    <div><slot name="slots" /></div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

defineProps({
  title: { type: String, required: true },
})

const slots = useSlots()
const hasPropsSection = computed(() => !!slots.props)
const hasSlotsSection = computed(() => !!slots.slots)
</script>

<style scoped>
.documentation-item-container {
  background-color: var(--bg-main-10);
  border-radius: 8px;
  padding: var(--space-2);
  min-width: 45%;

  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

h2 {
  text-align: left;
  margin: 0;
}
</style>
