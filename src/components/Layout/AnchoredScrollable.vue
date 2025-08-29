<template>
  <div class="anchored-scrollable-container">
    <div class="anchored-scrollable-header">
      <slot name="header"></slot>
    </div>
    
    <div class="anchored-scrollable-content">
      <slot name="content">asdf</slot>
    </div>
    
    <div class="anchored-scrollable-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.anchored-scrollable-container {
  display: flex;
  flex-direction: column;
}

.anchored-scrollable-content {
  overflow-y: auto;
  flex: 1;
}
</style>