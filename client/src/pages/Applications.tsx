import Box from "@mui/material/Box";
import ApplicationsTable from "../components/applications/ApplicationsTable";
import EmptyApplications from "../components/applications/EmptyApplications";
import { mockData } from "../lib/table/applications";

export default function ApplicationsPage() {
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
      {mockData.length > 0 ? <ApplicationsTable /> : <EmptyApplications />}
    </Box>
  );
}
