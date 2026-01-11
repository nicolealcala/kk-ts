import { chartsGridClasses } from "@mui/x-charts/ChartsGrid";
import { BarChart } from "@mui/x-charts";
import type { VolumeTrendData } from "@/lib/types/dashboard";

export type BartChartData = {
  label: string;
  value: number;
  color?: string;
};

type BarChartProps = {
  title?: string;
  data: VolumeTrendData[];
};

export default function BarChartComponent({ title, data = [] }: BarChartProps) {
  const labels = data.map((item) => item.month);
  const values = data.map((item) => item.value);

  return (
    <BarChart
      yAxis={[{ width: 30 }]}
      xAxis={[
        {
          id: "labels",
          data: labels,
          scaleType: "band",
          colorMap: {
            type: "continuous",
            min: 0,
            max: labels.length - 1,
            color: ["#4caf50", "#ff9800"],
          },
        },
      ]}
      series={[
        {
          data: values,
          label: title,
        },
      ]}
      borderRadius={6}
      grid={{ horizontal: true }}
      title={title ?? ""}
      sx={{
        [`& .${chartsGridClasses.line}`]: {
          strokeDasharray: "5 3",
          strokeWidth: 1.5,
        },
      }}
    />
  );
}
