import ApplicationsVolumeChart from "@/components/dashboard/ApplicationsVolumeChart";
import ApplicationStatusChart from "@/components/dashboard/ApplicationStatusChart";
import Box from "@mui/material/Box";
import ChartKpi from "@/components/dashboard/ChartKpi";
import { RightColumn } from "@/pages/Dashboard";
import { charts } from "@/lib/mock-data/dashboard";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

export default function Dashboard1() {
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
          height: "100%", // Parent must have height for flex: 1 to work
          minHeight: 0,
          gap: 2,
        }}
      >
        {/* Top Row: KPI Cards */}
        <Grid container spacing={2} sx={{ flexShrink: 0 }}>
          {charts.map((chart, i) => (
            <Grid key={i} size={4}>
              <ChartKpi chart={chart} />
            </Grid>
          ))}
        </Grid>

        {/* Bottom Row: Main Charts */}
        <Grid
          container
          spacing={2}
          alignItems="flex-start" // <--- CRITICAL: Prevents children from stretching vertically
          sx={{
            flex: 1, // <--- Fills the remaining vertical space
            minHeight: 0, // <--- Allows children to respect the container boundary
          }}
        >
          <Grid size={8} sx={{ height: "100%" }}>
            <Box sx={{ height: "100%", position: "relative" }}>
              <ApplicationsVolumeChart />
            </Box>
          </Grid>
          <Grid size={4} sx={{ height: "100%" }}>
            <Stack spacing={2} height="100%" minHeight={0}>
              <ApplicationStatusChart />
              <ApplicationStatusChart />
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* RIGHT COLUMN */}
      <RightColumn initialData={true} />
    </Box>
  );
}
