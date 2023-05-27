<template>
  <div class="p-6">
    <header class="flex items-center justify-between">
      <h1 class="font-bold text-2xl text-gray-8">Employees</h1>
      <div class="flex items-center justify-end gap-x-3">
        <RHButton>
          <Icon name="tabler:plus" size="20" />
          Add employee
        </RHButton>
      </div>
    </header>
    <main>
      <div
        v-if="debouncedPending"
        class="h-96 text-2xl grid place-items-center text-primary"
      >
        <Icon
          name="tabler:loader-2"
          size="32"
          class="animate-spin"
        />
      </div>
      <RHDataTable
        v-else
        :headers="headers"
        :items="employees"
        :options="options"
        class="mt-6"
        @consult="(e: Employee) => navigateTo(`/employees/${e.id}`)"
        @delete="deleteEmployee"
      />
      <EmployeePage />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Employee, Job } from '@prisma/client';
import { DateTime } from 'luxon';
import RHButton from '~/components/button/default.vue';
import RHDataTable, { DataTableHeader, DataTableOption } from '~/components/data-table/index.vue';
import { confirm } from "~/composables/confirm-dialog";
import EmployeePage from './_employee.vue';

defineOptions({ name: 'EmployeesPage' })
useHead({ title: 'Employees | RHub' })

const employees = ref<Employee[]>([])
const jobs = ref<Record<number, Job>>({})

const pending = ref(false)
const debouncedPending = refDebounced(pending, 250)
loadData()

async function loadEmployees() {
  const response = await useFetch('/api/employees', { key: 'employees', server: false })
  employees.value = response.data as unknown as Employee[]
}

async function loadJobs() {
  const response = await useFetch('/api/jobs', { key: 'jobs', server: false })
  console.log(response.data.value);
  // if (Array.isArray(response.data)) {

  // }
  // jobs.value = response.data.value.reduce(
  //   (professions, job) => ({ ...professions, [job.id]: job }),
  //   {}
  // )
}

async function loadData() {
  pending.value = true
  await Promise.all([loadEmployees(), loadJobs()])
  pending.value = false
}

const formatName = (e: Employee) => e.firstname + ' ' + e.lastname

const headers: DataTableHeader<Employee>[] = [
  {
    text: 'Name',
    value: formatName,
    sortable: true,
    sort: (a: Employee, b: Employee) => formatName(a).localeCompare(formatName(b))
  },
  {
    text: 'Email',
    value: 'email',
    sortable: true,
    sort: (a: Employee, b: Employee) => a.email.localeCompare(b.email)
  },
  {
    text: 'Job',
    value: (e: Employee) => jobs[e.job] ?? '',
    sortable: true,
    sort: (a: Employee, b: Employee) => (jobs[a.job] ?? '').localeCompare(jobs[b.job] ?? '')
  },
  {
    text: 'Birth date',
    value: (e: Employee) => DateTime.fromISO(e.birth_date).toISODate(),
    sortable: true,
    sort: (a: Employee, b: Employee) => DateTime.fromISO(a.birth_date).valueOf() - DateTime.fromISO(b.birth_date).valueOf()
  },
  {
    text: 'Arrival date',
    value: (e: Employee) => DateTime.fromISO(e.arrival_date).toISODate(),
    sortable: true,
    sort: (a: Employee, b: Employee) => DateTime.fromISO(a.arrival_date).valueOf() - DateTime.fromISO(b.arrival_date).valueOf()
  }
]

const options: DataTableOption[] = [
  {
    emitName: 'consult',
    icon: 'tabler:eye',
  },
  // {
  //   emitName: 'edit',
  //   icon: 'tabler:pencil',
  // },
  {
    emitName: 'delete',
    icon: 'tabler:trash',
  }
]

async function deleteEmployee() {
  const isDeletionConfirmed = await confirm({
    title: "Supprimer l'employé",
    description: "Êtes-vous sûr de vouloir supprimer cet employé ? Cette action est irréversible."
  })

  if (!isDeletionConfirmed) {
    return
  }

  console.log('Employee deleted !!!')
}
</script>
