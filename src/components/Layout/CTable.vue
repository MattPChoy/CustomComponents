<template>
  <div class="table-container">
    <div class="table-header-container">
      <!-- Flexbox, column -->
      <div class="button-bar-container">
        <slot name="button-bar">
          <slot name="button-bar-left" class="button-bar-left">
            <!-- Add in this here so that if button-bar-left slot is empty, button-bar-right is flexed to the right side-->
            <div></div>
          </slot>

          <slot name="button-bar-right" class="button-bar-right">
          </slot>
        </slot>
      </div>

      <div class="search-container">
        <div/>
        <div class="flex-row gap-x-1">
          <font-awesome-icon icon="fas fa-search"></font-awesome-icon>
          <c-text-input v-model="searchString" :show-validation="false" @update:modelValue="resetTableData"/>
        </div>
      </div>

      <table class="table">
        <thead>
        <tr>
          <th v-for="column in tableColumns" :key="column.key" @click="() => onColumnClicked(column.key)">
            {{ column.displayName }}
            <font-awesome-icon :icon="sortIcon" :class='{"hidden": sortColumn !== column.key}'/>
          </th>
        </tr>
        </thead>

        <tbody>
        <tr v-if="loading">
          <td :colspan="tableColumns.length">
            <span> <font-awesome-icon icon="fas fa-spinner"/> </span>
          </td>
        </tr>

        <tr v-for="row in rowsToDisplay">
          <td v-for="col in tableColumns">
            <slot :name="'col_'+col.key" :row="row">
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

      <div class="page-selector-container">
        <div class="page-selector-item" v-for="i in Array.from(Array(numPages).keys())"
             @click="() => setPage(i)" :class="{'current-page': i === currentPage}">
          {{ i + 1 }}
        </div>

        <div v-if="usePagination && !loadedAllPaginatedEntries && numPages > 0" class="page-selector-item"
             @click="onClickNext">Next
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, type PropType, ref, watch} from "vue";
import type {PaginationParams, TableOptions} from "./Table/TableOptions.ts";
import CTextInput from "../Inputs/CTextInput.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {SortDirection} from "../../models/SortDirection.ts";

const props = defineProps({
  rows: {
    type: [Array, Function] as PropType<Array<object> | ((params: PaginationParams) => Promise<Array<object>>)>,
    required: true
  },
  options: {type: Object as PropType<TableOptions>, required: true},
});

onMounted(() => {
  getNextPage();
});

// The rows retrieved via pagination
const paginatedRows = ref([]);
// Pagination position, effectively 'offset' in pagination terms.
const currentPage = ref(0);
const searchString = ref("");
const loading = ref(false);
// Have we loaded all pagination entries?
const loadedAllPaginatedEntries = ref(false);

const sortColumn = ref(props.options?.defaultSortColumn ?? tableColumns.value[0]?.key ?? "");
const sortDirection = ref(SortDirection.Ascending);
const sortIcon = computed(() => sortDirection.value === SortDirection.Ascending ? 'fas fa-sort-up' : 'fas fa-sort-down')

const pageSize = computed(() => props.options?.pageSize ?? 20);
const numPages = computed(() => {
  return Math.ceil(filteredRows.value.length / props.options?.pageSize);
});

const paginationRequestTimer = ref<number>();

const usePagination = computed(() => {
  return typeof props.rows === 'function';
});

watch(() => props.options?.defaultSortColumn, (newValue: string) => {
  sortColumn.value = newValue ?? tableColumns.value[0]?.key ?? "";
}, {deep: true});

const setPage = (page: number) => {
  currentPage.value = page;

  if (usePagination.value && page > currentPage.value) {
    getNextPage();
  }
}

async function getNextPage() {
  clearTimeout(paginationRequestTimer.value);
  paginationRequestTimer.value = setTimeout(async () => {
    if (!usePagination.value) return;
    loading.value = true;

    try {
      const rows = await props.rows({
        limit: pageSize.value,
        offset: paginatedRows.value.length,
        searchString: searchString.value,
        sortByProperty: sortColumn.value,
        sortDirection: sortDirection.value
        // TODO: Sorting.
      });

      paginatedRows.value.push(...rows);

      if (rows.length !== pageSize.value) {
        loadedAllPaginatedEntries.value = true;
      }
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  }, props.options?.paginationRetrievalDebounce ?? 200)
}

/**
 * Function to be called when searching or sorting; i.e. anything that effectively changes the order of data already
 * loaded. Resets the state of the component and re-fetches data from fresh.
 */
function invalidatePaginationData() {
  paginatedRows.value = [];
  currentPage.value = 0;
  loadedAllPaginatedEntries.value = false;
  loading.value = true;
}

function resetTableData() {
  if (!usePagination) return;
  invalidatePaginationData();
  getNextPage();
}

function onColumnClicked(key: string) {
  if (sortColumn.value === key) {
    sortDirection.value = sortDirection.value === SortDirection.Ascending ? SortDirection.Descending : SortDirection.Ascending;
  }
  sortColumn.value = key;

  invalidatePaginationData();
  getNextPage();
}

async function onClickNext() {
  await getNextPage();

  if (!loadedAllPaginatedEntries.value) currentPage.value += 1;
}

const rows = computed(() => {
  if (usePagination.value) {
    return paginatedRows.value;
  }

  return props.rows as [];
})

const tableColumns = computed(() =>
    // Assume that the first object has the same keys 
    Object.keys(rows.value[0] || {}).sort((a, b) => {
      const aInColumns = a in (props.options?.columns || {});
      const bInColumns = b in (props.options?.columns || {});

      if (aInColumns && !bInColumns) return -1;
      if (!aInColumns && bInColumns) return 1;

      const aIndex = Object.keys(props.options?.columns || {}).indexOf(a);
      const bIndex = Object.keys(props.options?.columns || {}).indexOf(b);

      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      return a.localeCompare(b);
    }).map((key) => ({
      key: key,
      displayName: props.options?.columns[key]?.displayName || key,
    }))
);

// Apply filtering and sorting, but not pagination yet
const filteredRows = computed(() => {
      if (usePagination.value) {
        return paginatedRows.value
      }

      const rows = props.rows as [];

      if (sortColumn.value !== "") {
        rows.sort((first: object, second: object) => {

          if (typeof first[sortColumn.value] === 'number' && typeof second[sortColumn.value] === 'number') {
            return (first[sortColumn.value]! - second[sortColumn.value]!) * (sortDirection.value === SortDirection.Ascending ? 1 : -1);
          }

          return first[sortColumn.value]!.toString().localeCompare(second[sortColumn.value]!.toString()) *
              (sortDirection.value === SortDirection.Ascending ? 1 : -1);
        });
      }

      return (props.rows as [])
          .filter((row) =>
              Object.values(row).some((value) =>
                  value!.toString().toLowerCase().includes(searchString.value.toLowerCase())
              )
          );
    }
);

// The rows to show
const rowsToDisplay = computed(() => {
  return filteredRows.value.slice(currentPage.value * pageSize.value, (currentPage.value + 1) * pageSize.value)
});
</script>

<style scoped>
.table-header-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.button-bar-container, .search-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between; /* Push the elements to either side */
  width: 100%;
}

.page-selector-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: var(--space-half);
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
}

td {
  text-align: center;
}

th {
  /* Because sorting, set cursor pointer. */
  cursor: pointer;
}
</style>