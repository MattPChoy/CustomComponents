<template>
  <div class="table-container">
    <div class="table-header-container">
      <div class="button-bar-container">
        <slot name="button-bar">
          <slot name="button-bar-left" class="button-bar-left">
            <div></div>
          </slot>
          <slot name="button-bar-right" class="button-bar-right"></slot>
        </slot>
      </div>

      <div class="search-container" v-if="options.useSearch">
        <div />

        <div class="flex-row gap-x-1">
          <font-awesome-icon icon="fas fa-search" />
          <c-text-input
            v-model="searchString"
            :show-validation="false"
            @update:modelValue="resetTableData" />
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th
              v-for="column in tableColumns"
              :key="column.key"
              @click="() => onColumnClicked(column.key)">
              {{ column.displayName }}
              <font-awesome-icon
                :icon="sortIcon"
                :class="{ hidden: sortColumn !== column.key }" />
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="loading && usePagination">
            <td :colspan="tableColumns.length">
              <span><font-awesome-icon icon="fas fa-spinner" spin /></span>
            </td>
          </tr>

          <tr v-for="row in rowsToDisplay" :key="keySelector(row)">
            <td v-for="col in tableColumns" :key="col.key">
              <slot :name="'col_' + col.key" :row="row">
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>

          <tr v-if="filteredRows.length === 0 && !loading">
            <td :colspan="tableColumns.length">
              <span>No records found</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="page-selector-container" v-if="numPages >= 1">
        <div
          class="page-selector-item"
          v-for="i in numPages"
          :key="i"
          @click="() => setPage(i - 1)"
          :class="{ 'current-page': i - 1 === currentPage }">
          {{ i }}
        </div>

        <div
          v-if="usePagination && !loadedAllPaginatedEntries && numPages > 0"
          class="page-selector-item"
          @click="onClickNext">
          Next
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { computed, onMounted, ref, watch } from 'vue'
import type { PaginationParams, TableOptions } from './Table/TableOptions'
import CTextInput from '../Inputs/CTextInput.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { SortDirection } from '../../models/SortDirection'

const props = defineProps<{
  rows: T[] | ((params: PaginationParams) => Promise<T[]>)
  options: TableOptions<T>
}>()

const paginatedRows = ref<T[]>([])
const currentPage = ref(0)
const searchString = ref('')
const loading = ref(false)
const loadedAllPaginatedEntries = ref(false)

const usePagination = computed(() => typeof props.rows === 'function')
const options = props.options
const keySelector = options.keySelector

const tableColumns = computed(() => {
  const sourceRows = usePagination.value
    ? paginatedRows.value
    : (props.rows as T[])
  if (sourceRows.length === 0) return []
  const keys = Object.keys(sourceRows[0])

  return keys
    .sort((a, b) => {
      const columnsKeys = Object.keys(options.columns || {})
      const aInColumns = columnsKeys.includes(a)
      const bInColumns = columnsKeys.includes(b)

      if (aInColumns && !bInColumns) return -1
      if (!aInColumns && bInColumns) return 1

      const aIndex = columnsKeys.indexOf(a)
      const bIndex = columnsKeys.indexOf(b)

      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
      return a.localeCompare(b)
    })
    .map((key) => ({
      key,
      displayName: options.columns[key as keyof T]?.displayName || key,
    }))
})

const sortColumn = ref(
  options.defaultSortColumn || tableColumns.value[0]?.key || ''
)
const sortDirection = ref(SortDirection.Ascending)
const sortIcon = computed(() =>
  sortDirection.value === SortDirection.Ascending
    ? 'fas fa-sort-up'
    : 'fas fa-sort-down'
)

const pageSize = computed(() => options.pageSize)
const numPages = computed(() =>
  Math.ceil(filteredRows.value.length / pageSize.value)
)

const paginationRequestTimer = ref<number>()

async function getNextPage() {
  if (!usePagination.value || loadedAllPaginatedEntries.value) return
  loading.value = true
  clearTimeout(paginationRequestTimer.value)

  paginationRequestTimer.value = window.setTimeout(async () => {
    try {
      const rows = await (
        props.rows as (params: PaginationParams) => Promise<T[]>
      )({
        limit: pageSize.value,
        offset: paginatedRows.value.length,
        searchString: searchString.value,
        sortByProperty: sortColumn.value,
        sortDirection: sortDirection.value,
      })
      
      // @ts-ignore: Disable UnwrapRefSimple<T> assignment error
      paginatedRows.value.push(...rows)
      if (rows.length < pageSize.value) loadedAllPaginatedEntries.value = true
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }, options.paginationRetrievalDebounce)
}

function invalidatePaginationData() {
  paginatedRows.value = []
  currentPage.value = 0
  loadedAllPaginatedEntries.value = false
}

function resetTableData() {
  if (!usePagination.value) return
  invalidatePaginationData()
  getNextPage()
}

function onColumnClicked(key: string) {
  if (sortColumn.value === key) {
    sortDirection.value =
      sortDirection.value === SortDirection.Ascending
        ? SortDirection.Descending
        : SortDirection.Ascending
  } else {
    sortDirection.value = SortDirection.Ascending
  }
  sortColumn.value = key
  invalidatePaginationData()
  getNextPage()
}

async function onClickNext() {
  await getNextPage()
  if (!loadedAllPaginatedEntries.value) currentPage.value += 1
}

const filteredRows = computed<T[]>(() => {
  if (usePagination.value) {
    // paginatedRows.value is UnwrapRefSimple<T>[] internally, cast to T[]
    return paginatedRows.value as unknown as T[]
  }

  const filtered = (props.rows as T[]).filter((row) =>
    options.useSearch
      ? Object.values(row).some((v) =>
          v?.toString().toLowerCase().includes(searchString.value.toLowerCase())
        )
      : true
  )

  if (sortColumn.value) {
    return filtered.slice().sort((a, b) => {
      const aVal = a[sortColumn.value as keyof T]
      const bVal = b[sortColumn.value as keyof T]
      const direction = sortDirection.value === SortDirection.Ascending ? 1 : -1

      if (typeof aVal === 'number' && typeof bVal === 'number')
        return (aVal - bVal) * direction

      return aVal?.toString().localeCompare(bVal?.toString()) * direction
    })
  }

  return filtered
})


const rowsToDisplay = computed(() => {
  if (usePagination.value) {
    return filteredRows.value.slice(
      currentPage.value * pageSize.value,
      (currentPage.value + 1) * pageSize.value
    )
  }
  return filteredRows.value.slice(
    currentPage.value * pageSize.value,
    (currentPage.value + 1) * pageSize.value
  )
})

function setPage(page: number) {
  currentPage.value = page
  if (usePagination.value && page > currentPage.value) {
    getNextPage()
  }
}

onMounted(() => {
  if (usePagination.value) getNextPage()
})

watch(
  () => options.defaultSortColumn,
  (newVal) => {
    sortColumn.value = newVal || tableColumns.value[0]?.key || ''
    resetTableData()
  }
)

watch(searchString, () => {
  resetTableData()
})
</script>

<style scoped>
.table-header-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.button-bar-container,
.search-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.page-selector-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: var(--space-half);
  margin-top: 8px;
}

.page-selector-item {
  min-width: var(--space-1);
  height: var(--space-3);
  padding: 0 8px;
  line-height: var(--space-3);
  border: 1px solid var(--font-primary);
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.page-selector-item:first-child {
  border-top-left-radius: var(--space-1);
  border-bottom-left-radius: var(--space-1);
}

.page-selector-item:last-child {
  border-top-right-radius: var(--space-1);
  border-bottom-right-radius: var(--space-1);
}

.current-page {
  background-color: var(--font-primary);
  color: var(--bg-main);
}

table {
  width: 100%;
  border-collapse: collapse;
}

td,
th {
  padding: 8px;
  text-align: center;
}

th {
  cursor: pointer;
  user-select: none;
}

.hidden {
  display: none;
}
</style>
