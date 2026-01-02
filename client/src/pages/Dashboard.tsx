import ApplicationsVolumeChart from "@/components/dashboard/ApplicationsVolumeChart";
import ApplicationStatusChart from "@/components/dashboard/ApplicationStatusChart";
import Box from "@mui/material/Box";
import ChartKpi from "@/components/dashboard/ChartKpi";

export default function DashboardPage() {
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
        width: "100%",
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
        <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
          {charts.map((chart, i) => (
            <Box key={i} sx={{ flex: 1, minWidth: 0 }}>
              <ChartKpi chart={chart} />
            </Box>
          ))}
        </Box>

        {/* Bottom Row: The Volume Chart (The "Problem Child") */}
        <Box
          sx={{
            flex: 1, // Take all remaining vertical space
            minHeight: 0, // Crucial: break the expansion loop
            position: "relative", // Needed for the absolute-lock fix
            width: "100%",
          }}
        >
          <Box sx={{ position: "absolute", inset: 0 }}>
            <ApplicationsVolumeChart />
          </Box>
        </Box>
      </Box>

      {/* RIGHT COLUMN */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "25%",
          height: "100%",
          minHeight: 0,
        }}
      >
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            position: "relative",
          }}
        >
          <Box sx={{ position: "absolute", inset: 0 }}>
            <ApplicationStatusChart />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
