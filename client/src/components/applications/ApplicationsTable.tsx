import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type SortingState,
  getExpandedRowModel,
  type RowSelectionState,
} from "@tanstack/react-table";
import { useMemo, useReducer, useState } from "react";
import { columns, type CustomApplication } from "./Columns";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";

import Typography from "@mui/material/Typography";
import React from "react";

import { blueGrey } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "./Toolbar";
import { useApplicationsData } from "@/utils/hooks/useApplicationsData";
import ConfirmationModal from "../shared/ConfirmationModal";
import Span from "../shared/typography/Span";
import DeleteHeader from "../shared/header-icons/DeleteHeader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export type FilterState = {
  count: number;
  arrangement: string[];
  status: string[];
};

// Identify which filter category is being modified
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

type ApplicationsTableProps = {
  data: CustomApplication[];
  setSelectedApplication: React.Dispatch<
    React.SetStateAction<CustomApplication | null>
  >;
};

function ApplicationsTable({
  data,
  setSelectedApplication,
}: ApplicationsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, dispatch] = useReducer(filterReducer, initialState);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({}); // State to track selection
  const [openModal, setOpenModal] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<
    CustomApplication | CustomApplication[] | null
  >(null);

  const currentLocalDate = new Date().toISOString().split("T")[0];
  const { deleteApplication } = useApplicationsData(currentLocalDate);

  const onSuccess = () => {
    setApplicationToDelete(null);
    setOpenModal(false);
  };

  const handleConfirmDeleteOne = () => {
    const appId = (applicationToDelete as CustomApplication)?.id;

    console.log("RowSelection: ", rowSelection);
    console.log("app to delete: ", applicationToDelete);
    if (!appId) {
      console.log("no single id");
      return;
    }

    deleteApplication((applicationToDelete as CustomApplication).id as string, {
      onSuccess: () => {
        setRowSelection((prev) => {
          const updatedRowSelection = { ...prev };
          delete updatedRowSelection[appId];
          return updatedRowSelection;
        });
        onSuccess();
      },
    });
  };

  const handleDeleteMany = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    setApplicationToDelete(selectedRows.map((row) => row.original));
    setOpenModal(true);
  };

  const handleConfirmDeleteMany = () => {
    const ids = (applicationToDelete as CustomApplication[])?.map(
      (app) => app.id,
    );

    if (ids.length === 0) {
      console.log("no ids");
      return;
    }

    deleteApplication(ids as string[], {
      onSuccess: () => {
        onSuccess();
        setRowSelection({});
      },
    });
  };

  const columnFilters = useMemo(
    () => [
      {
        id: "workArrangement",
        value: filters.arrangement,
      },
      {
        id: "currentStatus",
        value: filters.status,
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
    meta: {
      //rowSelection,
      onEditRow: (row: CustomApplication) => {
        setSelectedApplication(row);
      },
      onDeleteRow: (row: CustomApplication) => {
        setApplicationToDelete(row);
        setOpenModal(true);
      },
    },
    getRowId: (row) => row.id,
    onRowSelectionChange: setRowSelection,
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
      <Toolbar
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        filters={filters}
        dispatch={dispatch}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        handleDeleteMany={handleDeleteMany}
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
              py: 0.5,
              fontSize: "16px",
            },
            "& .MuiTableCell-head": {
              position: "relative", // Needed to anchor the Divider
              bgcolor: blueGrey[50],
              py: 1,
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
                        <Typography
                          variant="body1"
                          component="span"
                          display="flex"
                          alignItems="start"
                          color="text.disabled"
                        >
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
                            <UnfoldMoreRoundedIcon />
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
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
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
                        <Box py={1.5} px={2}>
                          <Typography
                            variant="body2"
                            component="p"
                            fontWeight="semiBold"
                            gutterBottom
                          >
                            Job Description
                          </Typography>
                          <Typography variant="body2" component="p">
                            {row.original.description}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              // No rows found (Empty State)
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    py={1}
                  >
                    {data.length === 0 ? (
                      // Initial Empty Table
                      <Typography variant="body1">
                        No Applications Yet
                      </Typography>
                    ) : (
                      //Empty search and filter result
                      <Typography variant="body1">No results found</Typography>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmationModal
        open={openModal}
        title="Are you sure?"
        message={
          applicationToDelete && Array.isArray(applicationToDelete) ? (
            <DeleteManyMessages applicationsToDelete={applicationToDelete} />
          ) : (
            <DeleteOneMessage applicationToDelete={applicationToDelete} />
          )
        }
        handleClose={() => setOpenModal(false)}
        handleConfirm={
          Object.keys(rowSelection).length > 0 &&
          Array.isArray(applicationToDelete)
            ? handleConfirmDeleteMany
            : handleConfirmDeleteOne
        }
        confirmButtonColor="error"
        headerIcon={<DeleteHeader />}
      />
    </Box>
  );
}

function DeleteOneMessage({
  applicationToDelete,
}: {
  applicationToDelete: CustomApplication | null;
}) {
  if (!applicationToDelete) return null;
  return (
    <Typography variant="body1" color="textSecondary" component="p">
      This will permanently delete your application for&nbsp;
      <Span>{applicationToDelete.position}</Span>
      &nbsp;position at <Span>{applicationToDelete.organization}</Span>.
    </Typography>
  );
}

function DeleteManyMessages({
  applicationsToDelete,
}: {
  applicationsToDelete: CustomApplication[] | null;
}) {
  if (!applicationsToDelete || applicationsToDelete.length === 0) return null;
  return (
    <>
      <Typography variant="body1" color="textSecondary" component="p">
        This will permanently delete the following applications:
      </Typography>
      <List sx={{ listStyleType: "disc", pl: 4 }}>
        {applicationsToDelete.map((app) => (
          <ListItem key={app.id} sx={{ display: "list-item", py: 0, pl: 0 }}>
            <Span>{app.position}</Span>
            <Span color="textSecondary" fontWeight="normal">
              &nbsp;
              {app.organization && "–"} {app.organization}
            </Span>
          </ListItem>
        ))}
      </List>
      <Typography variant="body1" color="textSecondary" component="p">
        Once deleted, it cannot be undone.
      </Typography>
    </>
  );
}
export default ApplicationsTable;
