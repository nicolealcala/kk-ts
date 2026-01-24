import { createColumnHelper } from "@tanstack/react-table";
import type { Application } from "@/lib/types/applications";
import ApplicationSourceLink from "./ApplicationSourceLink";
import { cn } from "@/utils/tailwind";
import Chip from "@mui/material/Chip";
import ApplicationSalaryRange from "./ApplicationSalaryRange";
import ApplicationStatusSelection from "./ApplicationStatusSelection";
import RowActions from "./RowActions";
import Checkbox from "@mui/material/Checkbox";
import type { Table, Row } from "@tanstack/react-table";

export type CustomApplication = Application & {
  currentStatus: string;
};
export type ApplicationTable = Table<CustomApplication>;
export type ApplicationRow = Row<CustomApplication>;
//TO DO: Add Action / Expand button for notes
const columnHelper = createColumnHelper<CustomApplication>();

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
    // cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("position", {
    header: "Position",
  }),
  columnHelper.accessor("organization", {
    header: "Organization",
  }),
  columnHelper.accessor("location", {
    header: "Location",
    // Assumes location is a string based on your provided Rows data
    //cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("salary", {
    header: "Salary Range",
    cell: (info) => <ApplicationSalaryRange salary={info.getValue()} />,
    enableSorting: false,
  }),
  columnHelper.accessor("workArrangement", {
    header: "Arrangement",
    cell: (info) => {
      const val = info.getValue();
      const chipClassName = {
        remote: "bg-green-50! text-green-500!",
        hybrid: "bg-blue-50! text-blue-500!",
        onsite: "bg-yellow-50! text-yellow-400!",
      };
      return (
        <Chip
          label={val.toUpperCase()}
          size="small"
          className={cn(
            "text-xs font-medium",
            chipClassName[val as keyof typeof chipClassName],
          )}
        />
      );
    },
  }),
  columnHelper.accessor("source", {
    header: "Source",
    cell: (info) => <ApplicationSourceLink source={info.getValue()} />,
  }),
  columnHelper.accessor("currentStatus", {
    header: "Status",
    cell: ({ getValue, row }) => (
      <ApplicationStatusSelection getValue={getValue} row={row} />
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (props) => <RowActions row={props.row} />,
  }),
];
