import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function ApplicationTableSkeleton() {
  return (
    <Stack gap={1.5} useFlexGap height="100%">
      <Stack direction="column" spacing={0}>
        <Stack
          direction="row"
          justifyContent="space-between"
          mb={2}
          alignItems="end"
        >
          <Skeleton variant="rounded" width={170} height={32} />
          <Skeleton variant="rounded" width={120} height={40} />
        </Stack>
        <Stack direction="row">
          <Skeleton variant="text" width={200} height={32} sx={{ mr: 2 }} />

          <Stack direction="row" spacing={2} justifyContent="end" flexGrow={1}>
            <Skeleton variant="rounded" width={280} height={40} />

            <Skeleton variant="rounded" width={92} height={40} />
          </Stack>
        </Stack>
      </Stack>
      <Skeleton variant="rounded" width="100%" height="100%" />
    </Stack>
  );
}
