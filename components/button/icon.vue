<template>
  <button
    :disabled="disabled"
    :aria-label="ariaLabel"
    class="
      h-8 w-8 grid place-items-center rounded
      outline outline-2 outline-offset-2 outline-transparent transition-colors
    "
    :class="{
      'text-white bg-primary hover:bg-primary/80 focus-visible:bg-primary/80 focus-visible:outline-primary': color === 'primary',
      'bg-gray-2 text-gray-7 hover:bg-gray-3 focus-visible:bg-gray-3 focus-visible:outline-gray-7/50': !color
    }"
    @click="emit('click')"
  >
    <Icon :name="icon" />
  </button>
</template>

<script setup lang="ts">
export type Color = 'primary'
export interface ButtonProperties {
  ariaLabel?: string
  color?: Color
  disabled?: boolean
  icon: string
}

defineOptions({ name: 'ActionIcon' })
defineProps<ButtonProperties>()
const emit = defineEmits(['click'])
</script>
