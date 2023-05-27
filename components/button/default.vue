<template>
  <button
    :disabled="disabled"
    class="
      text-sm font-medium px-3 py-1.5 rounded
      border outline outline-2 outline-offset-2 outline-transparent
      flex items-center gap-x-2
      transition-colors focus-visible:outline-blue-6
    "
    :class="{
      'text-gray-8 bg-white hover:bg-gray-0 focus-visible:bg-gray-0 border-gray-3': variant === 'default',
      'text-white bg-primary hover:bg-primary/80 focus-visible:bg-primary/80 border-transparent': variant === 'filled' && color === 'teal',
      'text-white bg-red-6 hover:bg-red-7 focus-visible:bg-red-7 border-transparent': variant === 'filled' && color === 'red',
    }"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
type Variant = 'default' | 'filled'
type Color = 'red' | 'teal'

export interface ButtonProperties {
  color?: Color
  disabled?: boolean
  variant?: Variant
}

const emit = defineEmits(['click'])
defineOptions({ name: 'Button' })
withDefaults(defineProps<ButtonProperties>(), {
  color: 'teal',
  disabled: false,
  variant: 'filled',
})
</script>
