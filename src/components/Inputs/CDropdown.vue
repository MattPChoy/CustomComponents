<template>
  <InputComponentWrapper :label="label">
    <template #input> 
        <select :disabled="props.disabled" @change="onSelect">
            <option v-for="option in options" :value="option"> {{ optionToDisplayString(option) }}</option>
        </select>
    </template>
  </InputComponentWrapper>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import InputComponentWrapper from './InputComponentWrapper.vue'

const props = defineProps({
  options: { type: Array as PropType<Array<any>> },
  optionToDisplayString: {
    type: Function as PropType<(object: any) => string>,
    default: (o: any) => o.toString()
  },
  label: { type: String },
//   validationFunc: { type: Function },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const model = defineModel();

function onSelect(o: any){
    model.value = o.target.value;
}
</script>

<style scoped lang="css">
select {
    height: var(--space-4);
}
</style>
