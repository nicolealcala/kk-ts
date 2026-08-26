import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormTextField from "../shared/form/FormTextField";
import Button from "@mui/material/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Divider from "@mui/material/Divider";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useEffectEvent, useState } from "react";
import { useApplicationTable } from "@/store/application/applicationStore";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import useShallowStore from "@/store/useShallowStore";
import Filters from "./Filters";
import type { ApplicationTableData } from "./Columns";
import { useDialogStore } from "@/store/dialog/dialogStore";
import { useApplicationsData } from "@/utils/hooks/useApplicationsData";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Span from "../shared/typography/Span";
import useDebounced from "@/utils/hooks/useDebounced";

const filterStyles = {
  open: {
    bgcolor: "primary.main",
  },
  closed: {
    bgcolor: "grey.100",
    color: "text.primary",
  },
};
export default function Toolbar() {
  const {
    searchTerm,
    workArrangement,
    status,
    selectedApplications,
    setSearchTerm,
    resetFilters,
  } = useShallowStore(useApplicationTable, (state) => ({
    searchTerm: state.searchTerm,
    workArrangement: state.workArrangementFilters,
    status: state.statusFilters,
    selectedApplications: state.selectedApplications,
    setSearchTerm: state.setSearchTerm,
    resetFilters: state.resetFilters,
  }));

  const { page, pageSize, filteredCount, totalCount } = useShallowStore(
    useApplicationTable,
    (state) => ({
      page: state.pagination.page,
      pageSize: state.pagination.pageSize,
      filteredCount: state.pagination.filteredCount,
      totalCount: state.pagination.totalCount,
    }),
  );

  const openConfirmationDialog = useDialogStore(
    (state) => state.openConfirmation,
  );

  const { invalidateQueries } = useApplicationsData();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const debouncedValue = useDebounced(searchTerm);

  const invalidateQueriesEffect = useEffectEvent(() =>
    invalidateQueries(["applicationsData"]),
  );
  useEffect(() => {
    if (searchTerm === debouncedValue) invalidateQueriesEffect();
  }, [searchTerm, debouncedValue]);

  const startIndex = page && pageSize ? (page - 1) * pageSize + 1 : null;
  const endIndex =
    page && pageSize && filteredCount
      ? filteredCount > page * pageSize
        ? page * pageSize
        : filteredCount
      : null;

  const { deleteApplication } = useApplicationsData();

  const handleDeleteMany = () => {
    openConfirmationDialog({
      title: "Are you sure?",
      message: (
        <DeleteManyMessages applicationsToDelete={selectedApplications} />
      ),
      onConfirm: () => deleteApplication(selectedApplications.map((s) => s.id)),
    });
  };
  return (
    <Stack direction="column" spacing={0}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography
          variant="h5"
          component="h1"
          alignSelf="end"
          fontWeight="semiBold"
        >
          {totalCount} applications
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          //onClick={() => setOpenDrawer("create")}
        >
          Add new
        </Button>
      </Stack>
      <Stack direction="row" mb={1.5}>
        {page && pageSize && (
          <Typography
            variant="body1"
            component="p"
            alignSelf="end"
            mr={2}
            fontWeight="medium"
          >
            Showing {startIndex} - {endIndex} out of {filteredCount}
          </Typography>
        )}
        <Stack direction="row" spacing={2} justifyContent="end" flexGrow={1}>
          <FormTextField
            value={searchTerm ?? ""}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              resetFilters();
            }}
          >
            Filter
            {workArrangement ||
              (status && (
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
                  {Number(Boolean(workArrangement)) + Number(Boolean(status))}
                </Typography>
              ))}
          </Button>

          {selectedApplications.length > 1 && (
            <Button color="error" variant="outlined" onClick={handleDeleteMany}>
              <TrashIcon className="size-4.5 mr-2" />
              Delete {selectedApplications.length} selected
            </Button>
          )}
        </Stack>
      </Stack>
      {isFilterOpen && (
        <>
          <Divider sx={{ mb: 2.5 }} />
          <Filters />
        </>
      )}
    </Stack>
  );
}

function DeleteManyMessages({
  applicationsToDelete,
}: {
  applicationsToDelete: ApplicationTableData[] | null;
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
              {app.company && "–"} {app.company}
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
