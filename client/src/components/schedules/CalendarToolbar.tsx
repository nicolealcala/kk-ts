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
import React from "react";
import type { CalendarEvent } from "@/lib/types/schedules";
import { useScheduleStore } from "@/store/schedules/scheduleStore";

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
        },
        ...sx,
      }}
    >
      {children}
    </ButtonGroup>
  );
}

export type CustomToolbarProps = ToolbarProps<CalendarEvent, object>;

function CustomToolbar(toolbar: CustomToolbarProps) {
  const openCreateDrawer = useScheduleStore((state) => state.openCreateDrawer);
  const handleCreate = () => {
    const createStart = new Date();
  
    createStart.setMinutes(
      Math.floor(createStart.getMinutes() / 15) * 15,
      0,
      0,
    );
  
    const createEnd = new Date(createStart);
    createEnd.setMinutes(createEnd.getMinutes() + 30);
  
    openCreateDrawer(createStart, createEnd);
  };


  const viewOptions = [
    { id: Views.MONTH, label: "Month" },
    { id: Views.WEEK, label: "Week" },
    { id: Views.DAY, label: "Day" },
  ];

  const unit =
    toolbar.view === Views.MONTH
      ? "month"
      : toolbar.view === Views.WEEK
        ? "week"
        : "day";

  const toolbarDate = DateTime.fromJSDate(toolbar.date);
  const today = DateTime.local();
  const isToday = toolbarDate.hasSame(today, unit);
  const isPast = toolbarDate.startOf(unit) < today.startOf(unit);
  const isFuture = toolbarDate.startOf(unit) > today.startOf(unit);

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
      flexWrap="wrap"
      useFlexGap
      spacing={1.5}
      sx={{ flexShrink: 0 }}
    >
      <Stack direction="row" spacing={2}>
        <StyledButtonGroup>
          <Button
            onClick={() => toolbar.onNavigate("PREV")}
            sx={isPast ? activeStyle : {}}
            aria-label="Previous"
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
            aria-label="Next"
          >
            <ChevronRightRoundedIcon />
          </Button>
        </StyledButtonGroup>
        <Typography
          variant="body1"
          component="h1"
          alignContent="center"
          fontWeight="medium"
          noWrap
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
          onClick={handleCreate}
        >
          Create event
        </Button>
      </Stack>
    </Stack>
  );
}

export default React.memo(CustomToolbar);
