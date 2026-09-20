import React from "react";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DateTime } from "luxon";
import MarkdownPreview from "@uiw/react-markdown-preview";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import ScheduleChip from "../shared/ScheduleChip";
import type { Schedule } from "@/lib/types/schedules";
import NoEventsIllustration from "../illustrations/NoEventsIllustration";
import { toCalendarEvent } from "@/utils/date";
import { useScheduleStore } from "@/store/schedules/scheduleStore";

function TodayPanel({ events }: { events: Schedule[] }) {
  const openUpdateDrawer = useScheduleStore((state) => state.openUpdateDrawer);

  const todaysEvents = events
    .filter((event) => DateTime.fromISO(event.start).hasSame(DateTime.local(), "day"))
    .sort(
      (a, b) =>
        DateTime.fromISO(a.start).toMillis() - DateTime.fromISO(b.start).toMillis(),
    );

  return (
    <Stack
      component="aside"
      direction="column"
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        position: "relative",
        minHeight: 0,
        minWidth: 0,
       // height: "100%",
        maxHeight: "100%",
        overflow: "hidden",
      }}
      spacing={0}
    >
      <Typography variant="h6" p={2} pb={1}>
        Today
      </Typography>
      <Divider variant="middle" />

      {todaysEvents.length === 0 ? (
        <Stack spacing={3} alignItems="center" p={2} pb={5}>
          <NoEventsIllustration />
          <Typography variant="body2" color="textSecondary">
            No events scheduled for today
          </Typography>
        </Stack>
      ) : (
        <Box
          sx={{
            pl: 2,
            pr: 0.5,
            overflowX: "hidden",
          }}
          className="thin-scrollbar"
        >
          {todaysEvents.map((event) => {
            const calendarEvent = toCalendarEvent(event);
            const localStart = DateTime.fromISO(event.start);
            const startHour = localStart.toFormat("hh:mm a");

            return (
              <Accordion
              defaultExpanded
                key={event.id ?? `${event.title}-${event.start}`}
                sx={{
                  boxShadow: "none",
                  borderTop: "1px solid",
                  borderColor: "divider",
                  "&:first-of-type": {
                    borderTop: "none",
                  },
                  "&.Mui-disabled": {
                    bgcolor: "initial",
                  },
                  "& .MuiAccordionSummary-root.Mui-disabled": {
                    opacity: 1,
                    pointerEvents: "auto",
                  },
                  "& .MuiAccordionSummary-root.Mui-disabled .MuiAccordionSummary-expandIconWrapper":
                    {
                      color: "text.disabled",
                    },
                  "& .MuiAccordionSummary-content.Mui-expanded": {
                    margin: 0,
                  },
                }}
                disabled={!event.description}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    px: 0.5,
                    "& .MuiAccordionSummary-content": {
                      alignItems: "center",
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    component="span"
                    color="textSecondary"
                    sx={{ minWidth: 64, flexShrink: 0 }}
                  >
                    {startHour}
                  </Typography>
                  <Tooltip
                    title={`${startHour} - ${event.title}`}
                    placement="top"
                  >
                    <Typography
                      variant="body1"
                      component="span"
                      fontWeight="medium"
                      sx={{
                        ml: 1,
                        minWidth: 0,
                        cursor: calendarEvent ? "pointer" : "default",
                      }}
                      className="line-clamp-1"
                      onClick={(clickEvent) => {
                        if (!calendarEvent) return;
                        clickEvent.stopPropagation();
                        openUpdateDrawer(calendarEvent);
                      }}
                    >
                      {event.title}
                    </Typography>
                  </Tooltip>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    p: 1.5,
                    mb:2,
                    bgcolor: "slate.extraLight",
                    borderRadius: 1.5,
                  }}
                >
                  <ScheduleChip label={event.type} />
                  <MarkdownPreview
                    source={event.description || ""}
                    style={{
                      color: "#505050",
                      fontSize: "14px",
                      backgroundColor: "transparent",
                      marginBottom: "12px",
                    }}
                  />

                  
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      )}
    </Stack>
  );
}

export default React.memo(TodayPanel);
