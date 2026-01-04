import ApplicationsVolumeChart from "@/components/dashboard/ApplicationsVolumeChart";
import ApplicationStatusChart from "@/components/dashboard/ApplicationStatusChart";
import Box from "@mui/material/Box";
import ChartKpi, { type ChartKpiProps } from "@/components/dashboard/ChartKpi";
import WeeklySchedule from "@/components/dashboard/WeeklySchedule";
import { useState } from "react";

export default function DashboardPage() {
  const charts: ChartKpiProps[] = [
    {
      title: "Funnel Yield",
      value: "50%",
      areaGradients: [
        { offset: 0, stopColor: "#bca8ff" },
        { offset: 100, stopColor: "#d8cfff" },
      ],
      color: "#813fff",
      sentiment: "positive",
    },
    {
      title: "Top Source",
      value: "JobStreet",
      areaGradients: [
        { offset: 0, stopColor: "#fea3d7" },
        { offset: 100, stopColor: "#feccea" },
      ],
      color: "#fc6abb",
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

  return (
    <Box
      component="article"
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        height: "100%",
        minHeight: 0,
      }}
    >
      {/* LEFT COLUMN */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "75%",
          height: "100%",
          minHeight: 0,
          gap: 2,
        }}
      >
        {/* Top Row: KPI Cards */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {charts.map((chart, i) => (
            <Box key={i} sx={{ flex: 1, minWidth: 0 }}>
              <ChartKpi chart={chart} />
            </Box>
          ))}
        </Box>

        {/* Bottom Row: The Volume Chart */}
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            position: "relative",
          }}
        >
          <ApplicationsVolumeChart />
        </Box>
      </Box>

      {/* RIGHT COLUMN */}
      <RightColumn />
    </Box>
  );
}

function RightColumn() {
  const [isScheduleExpanded, setIsScheduleExpanded] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: isScheduleExpanded ? 0 : 2,
        width: "25%",
        height: "100%",
        minHeight: 0,
        transition: "gap 0.4s ease-in-out",
      }}
    >
      <Box
        sx={{
          flex: isScheduleExpanded ? 0 : 1,
          opacity: isScheduleExpanded ? 0 : 1,
          visibility: isScheduleExpanded ? "hidden" : "visible",
          minHeight: 0,
          overflow: "hidden",
          transition:
            "flex 0.4s ease-in-out, opacity 0.2s ease-in-out, visibility 0.3s",
        }}
      >
        <ApplicationStatusChart />
      </Box>

      <Box
        sx={{
          flex: 1.5,
          minHeight: 0,
        }}
      >
        <WeeklySchedule
          isScheduleExpanded={isScheduleExpanded}
          setIsScheduleExpanded={setIsScheduleExpanded}
        />
      </Box>
    </Box>
  );
}
