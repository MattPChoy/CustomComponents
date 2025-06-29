import CFileUpload from "./components/Inputs/CFileUpload.vue";
import CNumberInput from "./components/Inputs/CNumberInput.vue";
import CTextInput from "./components/Inputs/CTextInput.vue";
import CToggleInput from "./components/Inputs/CToggleInput.vue";
import CTable from "./components/Layout/CTable.vue";
import type {PaginationParams, ColumnOptions, TableOptions} from "./components/Layout/Table/TableOptions.ts";
import NavBar from "./components/Layout/NavBar.vue";

// Exports for NPM package
export {
    CFileUpload, CNumberInput, CTextInput, CToggleInput,

    CTable, NavBar,
};
export type { PaginationParams, TableOptions, ColumnOptions};
