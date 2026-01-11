import type { ChartData } from "@/lib/types/dashboard";
import { PieChart } from "@mui/x-charts/PieChart";

export default function DonutChart({
  data = [], // array of { label, value, color }
}: {
  data: ChartData[];
}) {
  const chartData = data.map((item, i) => ({
    id: i,
    label: item.label,
    value: item.value,
  }));

  return (
    <PieChart
      series={[
        {
          data: chartData,
          innerRadius: "50%",
          outerRadius: "100%",
          cornerRadius: 2,
          paddingAngle: 2,
        },
      ]}
      height={undefined}
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        p: 1,
        minHeight: 0,
        "& .MuiChartsLegend-root": {
          gap: 1.25,
        },
      }}
    />
  );
}
