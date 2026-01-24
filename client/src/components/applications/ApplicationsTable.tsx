import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type SortingState,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { useMemo, useReducer, useState } from "react";
import { columns, type CustomApplication } from "./Columns";
import Stack from "@mui/material/Stack";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import SortRoundedIcon from "@mui/icons-material/SortRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import Typography from "@mui/material/Typography";
import ApplicationTableHeader from "./ApplicationTableHeader";
import React from "react";

import { blueGrey } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SearchAndFilter from "./SearchAndFilter";

export type FilterState = {
  count: number;
  arrangement: string[];
  status: string[];
};

// We use this to identify which arrays we are allowed to toggle
type FilterCategory = "arrangement" | "status";

export type FilterAction =
  | { type: "TOGGLE_FILTER"; category: FilterCategory; value: string }
  | { type: "CLEAR_ALL" };

const initialState: FilterState = {
  count: 0,
  arrangement: [],
  status: [],
};

// Helper function to calculate count based on active categories
const calculateCount = (arrangement: string[], status: string[]): number => {
  let activeCategories = 0;
  if (arrangement.length > 0) activeCategories++;
  if (status.length > 0) activeCategories++;
  return activeCategories;
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "TOGGLE_FILTER": {
      const { category, value } = action;

      // 1. Calculate the new list for the specific category
      const newList = state[category].includes(value)
        ? state[category].filter((v) => v !== value)
        : [...state[category], value];

      // 2. Prepare the upcoming state to calculate the count
      const nextArrangement =
        category === "arrangement" ? newList : state.arrangement;
      const nextStatus = category === "status" ? newList : state.status;

      // 3. Return state with the derived count
      return {
        ...state,
        [category]: newList,
        count: calculateCount(nextArrangement, nextStatus),
      };
    }
    case "CLEAR_ALL":
      return initialState;
    default:
      return state;
  }
}

function ApplicationsTable({
  data,
  totalCount,
}: {
  data: CustomApplication[];
  totalCount: number;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, dispatch] = useReducer(filterReducer, initialState);
  const [rowSelection, setRowSelection] = useState({}); // State to track selection

  const columnFilters = useMemo(
    () => [
      {
        id: "workArrangement",
        value: filters.arrangement.length ? filters.arrangement : "",
      },
      {
        id: "currentStatus",
        value: filters.status.length ? filters.status : "",
      },
    ],
    [filters.arrangement, filters.status],
  );

  const table = useReactTable({
    data,
    columns: columns,
    state: {
      sorting,
      globalFilter,
      columnFilters,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection, // Sync state
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <Box sx={{ width: "100%" }}>
      <ApplicationTableHeader totalCount={totalCount} />

      <SearchAndFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        filters={filters}
        dispatch={dispatch}
      />

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ borderRadius: 2 }}
        className="border subtle-shadow"
      >
        <Table
          sx={{
            "& .MuiTableCell-root": {
              py: 1,
            },
            "& .MuiTableCell-head": {
              position: "relative", // Needed to anchor the Divider
              bgcolor: blueGrey[50],
              py: 2,
            },
            //Column dividers
            "& .MuiTableCell-head:not(:last-child):after": {
              content: '""',
              position: "absolute",
              right: 0,
              top: "25%",
              height: "50%",
              width: "1px",
              backgroundColor: (theme) => theme.palette.divider,
            },
            "& .MuiTableRow-root:hover": {
              backgroundColor: alpha(blueGrey[50], 0.3),
            },
            "& .MuiTableBody-root .MuiTableRow-root:last-child .MuiTableCell-root":
              {
                borderBottom: 0,
              },
          }}
          aria-label="Applications table"
        >
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Typography
                      variant="body1"
                      component="p"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      fontWeight="medium"
                      sx={{
                        cursor: header.column.getCanSort() ? "pointer" : "auto",
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {/* Sort Indicators */}
                      {header.column.getCanSort() && (
                        <Typography variant="body1" component="span">
                          {{
                            asc: (
                              <ArrowUpwardRoundedIcon
                                fontSize="small"
                                sx={{ width: "24px" }}
                              />
                            ),
                            desc: (
                              <ArrowDownwardRoundedIcon
                                fontSize="small"
                                sx={{ width: "24px" }}
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? (
                            <SortRoundedIcon />
                          )}
                        </Typography>
                      )}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>

                {/* The Expanded Row Content */}
                {row.getIsExpanded() && (
                  <TableRow
                    sx={{
                      bgcolor: (theme) => alpha(theme.palette.grey[50], 0.75),
                    }}
                  >
                    <TableCell colSpan={row.getVisibleCells().length}>
                      <Stack py={1.5}>
                        <div className="font-bold text-gray-700 mb-2">
                          Job Description
                        </div>
                        <div className="text-sm text-gray-600 whitespace-pre-wrap">
                          {row.original.description}
                        </div>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ApplicationsTable;
