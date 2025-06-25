<template>
  <InputComponentWrapper :label="label">
    <template #input>
      <component :is="componentName"
                 type="text"
                 :value="inputValue"
                 @input="onInput"
                 class="input"
                 :disabled="disabled" :rows="rows"
      />
    </template>

    <template #validation v-if="validationError">
      {{ validationError }}
    </template>
  </InputComponentWrapper>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import InputComponentWrapper from "./InputComponentWrapper.vue";

const props = defineProps({
  modelValue: { type: String, required: true },
  label: { type: String },
  validationFunc: { type: Function },
  required: { type: Boolean, default: false },
  inline: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  multiline: { type: Boolean, default: false },
  rows: { type: Number, default: 3 },
});

const emit = defineEmits(['update:modelValue']);


const inputValue = ref<String>("");
const hadInput = ref(false);

watch(() => props.modelValue, () => {
  inputValue.value = props.modelValue;
}, { immediate: true})

const validationError = computed(() => {
  if (!hadInput.value) {
    return false;
  }
  if (props.required && inputValue.value?.length === 0) {
    return "Required input";
  }
  if (props.validationFunc) {
    return props.validationFunc(inputValue);
  }
  return false;
});

const componentName = computed(() => {
  if (props.multiline) {
    return "textarea";
  }
  return "input";
})

function onInput(event: Event) {
  hadInput.value = true;
  inputValue.value = (event.target as HTMLInputElement).value
  emit('update:modelValue', inputValue.value);
}
</script>