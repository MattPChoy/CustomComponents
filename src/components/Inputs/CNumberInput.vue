<template>
  <InputComponentWrapper :label="label">
    <template #input>
      <input type="number" class="input" v-model="model" @input="onChange" ref="numberInput"
             :disabled="disabled" :required="true"/>
    </template>

    <template #validation>
      <span>{{ validationError }}</span>
    </template>
  </InputComponentWrapper>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import InputComponentWrapper from "./InputComponentWrapper.vue";

const model = defineModel({ type: Number, required: true })
const numberInput = ref<HTMLInputElement>();

defineProps({
  label: {type: String},
  required: {type: Boolean, default: false},
  disabled: {type: Boolean, default: false},
});

const validationError = ref("");

function onChange() {
  console.log(numberInput.value?.validity);
  if (numberInput.value?.validity.valueMissing) {
    validationError.value="Required value missing"
    return;
  }

  if (numberInput.value?.validity.badInput) {
    validationError.value="Invalid value"
    return;
  }
}
</script>


<style scoped>

input {
  min-width: 50px;
}
</style>
