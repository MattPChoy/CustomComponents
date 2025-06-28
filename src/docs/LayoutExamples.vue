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
    </DocWrapper>
  </div>
</template>

<script setup lang="ts">
import DocWrapper from "./meta/DocWrapper.vue";
import NavBar from "../components/Layout/NavBar.vue";
import CTable from "../components/Layout/CTable.vue";
import {computed} from "vue";
import type {TableOptions} from "../components/Layout/Table/TableOptions.ts";
import {mockTableData} from "./meta/TableData.ts";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

interface TableDataType {
  name: string;
  id: number;
}

const tableRows = computed(() => mockTableData);

const tableOptions = computed<TableOptions>(() => ({
  keySelector: (r: object) => (r as TableDataType).id,
  pageSize: 10,
  useSearch: true,
  columns: {
    id: {displayName: "User ID"},
    name: {displayName: "Name"},
    role: { displayName: "User Role" },
  },
}));
</script>

<style scoped>
</style>