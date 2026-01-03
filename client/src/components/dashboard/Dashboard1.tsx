import ApplicationsVolumeChart from "@/components/dashboard/ApplicationsVolumeChart";
import ApplicationStatusChart from "@/components/dashboard/ApplicationStatusChart";
import Box from "@mui/material/Box";
import ChartKpi from "@/components/dashboard/ChartKpi";
import WeeklySchedule from "@/components/dashboard/WeeklySchedule";

export default function Dashboard1() {
  const charts = [
    { title: "Funnel Yield", value: "50%" },
    { title: "Top Source", value: "Indeed" },
    { title: "Avg. Wait Time", value: "5 Days" },
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
        <Box sx={{ display: "flex", flex: 1, gap: 2, minHeight: 0 }}>
          <Box
            sx={{
              flex: 2.05,
              minHeight: 0,
            }}
          >
            <ApplicationsVolumeChart />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              flex: 1,
              minHeight: 0,
            }}
          >
            <ApplicationStatusChart />
            <ApplicationStatusChart />
          </Box>
        </Box>
      </Box>

      {/* RIGHT COLUMN */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "25%",
          height: "100%",
          minHeight: 0,
        }}
      >
        <WeeklySchedule />
      </Box>
    </Box>
  );
}
