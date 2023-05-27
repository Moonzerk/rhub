<template>
  <li class="mx-auto">
    <NuxtLink
      :to="item.path"
      class="navbar-link"
      active-class="navbar-link-active"
    >
      <div class="navbar-link-icon">
        <Icon :name="item.icon" color="currentcolor" />
      </div>
      <span class="navbar-link-label">
        {{ item.label }}
      </span>
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import type { NavbarItem } from './types';

defineOptions({ name: 'NavbarItem' })
defineProps<{ item: NavbarItem }>()
</script>

<style>
.navbar-link {
  @apply flex items-center justify-start gap-x-2 p-2 rounded;
  @apply outline outline-2 outline-offset-2 outline-transparent;
}

.navbar-link:focus-visible {
  @apply outline-primary;
}

.navbar-link.navbar-link-active,
.navbar-link:hover,
.navbar-link:focus-visible {
  @apply bg-gray-8;
}

.navbar-link-icon {
  @apply grid place-items-center text-primary bg-primary/25 h-5 w-5 rounded;
}

.navbar-link.navbar-link-active .navbar-link-icon,
.navbar-link:hover .navbar-link-icon,
.navbar-link:focus-visible .navbar-link-icon {
  @apply bg-primary/50 text-white/75;
}

.navbar-link-label {
  @apply text-white/75 text-sm
}

.navbar-link.navbar-link-active .navbar-link-label,
.navbar-link:hover .navbar-link-label,
.navbar-link:focus-visible .navbar-link-label {
  @apply text-white;
}
</style>
