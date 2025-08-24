<template>
  <div class="modal-content-container">
    <DocWrapper title="Nav Bar">
      <template #usage>
        <div class="nav-example-container">
          <NavBar>
            <template #nav-left>
              <p style="color: var(--primary); font-weight: bold">App Logo</p>
            </template>
            <template #nav-right>
              <span>About</span> <span>Contact</span>
            </template>
          </NavBar>
        </div>
      </template>
      <template #slots>
        <ul>
          <li>
            <code>nav-left</code>: Content to display on the left side of the
            nav bar.
          </li>

          <li>
            <code>nav-right</code>: Content to display on the right side of the
            nav bar. This content is inside a flexbox container with a gap of
            16px between child elements.
          </li>
        </ul>
      </template>
    </DocWrapper>
    <DocWrapper title="Table">
      <template #description>
        <i
          >A highly configurable table component that supports both passing in a
          list of objects to display, but also pagination via infinite-scroll
          and manual page selection.</i
        >
        <span>
          In the example below, note that slots are created for each column, by
          the name of
          <code>col_{object_property_name}</code> e.g.
          <code>col_role</code> which allows the user to add their own custom
          styling for that particular column, as is the case for the row column.
        </span>
      </template>
      <template #usage>
        <c-table :options="tableOptions" :rows="tableRows">
          <template #col_role="{ row }">
            <font-awesome-icon
              v-if="(row as unknown as TableDataType).role === 'admin'"
              icon="fas fa-lock" />
            <font-awesome-icon
              v-if="(row as TableDataType).role === 'editor'"
              icon="fas fa-pencil" />
            <font-awesome-icon
              v-if="(row as TableDataType).role === 'viewer'"
              icon="fas fa-eye" />
            {{ (row as TableDataType).role }}
          </template>
        </c-table>
      </template>
      <template #props>
        <ul>
          <li>
            <code>rows</code>(object[] | Function): The rows to display, or a
            function that retrieves the rows. The getter function gets a
            <code>PaginationParams</code> type.
          </li>

          <li>
            <code>options</code>TableOptions: Options for configuration of the
            table.
          </li>
        </ul>
      </template>
      <template #slots>
        <ul>
          <li>
            <code>button-bar</code>A bar just above the table, allowing you to
            embed buttons.
          </li>

          <li>
            <code>button-bar-left</code>If not using button-bar, a container on
            the top-right of the table.
          </li>

          <li>
            <code>button-bar-right</code>If not using button-bar, a container on
            the top-right of the table.
          </li>

          <li>
            <code>col_{key}</code>A slot for overriding the rendering of a given
            row, where <code>key</code> is the
          </li>
        </ul>
      </template>
    </DocWrapper>
    <DocWrapper title="Table (With Pagination)">
      <template #description>
        <i
          >A highly configurable table component that supports both passing in a
          list of objects to display, but also pagination via infinite-scroll
          and manual page selection.</i
        >
      </template>
      <template #usage>
        <c-table :options="tableOptions" :rows="getTableRowAsync">
          <template #col_role="{ row }">
            <font-awesome-icon
              v-if="(row as TableDataType).role === 'admin'"
              icon="fas fa-lock" />
            <font-awesome-icon
              v-if="(row as TableDataType).role === 'editor'"
              icon="fas fa-pencil" />
            <font-awesome-icon
              v-if="(row as TableDataType).role === 'viewer'"
              icon="fas fa-eye" />
            {{ (row as TableDataType).role }}
          </template>
        </c-table>
      </template>
    </DocWrapper>
    <DocWrapper title="Anchored Scrollable">
      <template #usage>
        <AnchoredScrollable style="max-height: 400px;">
          <template #header>
            <h3>Anchored Header</h3>
          </template>
          
          <template #content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempor magna a rhoncus pretium. Fusce et dapibus odio. Ut erat dolor, tristique id quam eu, auctor tristique augue. Aliquam accumsan lacus ac risus dignissim, quis venenatis neque convallis. Suspendisse varius magna vel augue fermentum ultricies. Morbi congue tristique hendrerit. Integer leo eros, eleifend suscipit urna et, rhoncus pretium lorem. Vivamus mattis dui eu auctor lacinia. Etiam ut pellentesque est. Vivamus est arcu, imperdiet in fringilla vel, cursus ut ligula. Aliquam sollicitudin leo eu sem faucibus, at ultrices ipsum aliquam. Vivamus luctus ut dui ac maximus. Donec pellentesque, dui non ullamcorper varius, neque erat iaculis lacus, ultricies sodales turpis turpis non elit. Maecenas at sem a lorem mattis malesuada.

            In rutrum, neque at rhoncus interdum, nibh mi ornare est, a tristique ipsum orci at purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vitae tortor interdum urna maximus imperdiet. Praesent tincidunt id sapien id efficitur. Phasellus sit amet turpis tellus. Vivamus accumsan odio dui, sit amet tincidunt ipsum fringilla eget. Nulla vulputate augue nec metus elementum fermentum. Aenean elementum dui leo, sit amet consequat velit ultrices sit amet. Cras quis orci efficitur, molestie purus at, pellentesque sapien. Nulla quis libero id est tristique elementum. Vivamus consectetur molestie dapibus. Mauris sed nunc diam.

            Nam tincidunt ullamcorper nibh. Praesent accumsan dapibus ligula, vel lacinia enim porta a. Integer accumsan sed nunc at dignissim. Duis quis molestie augue. Donec gravida lorem vitae volutpat placerat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque eleifend erat quis purus placerat, et condimentum orci maximus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla at tellus suscipit, gravida ex sed, porta metus.

            Proin dignissim nisi nec lectus consequat sodales. Nunc ut ante non orci tincidunt fringilla. Etiam vel ullamcorper ipsum. In gravida justo et quam tempus scelerisque. Integer congue sodales ex efficitur finibus. Sed eu nulla vel neque pulvinar varius eleifend eu felis. In ac sollicitudin ante. Aliquam non massa quis leo consectetur hendrerit. Proin convallis nulla ut justo commodo mollis ut vitae massa. Nulla facilisi. Phasellus luctus orci vitae congue condimentum.

            Morbi ut tincidunt sapien. Suspendisse potenti. Vivamus luctus pretium auctor. Suspendisse posuere nisl dui, at pretium libero mollis vel. Ut molestie ex sed bibendum aliquam. Sed purus erat, viverra a vestibulum sit amet, tincidunt at risus. Nunc bibendum urna erat, ac tristique enim semper eget.

            Vestibulum interdum sollicitudin augue in facilisis. Nulla hendrerit pretium tellus, sit amet maximus mauris varius quis. Aliquam metus lorem, molestie sit amet odio vitae, vestibulum ultrices dui. Morbi sem nulla, euismod at cursus tempor, cursus sit amet ligula. Maecenas neque turpis, maximus vitae accumsan et, semper non ante. Nulla non mi at diam porttitor accumsan. Duis tincidunt ex feugiat elit vestibulum dictum. Donec vitae ultrices erat. Nam et tincidunt lectus. Nullam nec quam tristique, volutpat neque sit amet, aliquet enim. Mauris imperdiet quam sed tortor iaculis egestas. Integer porttitor pretium felis ut dignissim. Cras enim libero, hendrerit sed suscipit eu, volutpat sollicitudin sem. Vivamus dignissim varius congue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

            Pellentesque euismod ex justo, a pharetra ligula semper aliquet. Vivamus viverra enim ante, et faucibus ante molestie placerat. Curabitur ipsum nibh, auctor in ultricies at, consequat ut mi. Morbi ante erat, gravida ac hendrerit sed, lobortis a dolor. Quisque vitae tortor consequat, cursus ipsum at, sollicitudin est. Aliquam bibendum felis vitae nibh consequat dapibus. Nulla facilisi.

            In laoreet dignissim ligula nec ultrices. Nulla viverra nulla eu tortor egestas feugiat. Duis quam augue, tincidunt a feugiat quis, dignissim ullamcorper neque. Praesent dictum libero justo, sit amet aliquet velit suscipit vitae. Donec ipsum dui, facilisis sed egestas sed, sodales tristique urna. Mauris accumsan pharetra neque nec lacinia. Nunc vitae lorem leo. Mauris elementum nisi in sem lobortis imperdiet. Aliquam faucibus accumsan purus at varius. Nunc convallis pulvinar urna. Suspendisse bibendum nisi ut augue venenatis, a tristique arcu pellentesque. Nullam quis lectus magna.
          </template>
          
          <template #footer>
            <div style="border: 1px solid var(--primary); padding: 16px;">Some content at the bottom</div>
          </template>
        </AnchoredScrollable>
      </template>
    </DocWrapper>
  </div>
</template>

<script setup lang="ts">
import DocWrapper from './meta/DocWrapper.vue'
import NavBar from '../components/Layout/NavBar.vue'
import CTable from '../components/Layout/CTable.vue'
import { computed } from 'vue'
import type {
  PaginationOptions,
  TableOptions,
} from '../components/Layout/Table/TableOptions'
import { mockTableData } from './meta/TableData'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { SortDirection } from '../models/SortDirection'
import AnchoredScrollable from "../components/Layout/AnchoredScrollable.vue";

interface TableDataType {
  name: string
  id: number
  emailAddr: string
  role: string
}

const tableRows = computed(() => mockTableData)

const getTableRowAsync = (
  retrievalOptions: PaginationOptions
): Promise<TableDataType[]> => {
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
          const direction =
            retrievalOptions.sortDirection === SortDirection.Ascending ? 1 : -1

          if (typeof aVal === 'number' && typeof bVal === 'number') {
            return (aVal - bVal) * direction
          }

          return aVal.toString().localeCompare(bVal.toString()) * direction
        })
        .slice(
          retrievalOptions.offset,
          retrievalOptions.offset + retrievalOptions.limit
        )

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

<style scoped></style>
