import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getExpandedRowModel,
  type RowSelectionState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { getColumns, type ApplicationTableData } from "./Columns";
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
import { useApplicationTable } from "@/store/application/applicationStore";
import useShallowStore from "@/store/useShallowStore";
import { useDialogStore } from "@/store/dialog/dialogStore";
import Span from "../shared/typography/Span";
import { useApplications } from "@/utils/hooks/useApplications";
import { useNavigate } from "react-router";
import ExpandedRow from "./ExpandedRow";
import Stack from "@mui/material/Stack";
import TablePagination from "./TablePagination";
import {
  handleRowSelectionChange,
  handleSort,
} from "@/utils/application/table";
type ApplicationsTableProps = {
  data: ApplicationTableData[];
};

const NARROW_COLUMNS = ["checkbox", "actions"];

function ApplicationsTable({ data }: ApplicationsTableProps) {
  const navigate = useNavigate();
  const {
    sortBy,
    sortOrder,
    pageSize,
    filteredCount,
    setSortBy,
    setSortOrder,
    setSelectedApplications,
  } = useShallowStore(useApplicationTable, (state) => ({
    sortBy: state.sortBy,
    sortOrder: state.sortOrder,
    pageSize: state.pagination.pageSize,
    filteredCount: state.pagination.filteredCount,
    setSortBy: state.setSortBy,
    setSortOrder: state.setSortOrder,
    setSelectedApplications: state.setSelectedApplications,
  }));

  const openConfirmation = useDialogStore((state) => state.openConfirmation);

  const { deleteApplication, invalidateQueries } = useApplications();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const columns = useMemo(() => getColumns(), []);
  const table = useReactTable({
    data,
    columns: columns,
    state: {
      sorting: [{ id: sortBy, desc: sortOrder === "desc" }],
      rowSelection,
    },
    meta: {
      onEditRow: (row: ApplicationTableData) => {
        navigate(`/applications/${row.id}/edit`);
      },
      onDeleteRow: (row: ApplicationTableData) => {
        setSelectedApplications([row]);
        openConfirmation({
          title: "Are you sure?",
          message: <DeleteOneMessage applicationToDelete={row} />,
          type: "error",
          icon: "delete",
          onConfirm: () => deleteApplication(row.id),
        });
      },
    },
    getRowId: (row) => row.id,
    onRowSelectionChange: (updater) =>
      handleRowSelectionChange(
        updater,
        rowSelection,
        data,
        setRowSelection,
        setSelectedApplications,
        setIsFilterOpen,
      ),
    onSortingChange: (updater) =>
      handleSort(updater, setSortBy, setSortOrder, invalidateQueries),
    manualSorting: true,
    enableSortingRemoval: true,
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <Stack gap={1.5} useFlexGap>
      <Toolbar
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        rowSelection={rowSelection}
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
              fontFamily: "Inter",
            },
            "& .MuiTableCell-head": {
              position: "relative",
              bgcolor: blueGrey[50],
              py: 1,
            },
            //Header dividers
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
                    sx={{
                      px: NARROW_COLUMNS.includes(
                        header.column.columnDef.id || "",
                      )
                        ? "8px !important"
                        : 1.5,
                    }}
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
                    {row.getVisibleCells().map((cell) => {
                      const alignment =
                        cell.column.columnDef.meta?.align || "left";

                      return (
                        <TableCell
                          key={cell.id}
                          align={alignment}
                          sx={{
                            px: NARROW_COLUMNS.includes(
                              cell.column.columnDef.id || "",
                            )
                              ? "8px !important"
                              : 1.5,
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>

                  {/* The Expanded Row Content */}
                  {row.getIsExpanded() && (
                    <TableRow
                      sx={{
                        bgcolor: (theme) => alpha(theme.palette.grey[50], 0.75),
                      }}
                    >
                      <TableCell colSpan={row.getVisibleCells().length}>
                        <ExpandedRow row={row} />
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
                    <Typography variant="body1">No results found</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {filteredCount! > pageSize! && <TablePagination />}
    </Stack>
  );
}

function DeleteOneMessage({
  applicationToDelete,
}: {
  applicationToDelete: ApplicationTableData | null;
}) {
  if (!applicationToDelete) return null;
  return (
    <Typography variant="body1" color="textSecondary" component="p">
      This will permanently delete your application for&nbsp;
      <Span>{applicationToDelete.position}</Span>
      &nbsp;position at <Span>{applicationToDelete.company}</Span>.
    </Typography>
  );
}

export default ApplicationsTable;
