<template>
  <NavBar>

  </NavBar>
  <InputExamples/>
  <div class="footer-container">
    Created by Matt Choy | &nbsp; <a href="http://github.com/MattPChoy/CustomCompoments">Custom Components on GitHub</a>
  </div>
</template>

<script setup lang="ts">
import InputExamples from "./docs/InputExamples.vue";
import NavBar from "./components/Layout/NavBar.vue";

</script>

<style scoped>
.footer-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-color: var(--bg-main-10);
  padding: var(--space-8) var(--space-2) var(--space-4) var(--space-2);
}
</style>
