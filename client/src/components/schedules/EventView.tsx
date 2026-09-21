import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MarkdownPreview from "@uiw/react-markdown-preview";
import type { CalendarEvent } from "@/lib/types/schedules";
import Box from "@mui/material/Box";
import ScheduleChip from "../shared/ScheduleChip";
import { DateTime } from "luxon";
import Link from "@mui/material/Link";

type EventViewProps = {
  selectedEvent: CalendarEvent | null;
};
export default function EventView({ selectedEvent }: EventViewProps) {
  const duration =
    selectedEvent?.start && selectedEvent?.end
      ? (() => {
          const start = DateTime.fromJSDate(selectedEvent.start);
          const end = DateTime.fromJSDate(selectedEvent.end);
          const duration = end.diff(start, ["hours", "minutes"]).toObject();

          const hours = duration.hours ?? 0;
          const minutes = duration.minutes ?? 0;

          return [
            hours > 0 ? `${hours} ${hours === 1 ? "hour" : "hours"}` : "",
            minutes > 0
              ? `${minutes} ${minutes === 1 ? "minute" : "minutes"}`
              : "",
          ]
            .filter(Boolean)
            .join(" ");
        })()
      : "";
  return (
    <Stack useFlexGap spacing={2} minHeight="100%">
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="h5"
          component="h1"
          fontWeight="medium"
          display="flex"
          alignItems="center"
        >
          {selectedEvent?.title}
        </Typography>

        <IconButton>
          <EditOutlinedIcon />
        </IconButton>
      </Stack>

      <Divider />

      <Stack spacing={2} mt={2} useFlexGap>
        <ScheduleChip label={selectedEvent?.type || "interview"} />
        <Stack spacing={0.5}>
          <Stack
            spacing={2}
            direction="row"
            color={(theme) => alpha(theme.palette.text.primary, 0.75)}
          >
            <Typography>📅</Typography>
            <Typography>
              {selectedEvent?.start
                ? DateTime.fromJSDate(selectedEvent.start).toFormat(
                    "cccc, LLLL d",
                  )
                : ""}
            </Typography>
          </Stack>

          <Stack
            spacing={2}
            direction="row"
            color={(theme) => alpha(theme.palette.text.primary, 0.75)}
          >
            <Typography>🕐</Typography>
            <Typography>
              {selectedEvent?.start && selectedEvent?.end
                ? `${DateTime.fromJSDate(selectedEvent.start).toFormat(
                    "h:mm a",
                  )} - ${DateTime.fromJSDate(selectedEvent.end).toFormat("h:mm a")}`
                : ""}
            </Typography>
          </Stack>

          <Stack
            spacing={2}
            direction="row"
            color={(theme) => alpha(theme.palette.text.primary, 0.75)}
          >
            <Typography>⌛</Typography>
            <Typography>{duration}</Typography>
          </Stack>

          <Stack
            spacing={2}
            direction="row"
            color={(theme) => alpha(theme.palette.text.primary, 0.75)}
          >
            <Typography>📍</Typography>
            <Typography>Remote</Typography>
          </Stack>

          {selectedEvent?.modality === "remote" && selectedEvent?.link && (
            <Stack
              spacing={2}
              direction="row"
              color={(theme) => alpha(theme.palette.text.primary, 0.75)}
            >
              <Typography>🔗</Typography>
              <Link href={selectedEvent.link} target="_blank">
                {selectedEvent.link}
              </Link>
            </Stack>
          )}
        </Stack>
        <Divider sx={{ my: 3, mb: 2 }} />
        <Typography variant="h6" fontWeight="medium" mb={-0.5}>
          Event Details
        </Typography>
        <Box bgcolor="slate.extraLight" p={2} borderRadius={3}>
          <MarkdownPreview
            source={selectedEvent?.description || ""}
            style={{
              color: "#505050",
              fontSize: "14px",
              backgroundColor: "transparent",
            }}
          />
        </Box>
      </Stack>
      <Button
        sx={{
          mt: "auto",
          color: "text.secondary",
          bgcolor: "action.hover",
          "&:hover": {
            color: "error.main",
            bgcolor: "error.extraLight",
          },
          transition: "colors 0.2s ease-in",
        }}
        startIcon={<DeleteOutlinedIcon />}
      >
        Delete event
      </Button>
    </Stack>
  );
}
