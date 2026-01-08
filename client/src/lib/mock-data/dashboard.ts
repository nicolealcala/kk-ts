import type { ChartKpiProps } from "@/components/dashboard/ChartKpi";

export const charts: ChartKpiProps[] = [
  {
    title: "Funnel Yield",
    value: "50%",
    areaGradients: [
      { offset: 0, stopColor: "#c4b4ff" },
      { offset: 100, stopColor: "#ddd6ff" },
    ],
    color: "#813fff",
    sentiment: "positive",
  },
  {
    title: "Top Source",
    value: "JobStreet",
    areaGradients: [
      { offset: 0, stopColor: "#b9f8cf" },
      { offset: 100, stopColor: "#dcfce7" },
    ],
    color: "#05df72",
    sentiment: "negative",
  },
  {
    title: "Avg. Wait Time",
    value: "5 Days",
    areaGradients: [
      { offset: 0, stopColor: "#ffdda5" },
      { offset: 100, stopColor: "#fff0d3" },
    ],
    color: "#ffa137",
    sentiment: "neutral",
  },
];
