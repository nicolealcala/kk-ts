import DonutChartComponent from "@/components/shared/GaugeChartComponent";
import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

const statusConfig = [
  { label: "Applied", value: 60 },
  { label: "Interviewing", value: 40 },
  { label: "Offered", value: 20 },
  { label: "Rejected", value: 25 },
  { label: "Hired", value: 4 },
  { label: "Ghosted", value: 10 },
];

function ApplicationStatusChart() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1.5}
      borderRadius={2}
      p={2}
      className="w-full h-full bg-white border"
      height={250}
    >
      <Typography variant="body2">Application Status</Typography>
      <Divider />
      <DonutChartComponent
        title="Application Status Breakdown"
        statusConfig={statusConfig}
      />
    </Box>
  );
}

export default ApplicationStatusChart;
