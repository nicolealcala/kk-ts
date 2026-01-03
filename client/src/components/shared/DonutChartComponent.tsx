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
        },
      ]}
      title={title ?? ""}
      height={undefined}
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        minHeight: 0,
        "& .MuiChartsLegend-root": {
          gap: 1.5,
        },
      }}
    />
  );
}
