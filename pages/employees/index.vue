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
        v-else-if="!!employees"
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
import { Employee } from '@prisma/client';
import { refDebounced } from '@vueuse/core';
import { DateTime } from 'luxon';
import RHButton from '~/components/button/default.vue';
import RHDataTable, { DataTableHeader, DataTableOption } from '~/components/data-table/index.vue';
import { confirm } from "~/composables/confirm-dialog";
import { useCustomFetch } from '~/composables/fetch';
import { EmployeeWithJob } from '~/type';
import EmployeePage from './_employee.vue';

defineOptions({ name: 'EmployeesPage' })
useHead({ title: 'Employees | RHub' })

const { data: employees, pending } = useCustomFetch<EmployeeWithJob[]>('employees')
const debouncedPending = refDebounced(pending, 100)

const formatName = (e: EmployeeWithJob) => e.firstname + ' ' + e.lastname

const headers: DataTableHeader<EmployeeWithJob>[] = [
  {
    text: 'Name',
    value: formatName,
    sortable: true,
    sort: (a, b) => formatName(a).localeCompare(formatName(b))
  },
  {
    text: 'Email',
    value: 'email',
    sortable: true,
    sort: (a, b) => a.email.localeCompare(b.email)
  },
  {
    text: 'Job',
    value: (e) => e.job?.name ?? '',
    sortable: true,
    sort: (a, b) => (a.job.name ?? '').localeCompare(b.job.name ?? '')
  },
  {
    text: 'Birth date',
    value: e => DateTime.fromJSDate(e?.birth_date ?? new Date(1970, 0, 0)).toISODate(),
    sortable: true,
    sort: (a, b) => {
      const dtA = DateTime.fromJSDate(a?.birth_date ?? new Date(1970, 0, 0)).valueOf()
      const dtB = DateTime.fromJSDate(b.birth_date ?? new Date(1970, 0, 0)).valueOf()

      return dtA - dtB
    },
  },
  {
    text: 'Arrival date',
    value: (e) => DateTime.fromJSDate(e.arrival_date).toISODate(),
    sortable: true,
    sort: (a, b) => DateTime.fromJSDate(a.arrival_date).valueOf() - DateTime.fromJSDate(b.arrival_date).valueOf()
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
