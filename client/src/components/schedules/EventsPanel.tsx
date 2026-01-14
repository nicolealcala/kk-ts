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
import { schedules } from "@/lib/mock-data/schedules";
import Tooltip from "@mui/material/Tooltip";

export default function EventsPanel() {
  const todaysEvents = schedules.filter((event) => {
    const localStart = DateTime.fromISO(event.start, { zone: "utc" }).toLocal();

    return localStart.hasSame(DateTime.local(), "day");
  });

  return (
    <Stack
      component="aside"
      direction="column"
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        position: "relative",
        minHeight: 0,
        height: "fit-content",
        maxHeight: "100%",
      }}
      spacing={1}
    >
      <Typography variant="h6" p={2} pb={0}>
        Today
      </Typography>
      <Divider variant="middle" />

      {todaysEvents.length === 0 ? (
        <Typography
          variant="body2"
          p={2}
          pt={1}
          fontStyle="italic"
          color="textSecondary"
        >
          No events scheduled for today.
        </Typography>
      ) : (
        <Box
          sx={{
            pl: 2,
            pr: 0.5,
          }}
          className="thin-scrollbar"
        >
          {todaysEvents.map((event, index) => {
            const localStart = DateTime.fromISO(event.start, {
              zone: "utc",
            }).setZone("local");
            const startHour = localStart.toFormat("hh:mm a");

            return (
              <Accordion
                key={index}
                sx={{
                  boxShadow: "none",
                  borderTop: "1px solid #ddd",
                  "&:first-of-type": {
                    borderTop: "none", // no line above the first item
                  },
                  "&.Mui-disabled": {
                    bgcolor: "initial",
                  },
                  "& .MuiAccordionSummary-root.Mui-disabled": {
                    opacity: 1, // keep summary text normal
                  },
                  "& .MuiAccordionSummary-root.Mui-disabled .MuiAccordionSummary-expandIconWrapper":
                    {
                      color: "#DCDCDC", // only muted when disabled
                    },
                  "& .MuiAccordionSummary-content.Mui-expanded": {
                    margin: 0, // prevent content shift
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
                    minWidth="fit-content"
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
                      fontWeight={500}
                      sx={{ ml: 1 }}
                      className="line-clamp-1"
                    >
                      {event.title}
                    </Typography>
                  </Tooltip>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    p: 1.5,
                    bgcolor: "slate.extraLight",
                    borderRadius: 1.5,
                  }}
                >
                  <MarkdownPreview
                    source={event.description || "No description provided"}
                    style={{
                      color: "#505050",
                      fontSize: "14px",
                      backgroundColor: "transparent",
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
