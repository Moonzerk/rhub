<template>
  <RHDrawer
    v-model="isDrawerOpen"
    :title="employee ? `${employee.firstname} ${employee.lastname}` : 'Undefined'"
  >
    <div
      v-if="employee"
      class="grid grid-cols-2 gap-x-4 gap-y-3"
    >
      <RHInput v-model="employee.firstname" label="Firstname" />
      <RHInput v-model="employee.lastname" label="Lastname" />
      <RHInput v-model="employee.email" label="Email" class="col-span-2" />
      <RHInput v-model="employee.phone" label="Phone number" />
    </div>
  </RHDrawer>
</template>

<script setup lang="ts">
import { Employee } from '@prisma/client';
import RHDrawer from '~/components/dialog/drawer.vue';
import RHInput from '~/components/input/index.vue';

defineOptions({ name: 'EmployeePage' })
const route = useRoute()

const isDrawerOpen = ref(false)
const employee = ref<Employee | null>()

// route.params.id
watch(() => route?.params?.id, () => {
  const employeeId = route?.params?.id
  console.time('doSomething')

  if (employeeId) {
    const { data : employees } = useNuxtData<Employee[]>('employees')

    if (employees.value && employees.value.length) {
      employee.value = employees.value.find((e: Employee) => e.id === employeeId)
      isDrawerOpen.value = true
    }
  }

  console.timeEnd('doSomething')
}, { immediate: true })

watch(isDrawerOpen, (v, oldV) => {
  if (v !== oldV && !v) {
    navigateTo('/employees')
  }
})
</script>
