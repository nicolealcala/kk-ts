import { createColumnHelper } from "@tanstack/react-table";
import RowSourceLink from "./RowSourceLink";
import { cn } from "@/utils/tailwind";
import Chip from "@mui/material/Chip";
import RowSalaryRange from "./RowSalaryRange";
import RowStatusSelection from "./RowStatusSelection";
import RowActions from "./RowActions";
import Checkbox from "@mui/material/Checkbox";
import type { Table, Row, RowData } from "@tanstack/react-table";
import Typography from "@mui/material/Typography";
import "@tanstack/react-table";
import { formatShortenedLocaleDate } from "@/utils/date";
import type { ApplicationFormData } from "@/lib/schema/applicationSchema.ts";
import JobLocation from "./JobLocation";

export type ApplicationTableData = ApplicationFormData & { id: string };
/**
 * Extend Table Row functionality for editing an item
 */
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    onEditRow: (row: TData) => void;
    onDeleteRow: (row: TData) => void;
    align?: "left" | "center" | "right";
  }

  interface ColumnMeta<TData extends RowData, TValue> {
    align?: "left" | "center" | "right";
  }
}

export type ApplicationTable = Table<ApplicationTableData>;
export type ApplicationRow = Row<ApplicationTableData>;

const columnHelper = createColumnHelper<ApplicationTableData>();

export const getColumns = () => [
  {
    id: "checkbox",
    header: ({ table }: { table: ApplicationTable }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }: { row: ApplicationRow }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        indeterminate={row.getIsSomeSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  },
  columnHelper.accessor("appliedAt", {
    header: "Date",
    cell: (info) => {
      const appliedDate = info.getValue();
      return (
        <Typography variant="caption" color="initial">
          {formatShortenedLocaleDate(appliedDate)}
        </Typography>
      );
    },
  }),
  columnHelper.accessor("position", {
    header: "Position",
  }),
  columnHelper.accessor("company", {
    header: "Company",
  }),
  columnHelper.accessor("location", {
    header: "Location",
    cell: (info) => {
      const location = info.getValue();
      return <JobLocation location={location} />;
    },
  }),
  columnHelper.display({
    id: "salary-range",
    header: "Salary Range",
    cell: (info) => {
      const { compensationMin, compensationMax, currency, payFrequency } =
        info.row.original;

      return (
        <RowSalaryRange
          compensationMin={compensationMin}
          compensationMax={compensationMax}
          currency={currency ?? undefined}
          payFrequency={payFrequency ?? undefined}
        />
      );
    },
  }),
  columnHelper.accessor("workArrangement", {
    header: "Setup",
    meta: {
      align: "center",
    },
    cell: (info) => {
      const val = info.getValue();
      const chipClassName = {
        remote: "bg-green-50! text-green-500!",
        hybrid: "bg-blue-50! text-blue-500!",
        onsite: "bg-yellow-50! text-yellow-400!",
        notProvided: "bg-gray-50! text-gray-500!",
      };
      return val ? (
        <Chip
          label={val.toUpperCase()}
          size="small"
          className={cn(
            "text-sm! font-medium",
            chipClassName[val as keyof typeof chipClassName],
          )}
        />
      ) : (
        <Typography variant="body2" color="text.disabled" fontStyle="italic">
          N/A
        </Typography>
      );
    },
  }),
  columnHelper.accessor("source", {
    header: "Source",
    cell: (info) => <RowSourceLink source={info.getValue()} />,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue, row }) => {
      const value = getValue();
      return <RowStatusSelection value={value} row={row} />;
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => (
      <RowActions
        row={row}
        onEditRow={() => table.options.meta?.onEditRow(row.original)}
        onDeleteRow={() => table.options.meta?.onDeleteRow(row.original)}
      />
    ),
  }),
];
