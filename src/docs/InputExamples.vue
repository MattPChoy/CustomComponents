<template>
  <div class="documentation-container">

  <DocWrapper title="Text Input">
    <template #usage>
      <c-text-input v-model="firstTextInputData"
                    :validation-func="firstTextInputValidation"
                    required
                    label="Label"/>
    </template>
  </DocWrapper>

  <DocWrapper title="Text Input">
    <template #usage>
      <c-text-input v-model="secondTextInputData"
                    required multiline
                    label="Label"/>
    </template>
  </DocWrapper>
  </div>

</template>

<script setup lang="ts">

import DocWrapper from "./meta/DocWrapper.vue";
import CTextInput from "../components/Inputs/CTextInput.vue";
import {ref} from "vue";

const firstTextInputData = ref("");
const firstTextInputValidation = (input: string) => input.length !== 0 ? undefined : "Required input";
const secondTextInputData = ref("");
</script>


<style scoped>
.documentation-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);

  margin: var(--space-4);
}
</style>