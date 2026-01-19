import ApplicationsVolumeChart from "@/components/dashboard/ApplicationsVolumeChart";
import ApplicationStatusChart from "@/components/dashboard/ApplicationStatusChart";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useQuery } from "@tanstack/react-query";
import { getCurrentYear } from "@/utils/date";
import DashboardSkeleton from "@/components/dashboard/Skeleton";
import type { KPIChartType } from "@/lib/types/dashboard";
import Kpi from "@/components/dashboard/Kpi";
import Week from "@/components/dashboard/WeeklySchedule";

export default function Dashboard() {
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
    <Stack
      component="article"
      direction="row"
      spacing={2}
      sx={{
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
          height: "100%", // Parent must have height for flex: 1 to work
          minHeight: 0,
          gap: 2,
        }}
      >
        {/* Top Row: KPI Cards */}
        {data?.kpis && Object.keys(data.kpis).length > 0 ? (
          <Grid container spacing={2} sx={{ flexShrink: 0 }} height={130}>
            {Object.keys(data.kpis).map((key) => {
              const kpiData = data.kpis[key];
              const sentiment = kpiData.sentiment;

              return (
                <Grid key={key} size={4}>
                  <Kpi
                    title={key as KPIChartType}
                    sentiment={
                      sentiment === 0
                        ? "neutral"
                        : sentiment > 0
                        ? "positive"
                        : "negative"
                    }
                    value={data.kpis[key].result}
                  />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <p>No KPI data found for {currentYear}</p>
        )}

        {/* Bottom Row: Main Charts */}
        <Grid
          container
          spacing={2}
          alignItems="flex-start"
          sx={{
            flex: 1,
            minHeight: 0,
          }}
        >
          <Grid size={8} sx={{ height: "100%" }}>
            <Box sx={{ height: "100%", position: "relative" }}>
              <ApplicationsVolumeChart data={data?.volumeTrend || []} />
            </Box>
          </Grid>
          <Grid size={4} sx={{ height: "100%" }}>
            <Stack spacing={2} height="100%" minHeight={0}>
              <ApplicationStatusChart data={data?.applicationStatus || []} />
              <ApplicationStatusChart data={data?.applicationStatus || []} />
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* RIGHT COLUMN */}
      <Box
        sx={{
          width: "25%",
          height: "100%",
          minHeight: 0,
        }}
      >
        <Week schedule={data?.weeklySchedule || []} />
      </Box>
    </Stack>
  );
}
