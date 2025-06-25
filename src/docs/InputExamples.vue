<template>
  <div class="documentation-container">

    <DocWrapper title="Text Input">
      <template #usage>
        <c-text-input v-model="textInputData.value"
                      :validation-func="firstTextInputValidation" :multiline="textInputData.multiline"
                      :required="textInputData.required" :disabled="textInputData.disabled"
                      :password="textInputData.password"
                      label="Text Here"/>
        <div style="display: flex; flex-direction: row; gap: var(--space-8);">
          <c-toggle-input v-model="textInputData.required" label="Required"/>
          <c-toggle-input v-model="textInputData.multiline" label="Multi-line"/>
          <c-toggle-input v-model="textInputData.disabled" label="Disabled"/>
          <c-toggle-input v-model="textInputData.password" label="Password"/>
        </div>
      </template>

      <template #props>
        <ul>
          <input-prop-descriptions/>
          <li><code>validationFunc</code>: (input: string) => string | undefined: Optional validation argument that can
            be used to run custom validation on the function. Shows a validation message under the input.
          </li>
          <li><code>password</code> (boolean): Whether the input is a password field (i.e. censor the data)</li>
          <li><code>multiline</code> (boolean): Whether the input should expand to display multiple lines at a time.
          </li>
          <li><code>rows</code> (Number): If multiline, how many rows to show.</li>
        </ul>
      </template>
    </DocWrapper>

    <DocWrapper title="Number Input">
      <template #usage>
        <c-number-input v-model="numberInputModel" label="Numbers" :required="textInputData.required"
                        :disabled="numberInputData.disabled" :min="0" :max="10"/>
        <div style="display: flex; flex-direction: row; gap: var(--space-8);">
          <c-toggle-input v-model="numberInputData.required" label="Required"/>
          <c-toggle-input v-model="numberInputData.disabled" label="Disabled"/>
        </div>
      </template>
      <template #props>
        <ul>
          <input-prop-descriptions/>
          <li><code>min</code>(Number | undefined): Minimum value of the input. If the value is less than this a
            validation message will appear.
          </li>
          <li><code>max</code>(Number | undefined): Maximum value of the input. If the value is greater than this a
            validation message will appear.
          </li>
          <li><code>step</code>(Number | undefined): Discretization size for the input</li>
        </ul>
      </template>
    </DocWrapper>
  </div>

</template>

<script setup lang="ts">

import DocWrapper from "./meta/DocWrapper.vue";
import CTextInput from "../components/Inputs/CTextInput.vue";
import {ref} from "vue";
import CNumberInput from "../components/Inputs/CNumberInput.vue";
import InputPropDescriptions from "./meta/InputPropDescriptions.vue";
import CToggleInput from "../components/Inputs/CToggleInput.vue";

class InputData {
  public required: boolean = false;
  public disabled: boolean = false;
  public value: string = "";
}

class TextInputData extends InputData {
  public multiline: boolean = false;
  public password: boolean = false;
}

const textInputData = ref(new TextInputData());
const numberInputData = ref(new InputData());
const firstTextInputValidation = (input: string) => input.length !== 0 ? undefined : "Required input";


const numberInputModel = ref(0);
</script>


<style scoped>
.documentation-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);

  margin: var(--space-4);
}

ul {
  margin: 0;
}
</style>