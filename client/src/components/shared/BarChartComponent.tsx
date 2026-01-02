import { chartsGridClasses } from "@mui/x-charts/ChartsGrid";
import { BarChart } from "@mui/x-charts";

export type BartChartData = {
  label: string;
  value: number;
  color: string;
};

type BarChartProps = {
  title?: string;
  data?: BartChartData[];
};

export default function BarChartComponent({ title, data = [] }: BarChartProps) {
  const labels = data.map((item) => item.label);
  const values = data.map((item) => item.value);

  const colors = data.map((item) => item.color || "#3B82F6");

  return (
    <BarChart
      yAxis={[{ width: 30 }]}
      xAxis={[
        {
          id: "labels",
          data: labels,
          scaleType: "band",
          colorMap: { type: "ordinal", colors: colors },
        },
      ]}
      series={[
        {
          data: values,
          label: title,
        },
      ]}
      borderRadius={2}
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
