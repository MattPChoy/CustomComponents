<template>
   <button :disabled="disabled" @click="onClick"> {{ text }}</button>
</template>

<script setup lang="ts">
defineProps({
  text: { type: String, required: true },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits({
  onClick: (_: MouseEvent) => true,
})

const onClick = (e: MouseEvent) => emit('onClick', e)
</script>

<style scoped lang="css">
button {
    height: var(--space-4);
    color: var(--bg-main-20);
    background-color: var(--primary);
    border: 1px solid var(--bg-main-20);
    border-radius: var(--space-1);
    cursor: pointer;
}

button:hover, button:disabled {
    background-color: var(--primary-20);
    color: var(--bg-main-30);
}
</style>

