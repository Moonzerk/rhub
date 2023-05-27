<template>
  <Dialog
    :open="modelValue"
    class="relative z-50"
    @close="modelValue = false"
  >
    <Overlay />
    <DialogPanel
      class="fixed inset-y-0 p-6 w-full max-w-lg h-screen bg-white"
      :class="[ position === 'left' ? 'left-0' : 'right-0' ]"
    >
      <DialogTitle class="font-bold text-2xl text-gray-8 mb-6">{{ title }}</DialogTitle>
      <slot />
    </DialogPanel>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import Overlay from './overlay.vue';

export interface DrawerProperties {
  modelValue: boolean
  position?: 'left'|'right'
  title: string
}

defineOptions({ name: 'Drawer' })
const props = withDefaults(defineProps<DrawerProperties>(), {
  position: 'right'
})

const emit = defineEmits(['update:modelValue'])
const modelValue = useVModel(props, 'modelValue', emit)
</script>
