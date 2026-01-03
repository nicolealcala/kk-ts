import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AreaChartComponent from "../shared/AreaChartComponent";
import Divider from "@mui/material/Divider";

type ChartKpiProps = {
  title: string;
  value: string;
};
export default function ChartKpi({ chart }: { chart: ChartKpiProps }) {
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
      }}
    >
      <Typography
        variant="body2"
        fontWeight={500}
        sx={{ fontWeight: 600, mb: 1 }}
      >
        {chart.title}
      </Typography>
      <Divider />
      <Box display="flex" alignItems="end" gap={2.5} height={100}>
        <Typography variant="h6" component="h1" fontWeight={600}>
          {chart.value}
        </Typography>
        <AreaChartComponent />
      </Box>
    </Paper>
  );
}
