<template>
  <div class="content-container">
    <DocWrapper title="Nav Bar">
      <template #usage>
        <div class="nav-example-container">

          <NavBar>
            <template #nav-left>
              <p style="color: var(--primary); font-weight: bold;">App Logo</p>
            </template>

            <template #nav-right>
              <span>About</span>
              <span>Contact</span>
            </template>
          </NavBar>
        </div>
      </template>

      <template #slots>
        <ul>
          <li><code>nav-left</code>: Content to display on the left side of the nav bar.</li>
          <li><code>nav-right</code>: Content to display on the right side of the nav bar. This content is inside a
            flexbox container with a gap of 16px between child elements.
          </li>
        </ul>
      </template>
    </DocWrapper>
    <DocWrapper title="Table">
      <template #description>
        <i>A highly configurable table component that supports both passing in a list of objects to display, but also
          pagination via
          infinite-scroll and manual page selection.</i>

        <span>
          In the example below, note that slots are created for each column, by the name of
          <code>col_{object_property_name}</code> e.g. <code>col_role</code> which allows the user to add their
          own custom styling for that particular column, as is the case for the row column.
        </span>
      </template>

      <template #usage>
        <c-table :options="tableOptions" :rows="tableRows">
          <template #col_role="{row}">
              <font-awesome-icon v-if="row.role === 'admin'" icon="fas fa-lock"/>
              <font-awesome-icon v-if="row.role === 'editor'" icon="fas fa-pencil"/>
              <font-awesome-icon v-if="row.role === 'viewer'" icon="fas fa-eye"/>
              {{ row.role }}
          </template>
        </c-table>
      </template>

      <template #props>
        <ul>
          <li><code>rows</code>(object[] | Function): The rows to display, or a function that retrieves the rows.
            The getter function gets a <code>PaginationParams</code> type.</li>
          <li><code>options</code>TableOptions: Options for configuration of the table.</li>
        </ul>
      </template>

      <template #slots>
        <ul>
          <li><code>button-bar</code>A bar just above the table, allowing you to embed buttons.</li>
          <li><code>button-bar-left</code>If not using button-bar, a container on the top-right of the table.</li>
          <li><code>button-bar-right</code>If not using button-bar, a container on the top-right of the table.</li>
          <li><code>col_{key}</code>A slot for overriding the rendering of a given row, where <code>key</code> is the </li>
        </ul>
      </template>
    </DocWrapper>

    <DocWrapper title="Table (With Pagination)">
      <template #description>
        <i>A highly configurable table component that supports both passing in a list of objects to display, but also
          pagination via infinite-scroll and manual page selection.</i>
      </template>

      <template #usage>
        <c-table :options="tableOptions" :rows="getTableRowAsync">
          <template #col_role="{row}">
            <font-awesome-icon v-if="row.role === 'admin'" icon="fas fa-lock"/>
            <font-awesome-icon v-if="row.role === 'editor'" icon="fas fa-pencil"/>
            <font-awesome-icon v-if="row.role === 'viewer'" icon="fas fa-eye"/>
            {{ row.role }}
          </template>
        </c-table>
      </template>
    </DocWrapper>
  </div>
</template>

<script setup lang="ts">
import DocWrapper from "./meta/DocWrapper.vue";
import NavBar from "../components/Layout/NavBar.vue";
import CTable from "../components/Layout/CTable.vue";
import {computed} from "vue";
import type {PaginationParams, TableOptions} from "../components/Layout/Table/TableOptions.ts";
import {mockTableData} from "./meta/TableData.ts";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {SortDirection} from "../models/SortDirection.ts";

interface TableDataType {
  name: string;
  id: number;
}

const tableRows = computed(() => mockTableData);
function getTableRowAsync(retrievalOptions: PaginationParams) {
  return new Promise<Array<object>>((resolve) => {
    setTimeout(() => {
      resolve(
          mockTableData.filter((r) => {
            if (!retrievalOptions.searchString || retrievalOptions.searchString!.length === 0) return true;
            return r.name.toLowerCase().includes(retrievalOptions.searchString?.toLowerCase());
          }).sort((first: object, second: object) => {
            if (typeof first[retrievalOptions.sortByProperty] === 'number' && typeof second[retrievalOptions.sortByProperty] === 'number') {
              return (first[retrievalOptions.sortByProperty]! - second[retrievalOptions.sortByProperty]!) * (retrievalOptions.sortDirection === SortDirection.Ascending ? 1 : -1);
            }

            return first[retrievalOptions.sortByProperty]!.toString().localeCompare(second[retrievalOptions.sortByProperty]!.toString()) *
                (retrievalOptions.sortDirection === SortDirection.Ascending ? 1 : -1);
          }).slice(retrievalOptions.offset, retrievalOptions.offset + retrievalOptions.limit)
      );
    }, 800);
  });
} 

const tableOptions = computed<TableOptions>(() => ({
  keySelector: (r: object) => (r as TableDataType).id,
  pageSize: 10,
  useSearch: true,
  columns: {
    id: {displayName: "User ID"},
    name: {displayName: "Name"},
    role: { displayName: "User Role" },
  },
  defaultSortColumn: "id"
}));
</script>

<style scoped>
</style>