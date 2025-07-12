<template>
   <input-component-wrapper
    > <template #input
      >
      <div
        v-if="draggable"
        class="file-draggable-container"
        :class="{ drag: isDragging, 'input-disabled': disabled }"
        @dragover.prevent="onDragOver"
        @dragleave="onDragLeave"
        @drop.prevent="onDrop"
        @click="onClick"
      >

        <div v-if="validationError.length !== 0" class="error"> {{ validationError }} </div>
         <slot v-else name="content"> {{ fileMessage }} </slot>
      </div>
       <input
        v-show="!draggable"
        type="file"
        @input="onFilesSelected"
        ref="fileInput"
        :multiple="multiple"
        :disabled="disabled"
      /> </template
    > </input-component-wrapper
  >
</template>

<script setup lang="ts">
import InputComponentWrapper from './InputComponentWrapper.vue'
import { computed, type PropType, ref } from 'vue'

const fileInput = ref<HTMLInputElement>()
const isDragging = ref(false)
const model = defineModel({ type: Array as PropType<Array<File>>, default: [] })
const validationError = ref('')

const props = defineProps({
  disabled: { type: Boolean, default: false },
  draggable: { type: Boolean, default: false },
  multiple: { type: Boolean, default: false },
})

const onDragOver = () => {
  isDragging.value = true
}

const onDragLeave = () => {
  isDragging.value = false
}

const emit = defineEmits({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update: (_files: File[]) => true,
})

const onDrop = (e: DragEvent) => {
  isDragging.value = false
  const files = e.dataTransfer?.files

  if (files!.length > 1 && !props.multiple) {
    validationError.value = 'Please choose only one file'
    return
  }

  const _files = Array.from(files!)
  emit('update', _files)
  model.value = Array.from(files!)
}

function onClick() {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const fileMessage = computed(() => {
  if (model.value.length === 0) {
    return props.multiple ? 'Drag files here' : 'Drag a file here'
  } else {
    return model.value.map((f) => f.name).join(', ')
  }
})

function onFilesSelected(e: Event) {
  emit('update', Array.from((e.target as HTMLInputElement).files ?? []))
}
</script>

<style scoped>
.file-draggable-container {
  border: 4px dashed var(--font-primary);
  min-height: var(--space-10);
  border-radius: var(--space-1);

  display: flex;
  align-items: center;
  justify-content: center;
}

.file-draggable-container:hover:not(input:disabled, .input-disabled), .drag {
  background-color: var(--bg-main-30);
  transition: background-color 0.3s;
}
</style>

