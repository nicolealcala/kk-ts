import ApplicationsVolumeChart from "@/components/dashboard/ApplicationsVolumeChart";
import ApplicationStatusChart from "@/components/dashboard/ApplicationStatusChart";
import Box from "@mui/material/Box";
import ChartKpi from "@/components/dashboard/ChartKpi";
import WeeklySchedule from "@/components/dashboard/WeeklySchedule";
import { useState } from "react";
import { charts } from "@/lib/mock-data/dashboard";
//import Dashboard1 from "@/components/dashboard/Dashboard1";

export default function DashboardPage() {
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
    // <Dashboard1 />
  );
}

export function RightColumn({
  initialData = false,
}: {
  initialData?: boolean;
}) {
  const [isScheduleExpanded, setIsScheduleExpanded] = useState(initialData);

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
