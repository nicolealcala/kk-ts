import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import { getApplications } from "@/lib/services/applicationsService";
import ApplicationsTable from "../components/applications/ApplicationsTable";

export default function ApplicationsPage() {
  const currentLocalDate = new Date().toLocaleDateString();

  const { isPending, data } = useQuery({
    queryKey: ["applications"],
    queryFn: () => getApplications(currentLocalDate),
  });

  if (isPending) {
    return <div>Loading applications...</div>;
  }
  return (
    <Box
      component="article"
      sx={{
        position: "relative",
        display: "flex",
        height: "100%",
        minHeight: 0,
        width: "100%",
      }}
    >
      {data && (
        <ApplicationsTable
          data={data.applications}
          totalCount={data.totalCount}
        />
      )}
    </Box>
  );
}
