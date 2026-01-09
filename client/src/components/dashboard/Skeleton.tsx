import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export default function DashboardSkeleton() {
  return (
    <Stack
      component="div"
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
          height: "100%",
          minHeight: 0,
          gap: 2,
        }}
      >
        {/* Top Row: KPI Cards */}
        <Grid container spacing={2} sx={{ flexShrink: 0 }} height={130}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Grid key={i} size={4}>
              <Skeleton variant="rounded" height={130} animation="wave" />
            </Grid>
          ))}
        </Grid>

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
            <Skeleton variant="rounded" animation="wave" height="100%" />
          </Grid>
          <Grid size={4} sx={{ height: "100%" }}>
            <Stack spacing={2} height="100%" display="flex" minHeight={0}>
              <Skeleton variant="rounded" animation="wave" height="100%" />
              <Skeleton variant="rounded" animation="wave" height="100%" />
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
        <Skeleton variant="rounded" animation="wave" height="100%" />
      </Box>
    </Stack>
  );
}
