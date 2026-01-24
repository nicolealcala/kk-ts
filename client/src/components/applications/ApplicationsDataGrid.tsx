import {
  //type GridRowsProp,
  type GridColDef,
  DataGrid,
  type DataGridProps,
} from "@mui/x-data-grid";
import ApplicationSourceLink from "./ApplicationSourceLink";
import Chip from "@mui/material/Chip";
import { cn } from "@/utils/tailwind";
import ApplicationMenu from "./AppicationMenu";
import type { WorkArrangement } from "../../lib/types/applications";
import ApplicationSalaryRange from "./ApplicationSalaryRange";
import EmptyApplications from "./EmptyApplications";

const applicationStatuses = [
  {
    value: "applied",
    color: "bg-blue-50! text-blue-500!",
  },
  {
    value: "interviewing",
    color: "bg-yellow-50! text-yellow-500!",
  },
  {
    value: "offered",
    color: "bg-green-50! text-green-500!",
  },
  {
    value: "rejected",
    color: "bg-red-50! text-red-500!",
  },
  {
    value: "ghosted",
    color: "bg-gray-50! text-gray-500!",
  },
];

const columns: GridColDef[] = [
  { field: "createDate", headerName: "Date", flex: 1, display: "text" },
  {
    field: "position",
    headerName: "Position",
    display: "flex",
    flex: 2,
    renderCell: (params) => {
      const position = params.row.position;

      return <div className="flex line-clamp-2!">{position}</div>;
    },
  },
  {
    field: "organization",
    headerName: "Organization",
    display: "text",
    flex: 2,
  },
  { field: "location", headerName: "Location", display: "text", flex: 2 },
  {
    field: "salary",
    headerName: "Salary Range",
    display: "text",
    flex: 2,
    maxWidth: 150,
    renderCell: (params) => (
      <ApplicationSalaryRange salary={params.row.salary} />
    ),
  },
  {
    field: "source",
    headerName: "Source",
    minWidth: 128,
    display: "flex",
    renderCell: (params) => (
      <ApplicationSourceLink source={params.row.source} />
    ),
  },
  {
    field: "workArrangement",
    headerName: "Arrangement",
    display: "flex",
    flex: 1.5,
    headerAlign: "center",
    renderCell: (params) => {
      type ChipClassName = {
        [K in WorkArrangement]: string;
      };

      const chipClassName: ChipClassName = {
        remote: "bg-green-50! text-green-500!",
        hybrid: "bg-blue-50! text-blue-500!",
        onsite: "bg-yellow-50! text-yellow-400!",
      };

      const arrangement = (
        params.row.workArrangement as string
      ).toLowerCase() as WorkArrangement;

      return (
        <div className="flex h-full w-full items-center justify-center">
          <Chip
            label={arrangement.toUpperCase()}
            className={cn("text-xs font-medium", chipClassName[arrangement])}
          />
        </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    display: "flex",
    flex: 2.5,
    renderCell: (params) => {
      const status = params.row.currentStatus.toLowerCase();

      const statusConfig = applicationStatuses.find(
        (s) => s.value.toLowerCase() === status,
      );

      const chipClassName = statusConfig?.color ?? "bg-gray-50! text-gray-500!";

      return (
        <div className="flex w-full h-full items-center justify-between!">
          <Chip
            label={status.toUpperCase()}
            className={cn("text-xs font-medium", chipClassName)}
          />

          <ApplicationMenu />
        </div>
      );
    },
  },
];

const PAGINATION_MODEL = { page: 0, pageSize: 10 };

type ApplicationsTableProps<T, K extends keyof T> = Partial<Omit<T, K>> &
  Required<Pick<T, K>>;

export default function ApplicationsDataGrid({
  loading,
  ...props
}: ApplicationsTableProps<DataGridProps, "loading">) {
  return (
    <DataGrid
      columns={columns}
      checkboxSelection={props.rows && props.rows.length > 0}
      disableColumnResize
      disableRowSelectionOnClick
      initialState={{ pagination: { paginationModel: PAGINATION_MODEL } }}
      pageSizeOptions={[10, 15]}
      getRowHeight={() => "auto"}
      loading={loading}
      slotProps={{
        loadingOverlay: {
          variant: "skeleton",
          noRowsVariant: "skeleton",
        },
      }}
      slots={{ noRowsOverlay: EmptyApplications }}
      {...props}
      sx={{
        borderRadius: 3,
        maxWidth: "100%",
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: "semiBold",
          fontFamily: "'Figtree', sans-serif",
          fontSize: "16px",
          color: "black",
        },
        fontFamily: "'Inter', sans-serif",
        "& .MuiDataGrid-cell": {
          whiteSpace: "normal",
          lineHeight: "1.5rem",
          display: "flex",
          alignItems: "center",
          py: 1,
          fontSize: "16px",
          fontWeight: "regular",
        },
        "& .MuiDataGrid-cell[data-field='createDate']": {
          fontSize: "14px",
          color: "text.secondary",
        },
      }}
    />
  );
}
