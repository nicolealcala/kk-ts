import Box from "@mui/material/Box";
import ApplicationsTable from "../components/applications/ApplicationsTable";
//import EmptyApplications from "../components/applications/EmptyApplications";
import { useQuery } from "@tanstack/react-query";
import { getApplications } from "@/lib/services/applicationsService";

export default function ApplicationsPage() {
  const currentLocalDate = new Date().toLocaleDateString();

  const { isPending, data } = useQuery({
    queryKey: ["applications"],
    queryFn: () => getApplications(currentLocalDate),
  });

  console.log(data);

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
      {data && <ApplicationsTable loading={isPending} rows={data} />}
    </Box>
  );
}
