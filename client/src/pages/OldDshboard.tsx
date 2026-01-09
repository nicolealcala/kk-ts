import ApplicationsVolumeChart from "@/components/dashboard/ApplicationsVolumeChart";
import ApplicationStatusChart from "@/components/dashboard/ApplicationStatusChart";
import Box from "@mui/material/Box";
import ChartKpi from "@/components/dashboard/ChartKpi";
import WeeklySchedule from "@/components/dashboard/OldWeeklySchedule";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentYear } from "@/lib/utils/date";
import DashboardSkeleton from "@/components/dashboard/Skeleton";
import type { ChartData, KPIChartType } from "@/lib/types/dashboard";
import type { Schedule } from "@/lib/types/schedules";

export default function DashboardPage() {
  const currentYear = getCurrentYear();
  const { isLoading, data, error } = useQuery({
    queryKey: [`dashboard-${currentYear}`],
    queryFn: async () => {
      return fetch(
        `${import.meta.env.VITE_BASE_URL}/api/dashboard/${currentYear}`
      ).then((res) => res.json());
    },
  });

  if (isLoading) return <DashboardSkeleton />;

  if (error) return <p>Error: {error.message}</p>;

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
        {data?.kpis && Object.keys(data.kpis).length > 0 ? (
          <Box sx={{ display: "flex", gap: 2 }}>
            {Object.keys(data.kpis).map((key) => {
              const kpiData = data.kpis[key];
              const sentiment = kpiData.sentiment;
              return (
                <Box key={key} sx={{ flex: 1, minWidth: 0 }}>
                  <ChartKpi
                    title={key as KPIChartType}
                    sentiment={
                      sentiment === 0
                        ? "neutral"
                        : sentiment > 0
                        ? "positive"
                        : "negative"
                    }
                    value={data.kpis[key].result}
                    data={kpiData.data}
                  />
                </Box>
              );
            })}
          </Box>
        ) : (
          <p>No KPI data found for {currentYear}</p>
        )}

        {/* Bottom Row: The Volume Chart */}
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            position: "relative",
          }}
        >
          <ApplicationsVolumeChart data={data?.volumeTrend || []} />
        </Box>
      </Box>

      {/* RIGHT COLUMN */}
      <RightColumn
        applicationStatusData={data?.applicationStatus || []}
        weeklySchedule={data?.weeklySchedule || []}
      />
    </Box>
  );
}

export function RightColumn({
  applicationStatusData,
  weeklySchedule,
  initialState = false,
}: {
  applicationStatusData: ChartData[];
  weeklySchedule: Schedule[];
  initialState?: boolean;
}) {
  const [isScheduleExpanded, setIsScheduleExpanded] = useState(initialState);

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
        <ApplicationStatusChart data={applicationStatusData} />
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
          schedule={weeklySchedule}
        />
      </Box>
    </Box>
  );
}
