import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export default function ApplicationsSkeleton() {
  return (
    <Stack
      component="div"
      direction="column"
      spacing={2}
      sx={{
        height: "100%",
        minHeight: 0,
      }}
    >
      {/* TOP COLUMN */}
      <Stack
        component="div"
        direction="column"
        spacing={3}
        sx={{
          height: "20%",
          minHeight: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Skeleton
            variant="rounded"
            animation="wave"
            height="80%"
            width="25%"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            height="100%"
            width="10%"
          />
        </Box>

        <Box
          display="flex"
          height="100%"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Skeleton
            variant="rounded"
            animation="wave"
            height="70%"
            width="25%"
          />
          <Box display="flex" gap={2} width="30%" mt={0} height="100%">
            <Skeleton
              variant="rounded"
              animation="wave"
              height="100%"
              width="75%"
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              height="100%"
              width="25%"
            />
          </Box>
        </Box>
      </Stack>
      {/* BOTTOM COLUMN */}
      <Box
        sx={{
          width: "100%",
          height: "90%",
          minHeight: 0,
        }}
      >
        <Skeleton variant="rounded" animation="wave" height="100%" />
      </Box>
    </Stack>
  );
}
