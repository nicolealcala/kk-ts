import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function SchedulesSkeleton() {
  return (
    <Stack
      component="article"
      direction="row"
      spacing={2}
      position="relative"
      sx={{
        minHeight: 0,
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "20%",
        }}
      >
        <Skeleton variant="rounded" animation="wave" height={150} />
      </Box>
      <Box
        sx={{
          width: "80%",
        }}
      >
        <Skeleton variant="rounded" animation="wave" height="100%" />
      </Box>
    </Stack>
  );
}
