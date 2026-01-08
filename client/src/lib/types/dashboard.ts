export interface ChartData {
  label: string;
  value: number;
}

export type KPIChartType = "funnelYield" | "avgWaitTime" | "topSource";

export interface KPIChartData {
  result: string | number;
  sentiment: number;
  data: ChartData[];
}

export type KPISentiment = "positive" | "negative" | "neutral";

export interface DashboardData {
  kpis: {
    funnelYield: KPIChartData;
    topSource: KPIChartData;
    avgWaitTime: KPIChartData;
  };
  volumeTrend: ChartData[];
  applicationStatus: ChartData[];
}
