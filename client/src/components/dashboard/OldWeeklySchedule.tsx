import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HeatmapComponent, {
  type ScheduleData,
} from "../shared/HeatmapComponent";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import UnfoldLessRoundedIcon from "@mui/icons-material/UnfoldLessRounded";
import IconButton from "@mui/material/IconButton";
import type { Schedule } from "@/lib/types/schedules";
import { transformSchedules } from "@/lib/utils/date";

type WeeklyScheduleProps = {
  isScheduleExpanded: boolean;
  setIsScheduleExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  schedule: Schedule[];
};

export default function WeeklySchedule({
  isScheduleExpanded,
  setIsScheduleExpanded,
  schedule,
}: WeeklyScheduleProps) {
  const [currentHour, setCurrentHour] = useState<number>(new Date().getHours());

  useEffect(() => {
    // Update the range if the hour changes while the app is open
    const timer = setInterval(() => {
      const now = new Date().getHours();
      if (now !== currentHour) {
        setCurrentHour(now);
      }
    }, 60000);

    return () => clearInterval(timer);
  }, [currentHour]);

  const config = useMemo(() => {
    const quarterlyBracket = [
      { label: "Morning Schedule (12AM-5AM)", hours: [0, 5] },
      { label: "Morning Schedule (6AM-11AM)", hours: [6, 11] },
      {
        label: "Afternoon Schedule (12PM-5PM)",
        hours: [12, 17],
      },
      { label: "Evening Schedule (6PM-11PM)", hours: [18, 23] },
    ];

    const halfBracket = [
      {
        label: "AM Schedule (12AM-12PM)",
        hours: [0, 12],
      },
      {
        label: "PM Schedule (12PM-12AM)",
        hours: [12, 24],
      },
    ];

    const bracket = isScheduleExpanded ? halfBracket : quarterlyBracket;
    const schedule = bracket.find((b) => {
      const [start, end] = b.hours;

      return currentHour >= start && currentHour <= (end === 24 ? 23 : end);
    });

    return {
      start: schedule!.hours[0],
      end: schedule!.hours[1],
      label: schedule!.label,
    };
  }, [currentHour, isScheduleExpanded]);

  const mySchedule: ScheduleData[] = transformSchedules(schedule);

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        borderRadius: 2,
        height: "100%",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Typography variant="body2">{config.label}</Typography>
        <IconButton
          aria-label="Toggle Schedule Expand"
          size="small"
          sx={{
            position: "absolute",
            right: 0,
            bgcolor: isScheduleExpanded ? "primary.main" : "",
            color: isScheduleExpanded ? "primary.contrastText" : "",
            "& :hover": {
              color: "text.primary",
            },
          }}
          onClick={() => setIsScheduleExpanded((prev) => !prev)}
        >
          {isScheduleExpanded ? (
            <UnfoldLessRoundedIcon fontSize="small" />
          ) : (
            <UnfoldMoreRoundedIcon fontSize="small" />
          )}
        </IconButton>
      </Box>

      <Divider sx={{ mb: 1 }} />
      <HeatmapComponent config={config} activeSlots={mySchedule} />
    </Paper>
  );
}
