<template>
  <nav class="w-full max-w-xxs space-y-6">
    <div class="px-6 py-12 pb-0">
      <LogoComponent />
    </div>
    <SectionComponent
      v-for="(section, sectionIdx) in navbar"
      :key="sectionIdx"
      :section="section"
    />
  </nav>
</template>

<script setup lang="ts">
import LogoComponent from './logo.vue';
import SectionComponent from './section.vue';
import type { NavbarSection } from './types';
defineOptions({ name: 'Navbar' })

const navbar = ref<NavbarSection[]>([
  {
    label: 'General',
    items: [
      {
        label: 'Overview',
        icon: 'tabler:layout-dashboard',
        path: '/'
      },
      {
        label: 'Employees',
        icon: 'tabler:users',
        path: '/employees'
      },
      {
        label: 'Time-off',
        icon: 'tabler:clock-hour-4',
        path: '/time-off'
      }
    ]
  },
  {
    label: 'Recruitement',
    items: [
      {
        label: 'Vacancies',
        icon: 'tabler:wallet',
        path: '/vacancies'
      },
      {
        label: 'Candidates',
        icon: 'tabler:users-plus',
        path: '/candidates'
      },
    ]
  },
  {
    label: 'Preferencies',
    items: [
      {
        label: 'Settings',
        icon: 'tabler:settings',
        path: '/settings'
      },
      {
        label: 'Support',
        icon: 'tabler:help-circle',
        path: '/support'
      },
    ]
  }
])
</script>
