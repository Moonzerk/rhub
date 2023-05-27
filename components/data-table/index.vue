<template>
  <table class="w-full text-sm text-gray-8">
    <thead class="border-b border-gray-2">
      <tr
        class="grid w-full"
        :class="`grid-cols-${headers.length + (options ? 1 : 0)}`"
      >
        <th
          v-for="(headerColumn, hcIdx) in headers"
          :key="hcIdx"
          class="font-semibold"
        >
          <button
            v-if="headerColumn.sortable"
            type="button"
            class="
              w-full flex items-center justify-between gap-x-2 px-4 py-2.5
              bg-transparent hover:bg-gray-1 focus-visible:bg-gray-1
              outline outline-2 outline-offset-2 outline-transparent focus-visible:outline-primary
              transition-color
            "
            @click="sortItems(hcIdx, headerColumn)"
          >
            <span>{{ headerColumn.text }}</span>
            <Icon v-if="currentColumnSorted !== hcIdx" name="tabler:arrows-sort" />
            <Icon v-else-if="currentSortOrder !== 'ASC'" name="tabler:arrow-narrow-up" />
            <Icon v-else name="tabler:arrow-narrow-down" />
          </button>
          <div
            v-else
            class="px-4 py-2.5"
          >
            {{ headerColumn.text }}
          </div>
        </th>
        <th v-if="options" class="block" />
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-2">
      <tr
        v-for="(item, itemIdx) in displayedItems"
        :key="itemIdx"
        class="grid w-full"
        :class="`grid-cols-${headers.length + (options ? 1 : 0)}`"
      >
        <td
          v-for="(headerColumn, hcIdx) in headers"
          :key="hcIdx"
          class="px-4"
          :class="[options ? 'py-3' : 'py-2.5']"
        >
          {{
            typeof headerColumn.value === 'function'
              ? headerColumn.value(item)
              : item[headerColumn.value]
          }}
        </td>
        <td
          v-if="options"
          class="flex items-center justify-end gap-x-2 px-4"
        >
          <RHActionIcon
            v-for="option in options"
            :key="option.emitName"
            :aria-label="option.emitName"
            :icon="option.icon"
            @click="$emit(option.emitName, item)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts" generic="T">
import RHActionIcon from '~/components/button/icon.vue';

export interface DataTableHeader<T> {
  text: string
  value: keyof T | ((item: T) => string|null|undefined)
  sortable?: boolean
  sort?: (a: T, b: T) => number
}

export interface DataTableProperties<T> {
  headers: DataTableHeader<T>[]
  items: T[]
  options?: DataTableOption[]
}

export interface DataTableOption {
  emitName: string
  icon: string
}

type SortOrder = 'ASC' | 'DESC' | null

defineOptions({ name: 'DataTable' })
const props = defineProps<DataTableProperties<T>>()
const currentColumnSorted = ref<number|null>(null)
const currentSortOrder = ref<SortOrder>(null)

const displayedItems = ref(props.items) as Ref<T[]>

function sortItems(columnIndex: number, columnHeader: DataTableHeader<T>) {
  if (currentColumnSorted.value === columnIndex) {
    currentSortOrder.value = currentSortOrder.value === 'ASC' ? 'DESC' : 'ASC'
  } else {
    currentSortOrder.value = 'ASC'
  }

  currentColumnSorted.value = columnIndex

  let items = [...displayedItems.value]
  items.sort(columnHeader.sort)

  if (currentSortOrder.value === 'DESC') {
    items = items.reverse()
  }

  displayedItems.value = items
}
</script>
