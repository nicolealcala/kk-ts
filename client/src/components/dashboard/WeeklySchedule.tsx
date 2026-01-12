import { useEffect, useMemo, useState } from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HeatmapComponent, {
  type ScheduleData,
} from "../shared/HeatmapComponent";
import type { Schedule } from "@/lib/types/schedules";
import { transformSchedules } from "@/lib/utils/date";

type WeeklyScheduleProps = {
  schedule: Schedule[];
};

export default function WeeklySchedule({ schedule }: WeeklyScheduleProps) {
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
    const schedule = halfBracket.find((b) => {
      const [start, end] = b.hours;

      return currentHour >= start && currentHour <= (end === 24 ? 23 : end);
    });

    return {
      start: schedule!.hours[0],
      end: schedule!.hours[1],
      label: schedule!.label,
    };
  }, [currentHour]);

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
        width: "100%",
        gap: 1,
      }}
    >
      <Typography variant="body2">{config.label}</Typography>

      <Divider sx={{ mb: 1 }} />
      <HeatmapComponent config={config} activeSlots={mySchedule} />
    </Paper>
  );
}
