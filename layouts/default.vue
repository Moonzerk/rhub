<template>
  <div class="bg-gray-9 min-h-screen flex">
    <Navbar />
    <main class="bg-gray-0 w-full rounded-t mr-6 mt-6">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/navbar/index.vue';
</script>
