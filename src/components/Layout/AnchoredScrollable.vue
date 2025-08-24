<template>
  <div class="anchored-scrollable-container">
    <div class="anchored-scrollable-header">
      <slot name="header"/>
    </div>
    
    <div class="anchored-scrollable-content">
      <slot name="content"/>
    </div>
    
    <div class="anchored-scrollable-footer">
      <slot name="footer"/>
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