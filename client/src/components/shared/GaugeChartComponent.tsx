import { PieChart } from "@mui/x-charts/PieChart";

export type DonutChartData = {
  label: string;
  value: number;
};

type DonutChartProps = {
  title?: string;
  statusConfig?: DonutChartData[];
};

export default function DonutChart({
  title,
  statusConfig = [], // array of { label, value, color }
}: DonutChartProps) {
  const data = statusConfig.map((item, i) => ({
    id: i,
    label: item.label,
    value: item.value,
  }));

  return (
    <PieChart
      series={[
        {
          data,
          innerRadius: 40,
          outerRadius: 80,
          cornerRadius: 2,
          paddingAngle: 2,
          startAngle: -90,
          endAngle: 90,
        },
      ]}
      slotProps={{
        legend: {
          direction: "horizontal",
          position: { vertical: "bottom", horizontal: "center" },
        },
      }}
      title={title ?? ""}
      sx={{
        p: 0,
        "& .MuiChartsLegend-horizontal": {
          display: "flex",
          justifyContent: "center",
          marginTop: "-230px",
        },
      }}
    />
  );
}
