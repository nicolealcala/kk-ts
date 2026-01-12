import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DateTime } from "luxon";
import MarkdownPreview from "@uiw/react-markdown-preview";
import Stack from "@mui/material/Stack";

const myEventsList = [
  {
    title: "Project Kickoff",
    start: "2026-01-12T04:30:00Z",
    end: "2026-01-12T05:30:00Z",
    description: `**Agenda:**  
- Introductions  
- Overview of project scope  
- Timeline discussion  

For details, check the [project docs](https://example.com/docs).`,
  },
  {
    title: "Design Review",
    start: "2026-01-12T08:00:00Z",
    end: "2026-01-12T09:00:00Z",
    description: `We'll review the latest **UI mockups**.  
Please bring your feedback on:  
1. Color scheme  
2. Layout consistency  
3. Accessibility  

See the [design guidelines](https://example.com/design).`,
  },
  {
    title: "Client Presentation",
    start: "2026-01-12T13:00:00Z",
    end: "2026-01-12T14:00:00Z",
    //     description: `Present progress to the client.
    // Topics include:
    // - ✅ Completed milestones
    // - 🚧 Work in progress
    // - 📌 Next steps

    // Slides are available [here](https://example.com/slides).`,
  },
  {
    title: "Team Retrospective",
    start: "2026-01-13T02:00:00Z",
    end: "2026-01-13T03:00:00Z",
    description: `Reflect on the sprint:  
- What went **well**  
- What could be *improved*  
- Action items for next sprint  

Add notes in the [retrospective board](https://example.com/retro).`,
  },
];

export default function EventsPanel() {
  // Get today's date in local time
  const today = DateTime.local().toISODate();

  // Filter events that fall on today's date
  const todaysEvents = myEventsList.filter((event) => {
    const localStart = DateTime.fromISO(event.start, { zone: "utc" }).setZone(
      "local"
    );
    return localStart.toISODate() === today;
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
      <Typography variant="h6" gutterBottom p={2}>
        Upcoming Events
      </Typography>
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          pl: 2,
          pr: 0.5,
          overflowY: "auto",
          position: "relative",
        }}
        className="thin-scrollbar"
      >
        {todaysEvents.length === 0 ? (
          <Typography variant="body2">
            No events scheduled for today.
          </Typography>
        ) : (
          todaysEvents.map((event, index) => {
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
                  sx={{ px: 0.5 }}
                >
                  <Typography variant="overline" color="textSecondary">
                    {startHour}
                  </Typography>
                  <Typography
                    variant="body1"
                    alignContent="center"
                    fontWeight={500}
                    sx={{ ml: 1 }}
                  >
                    {event.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 1, py: 0 }}>
                  <MarkdownPreview
                    source={event.description || "No description provided"}
                    style={{
                      color: "#505050",
                      fontSize: "14px",
                      padding: "12px",
                      paddingRight: "10px",
                      borderLeft: "3px solid orange",
                      backgroundColor: "rgba(249, 105, 14, 0.09)",
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            );
          })
        )}
      </Box>
    </Stack>
  );
}
