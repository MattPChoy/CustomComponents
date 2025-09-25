<template>
  <button :disabled="disabled" @click="onClick" :class="buttonClass">
    {{ text }}
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'

const props = defineProps({
  text: { type: String, required: false },
  disabled: { type: Boolean, default: false },
  type: {
    type: String as PropType<'Primary' | 'Secondary' | 'Outlined'>,
    default: 'Primary',
  },
})

const buttonClass = computed(() => {
  return props.type.toLowerCase()
})

const emit = defineEmits({
  click: (_: MouseEvent) => true,
})

const onClick = (e: MouseEvent) => emit('click', e)
</script>

<style scoped lang="css">
button {
  height: var(--space-4);
  border-radius: var(--space-1);
  cursor: pointer;
  min-width: 50px;
}

button.primary {
  background-color: var(--primary);
  border: 1px solid var(--bg-main-20);
  color: var(--bg-main-20);

  &:hover {
    background-color: var(--primary-10);
    color: var(--bg-main-10);
  }

  &:disabled {
    background-color: var(--primary-30);
    color: var(--bg-main-30);
  }
}

button.secondary {
  border: 1px solid var(--bg-main-20);
  background-color: var(--bg-main-30);
}
</style>
