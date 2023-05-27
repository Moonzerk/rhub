<template>
  <div class="px-2">
    <span class="px-2 font-medium text-sm text-white/50">{{ section.label }}</span>
    <ul class="space-y-1 mt-1">
      <ItemComponent
        v-for="(item, itemIdx) in section.items"
        :key="itemIdx"
        :item="item"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import ItemComponent from './item.vue';
import type { NavbarSection } from './types';

defineOptions({ name: 'NavbarSection' })
defineProps<{ section: NavbarSection }>()
</script>
