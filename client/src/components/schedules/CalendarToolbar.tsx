import type { OnsiteSchedule, RemoteSchedule } from "@/lib/types/schedules";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { DateTime } from "luxon";
import { Views, type ToolbarProps } from "react-big-calendar";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Typography from "@mui/material/Typography";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import type { ButtonGroupProps } from "@mui/material/ButtonGroup";
import ButtonGroup from "@mui/material/ButtonGroup";

// 1. Define the Date-converted versions of your specific schedules
type RemoteCalendarEvent = Omit<RemoteSchedule, "start" | "end"> & {
  start: Date;
  end: Date;
};

type OnsiteCalendarEvent = Omit<OnsiteSchedule, "start" | "end"> & {
  start: Date;
  end: Date;
};

// 2. Create the Union
export type CalendarEvent = RemoteCalendarEvent | OnsiteCalendarEvent;

// 3. Define Toolbar Props
export type CustomToolbarProps = ToolbarProps<CalendarEvent, object>;

export default function CustomToolbar(
  toolbar: CustomToolbarProps & { onAdd: () => void }
) {
  const viewOptions = [
    { id: Views.MONTH, label: "Month" },
    { id: Views.WEEK, label: "Week" },
    { id: Views.DAY, label: "Day" },
  ];

  const toolbarDate = DateTime.fromJSDate(toolbar.date).startOf("day");
  const today = DateTime.local().startOf("day");

  // Conditions
  const isToday = toolbarDate.hasSame(today, "day");
  const isPast = toolbarDate < today;
  const isFuture = toolbarDate > today;

  const activeStyle = {
    backgroundColor: "action.selected",
    color: "primary.main",
    fontWeight: "bold",
  };
  return (
    <Stack
      direction="row"
      mb={2}
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack direction="row" spacing={2}>
        <StyledButtonGroup>
          <Button
            onClick={() => toolbar.onNavigate("PREV")}
            sx={isPast ? activeStyle : {}}
          >
            <ChevronLeftRoundedIcon />
          </Button>
          <Button
            onClick={() => toolbar.onNavigate("TODAY")}
            sx={isToday ? activeStyle : {}}
          >
            Today
          </Button>
          <Button
            onClick={() => toolbar.onNavigate("NEXT")}
            sx={isFuture ? activeStyle : {}}
          >
            <ChevronRightRoundedIcon />
          </Button>
        </StyledButtonGroup>
        <Typography
          variant="body1"
          component="h1"
          alignContent="center"
          fontWeight={500}
        >
          {toolbar.label}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2}>
        <StyledButtonGroup>
          {viewOptions.map((v) => (
            <Button
              key={v.id}
              onClick={() => toolbar.onView(v.id)}
              sx={toolbar.view === v.id ? activeStyle : {}}
            >
              {v.label}
            </Button>
          ))}
        </StyledButtonGroup>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={toolbar.onAdd}
        >
          Create event
        </Button>
      </Stack>
    </Stack>
  );
}

function StyledButtonGroup({ children, sx, ...rest }: ButtonGroupProps) {
  return (
    <ButtonGroup
      variant="outlined"
      {...rest}
      sx={{
        "& .MuiButton-outlined": {
          color: "text.secondary",
          borderColor: "divider",
          textTransform: "none",
          "&:hover": {
            borderColor: "divider",
            backgroundColor: "action.hover",
          },
          "&:active": {
            backgroundColor: "action.selected",
          },
        },
        ...sx,
      }}
    >
      {children}
    </ButtonGroup>
  );
}
