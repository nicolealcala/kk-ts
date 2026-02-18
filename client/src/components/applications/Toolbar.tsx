/* eslint-disable @typescript-eslint/no-empty-object-type */
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormTextField from "../shared/form/FormTextField";
import Button from "@mui/material/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import type { FilterAction, FilterState } from "./ApplicationsTable";
import ApplicationFilters from "./ApplicationFilters";
import Divider from "@mui/material/Divider";
import { TrashIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import type { SortingState } from "@tanstack/react-table";

type ToolbarProps = {
  firstIndex: number;
  lastIndex: number;
  totalFilteredRows: number;
  globalFilter: string;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filters: FilterState;
  dispatch: React.ActionDispatch<[action: FilterAction]>;
  rowSelection: {};
  setRowSelection: React.Dispatch<React.SetStateAction<{}>>;
  handleDeleteMany: () => void;
};

const filterStyles = {
  open: {
    bgcolor: "primary.main",
  },
  closed: {
    bgcolor: "grey.100",
    color: "text.primary",
  },
};
export default function Toolbar({
  firstIndex,
  lastIndex,
  totalFilteredRows,
  globalFilter,
  setSorting,
  setGlobalFilter,
  isFilterOpen,
  setIsFilterOpen,
  filters,
  dispatch,
  rowSelection,
  handleDeleteMany,
}: ToolbarProps) {
  const [value, setValue] = useState(globalFilter);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGlobalFilter(value);
      setSorting([]);
    }, 300);

    return () => clearTimeout(timeout);
  }, [value, setGlobalFilter, setSorting]);

  return (
    <Stack direction="column" spacing={0}>
      <Stack direction="row" mb={1.5}>
        <Typography
          variant="body1"
          component="p"
          alignSelf="end"
          mr={2}
          fontWeight="medium"
        >
          Showing {firstIndex}-{lastIndex} out of {totalFilteredRows}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="end" flexGrow={1}>
          <FormTextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search all columns..."
            size="small"
            sx={{
              minWidth: "200px",
              maxWidth: "280px",
              height: 0,
            }}
            slotProps={{
              input: {
                sx: {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "divider",
                  },
                },
              },
            }}
          />

          <Button
            variant="contained"
            startIcon={
              isFilterOpen ? (
                <FilterAltIcon fontSize="small" />
              ) : (
                <FilterAltOutlinedIcon fontSize="small" />
              )
            }
            sx={{
              maxWidth: "fit-content",
              ...(isFilterOpen ? filterStyles.open : filterStyles.closed),
              "&:hover": {
                bgcolor: isFilterOpen ? "primary.dark" : "grey.200",
              },
            }}
            onClick={() => {
              setIsFilterOpen((prev) => !prev);
              dispatch({ type: "CLEAR_ALL" });
            }}
          >
            Filter
            {filters.count > 0 && (
              <Typography
                variant="body2"
                component="span"
                bgcolor="background.paper"
                color="primary.main"
                px={0.75}
                borderRadius={1.5}
                fontWeight="bold"
                width="20px"
                ml={1}
              >
                {filters.count}
              </Typography>
            )}
          </Button>

          {Object.keys(rowSelection).length > 0 && (
            <Button color="error" variant="outlined" onClick={handleDeleteMany}>
              <TrashIcon className="size-4.5 mr-2" />
              Delete {Object.keys(rowSelection).length} selected
            </Button>
          )}
        </Stack>
      </Stack>
      {isFilterOpen && (
        <>
          <Divider sx={{ mb: 2 }} />
          <ApplicationFilters
            filters={filters}
            dispatch={dispatch}
            setSorting={setSorting}
          />
        </>
      )}
    </Stack>
  );
}
