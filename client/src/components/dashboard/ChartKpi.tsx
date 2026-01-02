import { Box, Typography } from "@mui/material";
import AreaChartComponent from "../shared/AreaChartComponent";

type ChartKpiProps = {
  title: string;
  value: string;
};
export default function ChartKpi({ chart }: { chart: ChartKpiProps }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      p={2}
      borderRadius={2}
      className="border bg-white"
    >
      <Typography variant="body2" fontWeight={500} mb={1}>
        {chart.title}
      </Typography>
      <Box display="flex" alignItems="end" gap={2.5} height={100}>
        <Typography variant="h6" component="h1" fontWeight={600}>
          {chart.value}
        </Typography>
        <AreaChartComponent />
      </Box>
    </Box>
  );
}
