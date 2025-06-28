import {SortDirection} from "../../../models/SortDirection.ts";

export interface PaginationParams {
    limit: number; // Page size
    offset: number; // Current index
    searchString?: string;
    sortByProperty: string;
    sortDirection: SortDirection;
}

export class ColumnOptions {
    displayName!: string;
}

export interface TableOptions {
    keySelector: (row: object) => string | number;
    pageSize: number;
    useSearch: boolean;
    columns: Record<string, { displayName: string }>;
    paginationRetrievalDebounce: number;
    defaultSortColumn: string;
}