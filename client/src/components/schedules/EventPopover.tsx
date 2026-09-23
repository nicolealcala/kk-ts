import type { CalendarEvent } from "@/lib/types/schedules";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ScheduleChip from "./ScheduleChip";
import { DateTime } from "luxon";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useScheduleStore } from "@/store/schedules/scheduleStore";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import MarkdownPreview from "@uiw/react-markdown-preview";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import InsertLinkRoundedIcon from "@mui/icons-material/InsertLinkRounded";
import Chip from "@mui/material/Chip";

type EventPopoverProps = {
  selectedEvent: CalendarEvent | null;
  eventAnchor: HTMLElement | null;
  handleCloseEventPopover: () => void;
  handleDelete: (onSuccess: () => void) => void;
};

const iconStyle = {
  width: "1.2rem",
  height: "1.2rem",
  placeSelf: "center",
};

export default function EventPopover({
  eventAnchor,
  selectedEvent,
  handleCloseEventPopover,
  handleDelete,
}: EventPopoverProps) {
  const openUpdateDrawer = useScheduleStore((state) => state.openUpdateDrawer);
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
    <Popover
      open={Boolean(eventAnchor)}
      anchorEl={eventAnchor}
      onClose={handleCloseEventPopover}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "left",
      }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
            boxShadow: "0px 2px 8px 0px rgba(0,0,0, 0.15)",
            border: "1px solid",
            borderColor: "divider",
          },
        },
      }}
    >
      {selectedEvent && (
        <Stack useFlexGap spacing={2} sx={{ p: 2, width: 400 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              variant="h6"
              display="flex"
              alignItems="center"
              className="line-clamp-1! truncate!"
            >
              {selectedEvent.title}
            </Typography>
            <ScheduleChip label={selectedEvent.type} />
          </Stack>

          <Divider sx={{ mt: -0.5 }} />

          <Stack
            spacing={0.5}
            bgcolor="slate.extraLight"
            p={2}
            borderRadius={3}
            sx={{
              color: "text.secondary",
              "& .MuiTypography-root": {
                fontFamily: "Inter, sans-serif",
                fontSize: "0.9rem",
                fontWeight: 350,
              },
              "& .MuiLink-root": {
                fontFamily: "Inter, sans-serif",
                fontSize: "0.9rem",
                fontWeight: 350,
              },
            }}
          >
            <Stack spacing={2} direction="row" alignItems="center">
              <CalendarMonthRoundedIcon sx={iconStyle} />
              <Typography>
                {selectedEvent?.start
                  ? DateTime.fromJSDate(selectedEvent.start).toFormat(
                      "cccc, LLLL d",
                    )
                  : ""}
              </Typography>
            </Stack>

            <Stack spacing={2} direction="row" alignItems="center">
              <AccessTimeRoundedIcon sx={iconStyle} />
              <Typography>
                {selectedEvent?.start && selectedEvent?.end
                  ? `${DateTime.fromJSDate(selectedEvent.start).toFormat(
                      "h:mm a",
                    )}–${DateTime.fromJSDate(selectedEvent.end).toFormat("h:mm a")}`
                  : ""}{" "}
                ({duration})
              </Typography>
            </Stack>

            {selectedEvent?.modality === "onsite" && selectedEvent?.address && (
              <Stack spacing={2} useFlexGap direction="row">
                <PlaceOutlinedIcon sx={iconStyle} />
                <Box>
                  <Typography component="span">
                    {selectedEvent.address}
                  </Typography>
                  <Chip
                    size="small"
                    label={selectedEvent.modality}
                    sx={{
                      display: "inline",
                      ml: 1,
                      height: "fit-content",
                      verticalAlign: "middle",
                      fontSize: "0.75rem",
                      borderRadius: 1.5,
                      "& .MuiChip-label": {
                        px: 0.75,
                      },
                    }}
                  />
                </Box>
              </Stack>
            )}

            {selectedEvent?.modality === "remote" && selectedEvent?.link && (
              <Stack spacing={2} useFlexGap direction="row" alignItems="center">
                <InsertLinkRoundedIcon sx={iconStyle} />
                <Box>
                  <Link href={selectedEvent.link} target="_blank">
                    {selectedEvent.link}
                  </Link>
                  <Chip
                    size="small"
                    label={selectedEvent.modality}
                    sx={{
                      display: "inline",
                      ml: 1,
                      fontSize: "0.75rem",
                      borderRadius: 1.5,
                      height: "95%",
                      "& .MuiChip-label": {
                        px: 0.75,
                      },
                    }}
                  />
                </Box>
              </Stack>
            )}
          </Stack>

          <Stack direction="row" spacing={1} fontWeight={600}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                handleDelete(() => {
                  handleCloseEventPopover();
                });
              }}
              sx={{
                color: "text.secondary",
                borderColor: "text.disabled",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  bgcolor: "error.extraLight",
                  color: "error.main",
                  borderColor: "error.main",
                },
              }}
            >
              Delete
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                openUpdateDrawer(selectedEvent);
                handleCloseEventPopover();
              }}
            >
              Update
            </Button>
          </Stack>

          {selectedEvent.description && (
            <>
              <Divider />
              <Stack spacing={1}>
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  fontSize="1.15rem"
                >
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
            </>
          )}
        </Stack>
      )}
    </Popover>
  );
}
