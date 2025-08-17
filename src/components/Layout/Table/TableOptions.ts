import { SortDirection } from '../../../models/SortDirection'

export interface PaginationOptions {
  limit: number // Page size
  offset: number // Current index
  searchString?: string
  sortByProperty: string
  sortDirection: SortDirection
}

export class ColumnOptions {
  displayName!: string
}

export interface TableOptions<T> {
  keySelector: (row: T) => string | number
  pageSize: number
  useSearch: boolean
  columns: Partial<Record<keyof T, { displayName: string }>>
  paginationRetrievalDebounce: number
  defaultSortColumn: string
  onRowClicked: (row: T) => void;
}
