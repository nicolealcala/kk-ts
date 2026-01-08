import type { KPISupportingData } from "@/lib/types/dashboard";
import { LineChart } from "@mui/x-charts/LineChart";

export type GradientStops = {
  offset: number;
  stopColor: string;
};

const gradients = [
  { offset: 0, stopColor: "#7c86ff" }, // Top color
  { offset: 100, stopColor: "rgba(131, 166, 255, 0)" }, // Bottom (transparent)
];
function GradientFill({
  gradientStops = gradients,
}: {
  gradientStops?: GradientStops[];
}) {
  return (
    <svg width="0" height="0">
      <defs>
        <linearGradient
          id={`areaGradient-${gradientStops[0].stopColor}`}
          x1="0"
          y1="0"
          x2="0"
          y2="100%" // Vertical gradient
        >
          {gradientStops.map((stop, index) => (
            <stop
              key={index}
              offset={`${stop.offset}%`}
              stopColor={stop.stopColor}
            />
          ))}
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function AreaChartComponent({
  data,
  areaGradients,
  color,
}: {
  areaGradients: GradientStops[];
  color: string;
  data: KPISupportingData[];
}) {
  return (
    <LineChart
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      xAxis={[
        {
          data: data.map((d) => d.label),
          scaleType: "point",
          position: "none",
        },
      ]}
      yAxis={[{ position: "none" }]}
      series={[
        {
          data: data.map((d) => d.value),
          area: true,
          color: color || "#6708fa",
          showMark: false,
        },
      ]}
      sx={{
        p: 0,
        "& .MuiAreaElement-root": {
          fill: `url(#areaGradient-${areaGradients[0].stopColor})`,
        },
      }}
    >
      <GradientFill gradientStops={areaGradients} />
    </LineChart>
  );
}
