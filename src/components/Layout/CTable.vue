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
          <c-text-input v-model="searchString" :show-validation="false"/>
        </div>
      </div>

      <table class="table">
        <thead>
        <tr>
          <th v-for="column in tableColumns" :key="column.key">
            {{ column.displayName }}
          </th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="row in rowsToDisplay">
          <td v-for="col in tableColumns">
            <slot :name="'col_'+col.key" :row="row">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>

        <tr v-if="filteredRows.length === 0">
          <td :colspan="tableColumns.length" style="width: 100%;">No records found</td>
        </tr>
        </tbody>
      </table>

      <div class="page-selector-container">
        <div class="page-selector-item" v-for="i in Array.from(Array(numPages).keys())"
             @click="() => setPage(i)" :class="{'current-page': i === currentPage}">
          {{ i + 1 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, type PropType, ref} from "vue";
import type {PaginationParams, TableOptions} from "./Table/TableOptions.ts";
import CTextInput from "../Inputs/CTextInput.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const props = defineProps({
  rows: {
    type: [Array, Function] as PropType<Array<object> | ((params: PaginationParams) => Promise<Array<object>>)>,
    required: true
  },
  options: {type: Object as PropType<TableOptions>, required: true},
});

// The rows retrieved via pagination
const paginatedRows = ref([]);
// Pagination position, effectively 'offset' in pagination terms.
const currentIndex = ref(0);
const searchString = ref("");

const numPages = computed(() => {
  if (!usePagination.value) return Math.ceil(filteredRows.value.length / props.options?.pageSize);
});

const currentPage = computed(() => {
  return Math.floor(currentIndex.value / props.options?.pageSize);
})

const usePagination = computed(() => {
  return typeof props.rows === 'function';
});

const setPage = (page: number) => {
  currentIndex.value = page * props.options?.pageSize;
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
      const rows = (usePagination.value ? paginatedRows.value : props.rows) as [];
      console.log(searchString.value)
      return rows
          .filter((row) =>
              Object.values(row).some((value) =>
                  value!.toString().toLowerCase().includes(searchString.value.toLowerCase())
              )
          );
    }
);

// The rows to show
const rowsToDisplay = computed(() =>
    filteredRows.value.slice(currentIndex.value, currentIndex.value + props.options?.pageSize));
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
  width: var(--space-3);
  height: var(--space-3);
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
</style>