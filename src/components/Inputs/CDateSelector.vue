<template>
    <InputComponentWrapper :label="label">
        <template #input>
            <input type="date" v-model="model"/>
        </template>
    </InputComponentWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputComponentWrapper from './InputComponentWrapper.vue';

defineProps({
    label: { type: String },
    disabled: { type: Boolean, default: false }
});

const model = ref<Date>(new Date());
</script>

<style>
</style>