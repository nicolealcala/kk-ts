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
import React from "react";
type ToolbarProps = {
  globalFilter: string;
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
  globalFilter,
  setGlobalFilter,
  isFilterOpen,
  setIsFilterOpen,
  filters,
  dispatch,
  rowSelection,
  handleDeleteMany,
}: ToolbarProps) {

  React.useEffect(() => {}, [rowSelection]);

  return (
    <Stack direction="column" spacing={1} mb={1.5}>
      <Stack direction="row">
        <Typography
          variant="body1"
          component="p"
          alignSelf="end"
          mr={2}
          fontWeight="medium"
        >
          Showing 1-4 out of 4
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="end" flexGrow={1}>
          <FormTextField
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
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
          <Divider />
          <ApplicationFilters filters={filters} dispatch={dispatch} />
        </>
      )}
    </Stack>
  );
}
