import DonutChartComponent from "@/components/shared/DonutChartComponent";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

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
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        borderRadius: 2,
        height: "100%",
        minHeight: 0,
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
        Application Status
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <DonutChartComponent
        title="Application Status Breakdown"
        statusConfig={statusConfig}
      />
    </Paper>
  );
}

export default ApplicationStatusChart;
