import ApplicationsTable from "../components/applications/ApplicationsTable";
import Stack from "@mui/material/Stack";
import EmptyApplications from "@/components/applications/EmptyApplications";
import { useApplications } from "@/utils/hooks/useApplications";
import { useApplicationTable } from "@/store/application/applicationStore";
import { useEffect } from "react";
import { getApplicationTableStateFromUrl } from "@/utils/url";

export default function ApplicationsPage() {
  useEffect(() => {
    const urlState = getApplicationTableStateFromUrl(location.search);

    useApplicationTable.setState((state) => ({
      ...state,
      ...urlState,
      pagination: {
        ...state.pagination,
        ...(urlState.pagination ?? {}),
      },
    }));
  }, []);

  const { applicationsList } = useApplications();
  const { data, error } = applicationsList;

  const totalCount = useApplicationTable(
    (state) => state.pagination.totalCount,
  );

  if (error) <p>Error: {error.message}</p>;

  return (
    <Stack
      component="article"
      spacing={3.5}
      p={3}
      pt={4}
      sx={{
        height: "100%",
        minHeight: 0,
        width: "100%",
      }}
      className="thin-scrollbar"
    >
      {data && totalCount && totalCount > 0 ? (
        <ApplicationsTable data={data ?? []} />
      ) : (
        <EmptyApplications />
      )}
    </Stack>
  );
}
