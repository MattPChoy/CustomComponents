<template>
   <InputComponentWrapper :label="label" :show-validation="showValidation"
    > <template #input
      > <input
        type="number"
        class="input"
        v-model="model"
        @input="onChange"
        ref="numberInput"
        :disabled="disabled"
        :required="required"
        :min="min"
        :max="max"
        :step="step"
      /> </template
    > <template #validation
      > <span>{{ validationError }}</span
      > </template
    > </InputComponentWrapper
  >
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputComponentWrapper from './InputComponentWrapper.vue'

const model = defineModel({ type: Number, required: true })
const numberInput = ref<HTMLInputElement>()

const props = defineProps({
  label: { type: String },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  showValidation: { type: Boolean, default: true },
  min: { type: Number },
  max: { type: Number },
  step: { type: Number },
})

const validationError = ref('')

function onChange() {
  if (numberInput.value?.validity.valueMissing) {
    validationError.value = 'Required value missing'
    return
  }

  if (numberInput.value?.validity.rangeUnderflow) {
    validationError.value =
      props.max === undefined
        ? `Value must be larger than ${props.min}`
        : `Value must be between ${props.min} and ${props.max}`
    return
  }

  if (numberInput.value?.validity.rangeOverflow) {
    validationError.value =
      props.min === undefined
        ? `Value must be smaller than ${props.max}`
        : `Value must be between ${props.min} and ${props.max}`
    return
  }

  if (numberInput.value?.validity.badInput) {
    validationError.value = 'Invalid value'
    return
  }
}
</script>

<style scoped>
input {
  min-width: 50px;
}
</style>

