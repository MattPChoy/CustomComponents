<template>

  <div class="content-container">
     <DocWrapper title="Nav Bar"
      > <template #usage
        >
        <div class="nav-example-container">
           <NavBar
            > <template #nav-left
              >
              <p style="color: var(--primary); font-weight: bold">App Logo</p>
               </template
            > <template #nav-right> <span>About</span> <span>Contact</span> </template> </NavBar
          >
        </div>
         </template
      > <template #slots
        >
        <ul>

          <li><code>nav-left</code>: Content to display on the left side of the nav bar.</li>

          <li>
            <code>nav-right</code>: Content to display on the right side of the nav bar. This
            content is inside a flexbox container with a gap of 16px between child elements.
          </li>

        </ul>
         </template
      > </DocWrapper
    > <DocWrapper title="Table"
      > <template #description
        > <i
          >A highly configurable table component that supports both passing in a list of objects to
          display, but also pagination via infinite-scroll and manual page selection.</i
        > <span
          > In the example below, note that slots are created for each column, by the name of
          <code>col_{object_property_name}</code> e.g. <code>col_role</code> which allows the user
          to add their own custom styling for that particular column, as is the case for the row
          column. </span
        > </template
      > <template #usage
        > <c-table :options="tableOptions" :rows="tableRows"
          > <template #col_role="{ row }"
            > <font-awesome-icon
              v-if="(row as unknown as TableDataType).role === 'admin'"
              icon="fas fa-lock"
            /> <font-awesome-icon
              v-if="(row as TableDataType).role === 'editor'"
              icon="fas fa-pencil"
            /> <font-awesome-icon
              v-if="(row as TableDataType).role === 'viewer'"
              icon="fas fa-eye"
            /> {{ (row as TableDataType).role }} </template
          > </c-table
        > </template
      > <template #props
        >
        <ul>

          <li>
            <code>rows</code>(object[] | Function): The rows to display, or a function that
            retrieves the rows. The getter function gets a <code>PaginationParams</code> type.
          </li>

          <li><code>options</code>TableOptions: Options for configuration of the table.</li>

        </ul>
         </template
      > <template #slots
        >
        <ul>

          <li><code>button-bar</code>A bar just above the table, allowing you to embed buttons.</li>

          <li>
            <code>button-bar-left</code>If not using button-bar, a container on the top-right of the
            table.
          </li>

          <li>
            <code>button-bar-right</code>If not using button-bar, a container on the top-right of
            the table.
          </li>

          <li>
            <code>col_{key}</code>A slot for overriding the rendering of a given row, where
            <code>key</code> is the
          </li>

        </ul>
         </template
      > </DocWrapper
    > <DocWrapper title="Table (With Pagination)"
      > <template #description
        > <i
          >A highly configurable table component that supports both passing in a list of objects to
          display, but also pagination via infinite-scroll and manual page selection.</i
        > </template
      > <template #usage
        > <c-table :options="tableOptions" :rows="getTableRowAsync"
          > <template #col_role="{ row }"
            > <font-awesome-icon
              v-if="(row as TableDataType).role === 'admin'"
              icon="fas fa-lock"
            /> <font-awesome-icon
              v-if="(row as TableDataType).role === 'editor'"
              icon="fas fa-pencil"
            /> <font-awesome-icon
              v-if="(row as TableDataType).role === 'viewer'"
              icon="fas fa-eye"
            /> {{ (row as TableDataType).role }} </template
          > </c-table
        > </template
      > </DocWrapper
    >
  </div>

</template>

<script setup lang="ts">
import DocWrapper from './meta/DocWrapper.vue'
import NavBar from '../components/Layout/NavBar.vue'
import CTable from '../components/Layout/CTable.vue'
import { computed } from 'vue'
import type { PaginationParams, TableOptions } from '../components/Layout/Table/TableOptions'
import { mockTableData } from './meta/TableData'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { SortDirection } from '../models/SortDirection'

interface TableDataType {
  name: string
  id: number
  emailAddr: string
  role: string
}

const tableRows = computed(() => mockTableData)

const getTableRowAsync = (retrievalOptions: PaginationParams): Promise<TableDataType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const search = retrievalOptions.searchString?.toLowerCase()
      const sortKey = retrievalOptions.sortByProperty as keyof TableDataType

      const result = mockTableData
        .filter((row) => {
          return !search || row.name.toLowerCase().includes(search)
        })
        .sort((a, b) => {
          const aVal = a[sortKey]
          const bVal = b[sortKey]
          const direction = retrievalOptions.sortDirection === SortDirection.Ascending ? 1 : -1

          if (typeof aVal === 'number' && typeof bVal === 'number') {
            return (aVal - bVal) * direction
          }

          return aVal.toString().localeCompare(bVal.toString()) * direction
        })
        .slice(retrievalOptions.offset, retrievalOptions.offset + retrievalOptions.limit)

      resolve(result)
    }, 800)
  })
}

const tableOptions = computed<TableOptions<TableDataType>>(() => ({
  keySelector: (r: object) => (r as TableDataType).id,
  pageSize: 10,
  useSearch: true,
  columns: {
    id: { displayName: 'User ID' },
    name: { displayName: 'Name' },
    role: { displayName: 'User Role' },
  },
  defaultSortColumn: 'id',
  paginationRetrievalDebounce: 200,
}))
</script>

<style scoped>

</style>
