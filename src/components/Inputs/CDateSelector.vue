<template>
    <InputComponentWrapper :label="label">
        <template #input>
          <input type="date" :value="dateString" @input="updateDate($event)"/>
        </template>
    </InputComponentWrapper>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import InputComponentWrapper from './InputComponentWrapper.vue';

const props = defineProps({
  label: {type: String},
  disabled: {type: Boolean, default: false},
  modelValue: {type: Date, required: true}
});

const emit = defineEmits(['update:modelValue']);

const dateString = computed(() => {
  return props.modelValue.toISOString().split('T')[0];
});

function updateDate(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', new Date(target.value));
}
</script>

<style>
</style>