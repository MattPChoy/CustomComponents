<template>
  <div class="documentation-item-container">
    <h2> {{ title }} </h2>
    <slot name="usage"/>
    <slot name="props"/>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, required: true }
});
</script>

<style scoped>
.documentation-item-container {
  background-color: var(--bg-main-10);
  border-radius: 8px;
  padding: var(--space-2);
  min-width: 45%;
}

h2 {
  text-align: left;
  margin: 0;
}
</style>