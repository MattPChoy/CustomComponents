<template>
  <div class="modal-content-container">
    <DocWrapper title="Text Input">
      <template #usage>
        <c-text-input
          v-model="textInputData.value"
          :validation-func="firstTextInputValidation"
          :multiline="textInputData.multiline"
          :required="textInputData.required"
          :disabled="textInputData.disabled"
          :password="textInputData.password"
          label="Text Here" />
        <div class="toggle-bar">
          <c-toggle-input v-model="textInputData.required" label="Required" />
          <c-toggle-input
            v-model="textInputData.multiline"
            label="Multi-line" />
          <c-toggle-input v-model="textInputData.disabled" label="Disabled" />
          <c-toggle-input v-model="textInputData.password" label="Password" />
        </div>
      </template>
      <template #props>
        <ul>
          <input-prop-descriptions />
          <li>
            <code>validationFunc</code>: (input: string) => string | undefined:
            Optional validation argument that can be used to run custom
            validation on the function. Shows a validation message under the
            input.
          </li>

          <li>
            <code>password</code> (boolean): Whether the input is a password
            field (i.e. censor the data)
          </li>

          <li>
            <code>multiline</code> (boolean): Whether the input should expand to
            display multiple lines at a time.
          </li>

          <li>
            <code>rows</code> (Number): If multiline, how many rows to show.
          </li>
        </ul>
      </template>
    </DocWrapper>
    <DocWrapper title="Number Input">
      <template #usage>
        <c-number-input
          v-model="numberInputModel"
          label="Numbers"
          :required="textInputData.required"
          :disabled="numberInputData.disabled"
          :min="0"
          :max="10" />
        <div class="toggle-bar">
          <c-toggle-input v-model="numberInputData.required" label="Required" />
          <c-toggle-input v-model="numberInputData.disabled" label="Disabled" />
        </div>
      </template>
      <template #props>
        <ul>
          <input-prop-descriptions />
          <li>
            <code>min</code>(Number): Minimum value of the input. If the value
            is less than this a validation message will appear.
          </li>

          <li>
            <code>max</code>(Number): Maximum value of the input. If the value
            is greater than this a validation message will appear.
          </li>

          <li><code>step</code>(Number): Discretization size for the input</li>
        </ul>
      </template>
    </DocWrapper>
    <DocWrapper title="File Input">
      <template #usage>
        <CFilePicker
          :draggable="fileData.draggable"
          :disabled="fileData.disabled"
          :multiple="fileData.multiple" 
        v-model="selectedFiles"/>
        <div class="toggle-bar">
          <c-toggle-input v-model="fileData.draggable" label="Draggable" />
          <c-toggle-input v-model="fileData.disabled" label="Disabled" />
          <c-toggle-input v-model="fileData.multiple" label="Multiple" />
        </div>
      </template>
      <template #props>
        <ul>
          <li>
            <code>required</code> (boolean): Whether the input is allowed to be
            non-empty.
          </li>

          <li>
            <code>disabled</code> (boolean): Whether the input is locked for
            input.
          </li>

          <li>
            <code>multiple</code> (boolean): Whether multiple files can be
            selected.
          </li>
        </ul>
      </template>
    </DocWrapper>
    <DocWrapper title="Dropdown">
      <template #usage>
        <CDropdown 
          label="Fruit"
          v-model="dropdownData.selected"
          :options="dropdownOptions" 
          :option-to-display-string="(o: string) => o"
          :disabled="dropdownData.disabled"/>

        <div class="toggle-bar">
          <CToggleInput v-model="dropdownData.disabled" label="Disabled"/>
        </div>

        <p v-if="dropdownData.selected">Your favourite fruit is {{ dropdownData.selected }}</p>
        <p v-else>You have no favourite fruit</p>
      </template>
    </DocWrapper>

    <DocWrapper title="Date Selector">
        <template #usage>
          <CDateSelector label="Birthday" v-model="birthday"/>
          {{birthday.toDateString()}}
        </template>
    </DocWrapper>
    <DocWrapper title="Button">
      <template #usage>
        <CButton text="Click Me" :disabled="buttonDisabled"></CButton>
        <div class="toggle-bar">
          <CToggleInput v-model="buttonDisabled" label="Disabled" />
        </div>
      </template>
    </DocWrapper>
  </div>
</template>

<script setup lang="ts">
import DocWrapper from './meta/DocWrapper.vue'
import CTextInput from '../components/Inputs/CTextInput.vue'
import { ref } from 'vue'
import CNumberInput from '../components/Inputs/CNumberInput.vue'
import InputPropDescriptions from './meta/InputPropDescriptions.vue'
import CToggleInput from '../components/Inputs/CToggleInput.vue'
import CFilePicker from '../components/Inputs/CFilePicker.vue'
import CButton from '../components/Inputs/CButton.vue'
import CDropdown from '../components/Inputs/CDropdown.vue'
import CDateSelector from '../components/Inputs/CDateSelector.vue'

class InputData {
  public required: boolean = false
  public disabled: boolean = false
  public value: string = ''
}

class TextInputData extends InputData {
  public multiline: boolean = false
  public password: boolean = false
}

class FileInputData {
  public disabled: boolean = false
  public draggable: boolean = true
  public multiple: boolean = true
  public files: File[] = []
}

const textInputData = ref(new TextInputData())
const numberInputData = ref(new InputData())
const firstTextInputValidation = (input: string) =>
  input.length !== 0 ? undefined : 'Required input'

const numberInputModel = ref(0)

const fileData = ref(new FileInputData());
const selectedFiles = ref<File[]>([]);
const buttonDisabled = ref(false)


const dropdownOptions = [
  'Apple', 'Banana', 'Cherry', 'Dragonfruit'
];
class DropdownInputData {
  public disabled: boolean = false
  public selected: string | undefined = undefined;
}
const dropdownData = ref(new DropdownInputData());

const birthday = ref(new Date());
</script>

<style scoped>
.toggle-bar {
  display: flex;
  flex-direction: row;
  column-gap: var(--space-8);
  flex-wrap: wrap;
}
</style>
