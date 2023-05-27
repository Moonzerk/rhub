<template>
  <Dialog
    :open="modelValue"
    class="relative z-50"
    @close="modelValue = false"
  >
    <Overlay />
    <div class="fixed inset-0 grid place-items-center h-screen w-screen">
      <DialogPanel class="w-full max-w-lg bg-white rounded-lg">
        <DialogTitle class="px-8 pt-6 font-semibold text-lg text-gray-9">
          {{ title }}
        </DialogTitle>
        <DialogDescription class="px-8 pt-2 pb-4 text-gray-7 text-base">
          {{ description }}
        </DialogDescription>
        <div class="flex items-center justify-end gap-3 bg-gray-0 px-6 py-4 rounded-b-lg">
          <RHButton variant="default" @click="modelValue = false">Annuler</RHButton>
          <RHButton color="red" @click="confirm">Supprimer</RHButton>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog, DialogDescription, DialogPanel, DialogTitle } from '@headlessui/vue';
import RHButton from '~/components/button/default.vue';
import Overlay from './overlay.vue';

const htmlIdentifier = 'confirm-container';
export interface ConfirmDialogProperties {
  description: string
  title: string
}

const cancelEvent = new Event('cancel')
const confirmEvent = new Event('confirm')

defineProps<ConfirmDialogProperties>()
const modelValue = ref(true)

watch(modelValue, () => {
  if (modelValue.value) return
  document.getElementById(htmlIdentifier)?.dispatchEvent(cancelEvent)
})

const confirm = () => {
  modelValue.value = false
  document.getElementById(htmlIdentifier)?.dispatchEvent(confirmEvent)
}
</script>
