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
      <RHDataTable
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

const response1 = await useFetch('/api/employees', { key: 'employees' })
const employees = response1.data as unknown as Ref<Employee[]>

const response2 = await useFetch('/api/jobs');
const jobs = (response2.data as Ref<Job[]>).value?.reduce(
  (mapping, job) => ({ ...mapping, [job.id]: job.name }), {}
) as { [k: string]: string }[]

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
