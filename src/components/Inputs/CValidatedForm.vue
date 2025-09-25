<template>
  <div ref="validatedFormContainerElement">
    <slot> </slot>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

// Whether the children passed through as slots are valid or not.
const model = defineModel({ type: Boolean, default: true })
const validatedFormContainerElement = ref<HTMLElement>()
const inputElementsQuerySelector = 'input, select, textarea'

/**
 * Traverse the subtree of HTML
 * @param nodes Node to retrieve list of HTML elements from.
 */
function getInputElements(nodes: NodeList): Array<HTMLElement> {
  const inputElements: HTMLElement[] = []

  nodes.forEach((node: Node) => {
    if (!(node instanceof HTMLElement)) return

    if (node.matches(inputElementsQuerySelector)) {
      // The node itself is the input element
      return inputElements.push(node)
    }

    const htmlElements = Array.from(
      node.querySelectorAll(inputElementsQuerySelector)
    ) as HTMLElement[]
    return inputElements.push(...htmlElements)
  })

  return inputElements
}

function onMutate(mutations: MutationRecord[], _: MutationObserver) {
  let isValid = true

  for (const mut of mutations) {
    getInputElements(mut.addedNodes).forEach((e) => {
      const inputEl = e as HTMLInputElement
      if (!inputEl.checkValidity()) {
        isValid = false
      }
    })
  }

  model.value = isValid
}

onMounted(() => {
  const observer = new MutationObserver(onMutate)

  nextTick(() => {
    console.log(validatedFormContainerElement.value)
    observer.observe(validatedFormContainerElement.value!, {
      childList: true,
      subtree: true, // not just direct decendants
      attributes: true, // watch changes to attributes;
    })
  })

  onBeforeUnmount(() => observer.disconnect())
})
</script>
