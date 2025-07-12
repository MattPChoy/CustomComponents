
<template>

  <div class="input-container">
     <label v-if="label" class="input-label"> {{ label }}</label
    >
    <div class="input-wrapper">
       <slot name="input" />
      <div v-if="showValidation" class="validation-container error">
         <slot name="validation" />
      </div>

    </div>

  </div>

</template>

<script setup lang="ts">
/**
 * This is meant to be an internal component that defines the basic structure of an input component.
 * This component is meant to ensure consistent styling, and that there is a single source of truth.
 */

defineProps({
  label: { type: String },
  showValidation: { type: Boolean, default: true },
})
</script>

<style>
.input-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-right: 8px;
  justify-content: center;
}

.input-label {
  width: 120px;
  text-align: left;
  font-weight: 500;
  margin-right: 0.5rem;
  padding-left: 1rem;
}

.input-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

input, textarea {
  padding: 4px;
  border: 1px solid var(--font-primary);
  border-radius: 4px;
  font-size: 0.8rem;

  background-color: var(--bg-main-10);
  color: var(--font-primary);
}

input {
  height: 24px;
}

input:focus {
  outline-style: solid;
}

input:disabled, .input-disabled{
  opacity: 0.6;
  background-color: var(--bg-main-40);
  cursor: not-allowed;
}

.validation-container {
  margin-top: 0.25rem;
  height: 1.2rem;
  font-size: 0.8rem;
  text-align: left;
}

.error {
  color: var(--error-color);
}
</style>

