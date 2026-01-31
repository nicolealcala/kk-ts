import { createColumnHelper } from "@tanstack/react-table";
import type { Application } from "@/lib/types/applications";
import ApplicationSourceLink from "./ApplicationSourceLink";
import { cn } from "@/utils/tailwind";
import Chip from "@mui/material/Chip";
import ApplicationSalaryRange from "./ApplicationSalaryRange";
import ApplicationStatusSelection from "./ApplicationStatusSelection";
import RowActions from "./RowActions";
import Checkbox from "@mui/material/Checkbox";
import type { Table, Row, RowData } from "@tanstack/react-table";
import Typography from "@mui/material/Typography";
import "@tanstack/react-table";
import { convertUtcToShortenedLocaleDate } from "@/utils/date";

/**
 * Extend Table Row functionality for editing an item
 */
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    onEditRow: (row: TData) => void;
    onDeleteRow: (row: TData) => void;
  }
}

export type CustomApplication = Application & {
  currentStatus: string;
};
export type ApplicationTable = Table<CustomApplication>;
export type ApplicationRow = Row<CustomApplication>;

const columnHelper = createColumnHelper<CustomApplication>();

const filterIncludesCellValue = (
  row: Row<CustomApplication>,
  columnId: string,
  filterValue: string[],
) => {
  const safeFilterValue = Array.isArray(filterValue)
    ? filterValue
    : filterValue
      ? [filterValue]
      : [];

  if (safeFilterValue.length === 0) return true;
  const rowValue = row.getValue(columnId) as string;
  return safeFilterValue.includes(rowValue);
};

export const columns = [
  {
    id: "select",
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
  columnHelper.accessor("createDate", {
    header: "Date",
    cell: (info) => (
      <Typography variant="caption" color="initial">
        {convertUtcToShortenedLocaleDate(info.getValue())}
      </Typography>
    ),
  }),
  columnHelper.accessor("position", {
    header: "Position",
  }),
  columnHelper.accessor("organization", {
    header: "Organization",
  }),
  columnHelper.accessor("location", {
    header: "Location",
    cell: (info) => {
      const location = info.getValue();
      const renderedLocation = Object.values(location)
        .filter(
          (val: string | number) => val && val !== undefined && val !== null,
        )
        .join(", ");
      return (
        <Typography
          variant="body1"
          color={renderedLocation ? "initial" : "textSecondary"}
          fontStyle={renderedLocation ? "normal" : "italic"}
        >
          {renderedLocation ? renderedLocation : "Not Disclosed"}
        </Typography>
      );
    },
  }),
  columnHelper.accessor("salary", {
    header: "Salary Range",
    cell: (info) => <ApplicationSalaryRange salary={info.getValue()} />,
    enableSorting: false,
  }),
  columnHelper.accessor("workArrangement", {
    header: "Arrangement",
    filterFn: filterIncludesCellValue,
    cell: (info) => {
      const val = info.getValue();
      const chipClassName = {
        remote: "bg-green-50! text-green-500!",
        hybrid: "bg-blue-50! text-blue-500!",
        onsite: "bg-yellow-50! text-yellow-400!",
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
        <Typography variant="body1" color="text.secondary" fontStyle="italic">
          Not Disclosed
        </Typography>
      );
    },
  }),
  columnHelper.accessor("source", {
    header: "Source",
    cell: (info) => <ApplicationSourceLink source={info.getValue()} />,
  }),
  columnHelper.accessor("currentStatus", {
    header: "Status",
    filterFn: filterIncludesCellValue,
    cell: ({ getValue, row }) => (
      <ApplicationStatusSelection getValue={getValue} row={row} />
    ),
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
