import DonutChartComponent from "@/components/shared/DonutChartComponent";
import type { ChartData } from "@/lib/types/dashboard";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function ApplicationStatusChart({
  data,
  maxHeight = "400px",
}: {
  data: ChartData[];
  maxHeight?: string;
}) {
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
        maxHeight,
      }}
    >
      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
        Application Status
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <DonutChartComponent data={data} />
    </Paper>
  );
}

export default ApplicationStatusChart;
