import { useEffect, useMemo, useState } from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HeatmapComponent, {
  type ScheduleSlot,
} from "../shared/HeatmapComponent";

export default function WeeklySchedule() {
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
    const hourBracket = [
      { label: "Morning Schedule (12A-5AM)", hours: [0, 1, 2, 3, 4, 5] },
      { label: "Morning Schedule (7AM-11PM)", hours: [6, 7, 8, 9, 10, 11] },

      {
        label: "Afternoon Schedule (12PM-5PM)",
        hours: [12, 13, 14, 15, 16, 17],
      },
      { label: "Evening Schedule (6PM-11PM)", hours: [18, 19, 20, 21, 22, 23] },
    ];

    const bracket = hourBracket.find((b) =>
      b.hours.some((h) => h === currentHour)
    );

    return {
      start: bracket!.hours[0],
      end: bracket!.hours[bracket!.hours.length - 1],
      label: bracket!.label,
    };
  }, [currentHour]);

  const mySchedule: ScheduleSlot[] = [
    { day: 0, startHour: 9, endHour: 17 }, // Mon 9-5
    { day: 4, startHour: 18, endHour: 21 }, // Fri 6-9
  ];

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
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {config.label}
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <HeatmapComponent config={config} activeSlots={mySchedule} />
    </Paper>
  );
}
