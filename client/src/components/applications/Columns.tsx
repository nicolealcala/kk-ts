import { createColumnHelper } from "@tanstack/react-table";
import type { Application } from "@/lib/types/applications";
import ApplicationSourceLink from "./ApplicationSourceLink";
import { cn } from "@/utils/tailwind";
import Chip from "@mui/material/Chip";
import ApplicationStatusSelection from "./ApplicationStatusSelection";
import RowActions from "./RowActions";
import Checkbox from "@mui/material/Checkbox";
import type { Table, Row, RowData } from "@tanstack/react-table";
import Typography from "@mui/material/Typography";
import "@tanstack/react-table";
import { convertUtcToShortenedLocaleDate } from "@/utils/date";
import { formatCurrency } from "@/utils/currency";

/**
 * Extend Table Row functionality for editing an item
 */
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    onEditRow: (row: TData) => void;
    onDeleteRow: (row: TData) => void;
  }
}

export type ApplicationTable = Table<Application>;
export type ApplicationRow = Row<Application>;

const columnHelper = createColumnHelper<Application>();

const filterIncludesCellValue = (
  row: Row<Application>,
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

export const getColumns = () => [
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
  columnHelper.accessor("updated_at", {
    // id: "updated_at",
    header: "Date",
    cell: (info) => (
      <Typography variant="caption" color="initial">
        {convertUtcToShortenedLocaleDate(info.getValue())}
      </Typography>
    ),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("position", {
    header: "Position",
  }),
  columnHelper.accessor("organization", {
    header: "Organization",
  }),
  columnHelper.accessor(
    (row) => {
      const { city, country } = row;

      if (!city && !country) return "Not provided";
      if (!city) return country;
      if (!country) return city;

      return `${city}, ${country}`;
    },
    {
      id: "location",
      header: "Location",
      //filterFn: filterIncludesCellValue,
      cell: (info) => (
        <Typography
          variant="body1"
          color={
            info.getValue() === "Not provided" ? "textSecondary" : "initial"
          }
          fontStyle={info.getValue() === "Not provided" ? "italic" : "normal"}
        >
          {info.getValue()}
        </Typography>
      ),
    },
  ),
  columnHelper.accessor(
    (row) => {
      const { salary_currency_code, salary_min, salary_max } = row;
      if (!salary_currency_code && !salary_min && !salary_max)
        return "Not disclosed";
      if (!salary_min) return formatCurrency(salary_max, salary_currency_code);
      if (!salary_max) return formatCurrency(salary_min, salary_currency_code);
      return `${formatCurrency(salary_min, salary_currency_code)} - ${formatCurrency(salary_max, salary_currency_code)}`;
    },
    {
      id: "salary",
      header: "Salary Range",
      cell: (info) => (
        <Typography
          variant="body1"
          color={
            info.getValue() === "Not disclosed" ? "textSecondary" : "initial"
          }
          fontStyle={info.getValue() === "Not disclosed" ? "italic" : "normal"}
        >
          {info.getValue()}
        </Typography>
      ),
      enableSorting: false,
    },
  ),
  columnHelper.accessor("work_arrangement", {
    header: "Arrangement",
    //filterFn: filterIncludesCellValue,
    cell: (info) => {
      const val = info.getValue();
      const chipClassName = {
        remote: "bg-green-50! text-green-500!",
        hybrid: "bg-blue-50! text-blue-500!",
        onsite: "bg-yellow-50! text-yellow-400!",
      };

      // 1. Check if val exists AND if it exists in our mapping
      const config = val
        ? chipClassName[val as keyof typeof chipClassName]
        : null;

      if (!val || !config) {
        return (
          <Typography variant="body1" color="text.secondary" fontStyle="italic">
            Not Disclosed
          </Typography>
        );
      }

      return (
        <Chip
          label={val.toUpperCase()}
          size="small"
          className={cn("text-sm! font-medium", config)}
        />
      );
    },
  }),
  columnHelper.accessor(
    (row) => {
      const { source_platform, source_link } = row;
      if (!source_platform && !source_link) return "Not available";
      return `${source_platform} ${source_link}`;
    },
    {
      id: "source",
      header: "Source",
      cell: (info) =>
        info.getValue() === "Not Available" ? (
          <Typography variant="body1" color="text.secondary" fontStyle="italic">
            {info.getValue()}
          </Typography>
        ) : (
          <ApplicationSourceLink
            source={{
              platform: info.row.original.source_platform,
              link: info.row.original.source_link,
            }}
          />
        ),
    },
  ),
  columnHelper.accessor("current_status", {
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
