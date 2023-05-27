<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="mb-1 text-gray-9 font-medium text-sm inline-block"
    >
      {{ label }}
    </label>
    <input
      v-model="modelValue"
      :id="id"
      :placeholder="placeholder"
      type="text"
      class="
        w-full rounded px-3 py-1.5
        border border-gray-4 focus-visible:border-primary
        font-normal text-gray-8 text-sm
        placeholder:text-gray-4 placeholder:font-medium
        outline-none
        transition-colors
      "
    >
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';

export interface InputProperties {
  modelValue: string|number|null
  label?: string
  placeholder?: string
}

const props = withDefaults(defineProps<InputProperties>(), {})
const id = `rh-input-${uuidv4()}`

const emit = defineEmits(['update:modelValue'])
const modelValue = useVModel(props, 'modelValue', emit)
</script>
