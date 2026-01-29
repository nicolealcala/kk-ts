import React, { useMemo } from "react";
import { Box, Typography, Tooltip } from "@mui/material";

export interface ScheduleData {
  title: string;
  day: number;
  start: number;
  end: number;
}
type HeatmapConfig = {
  start: number;
  end: number;
  label: string;
};

type HeatmapComponentProps = {
  config: HeatmapConfig;
  activeSlots: ScheduleData[];
};

const DAYS: string[] = ["M", "T", "W", "T", "F", "S", "S"];

const HeatmapComponent: React.FC<HeatmapComponentProps> = ({
  config,
  activeSlots,
}) => {
  const currentDay = useMemo(() => new Date().getDay(), []);
  const hours = Array.from(
    { length: config.end - config.start + 1 },
    (_, i) => config.start + i,
  );

  const formatHour = (hour: number): string => {
    if (hour === 0 || hour === 24) return "12AM";
    if (hour === 12) return "12PM";
    const suffix = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}${suffix}`;
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "40px repeat(7, 1fr)",
        height: "100%",
        gap: 0.75,
        minHeight: 0,
        alignItems: "stretch",
      }}
    >
      {/* Hour Rows */}
      {hours.map((hour) => (
        <React.Fragment key={`hour-row-${hour}`}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ pr: 2, fontWeight: "medium", alignSelf: "center" }}
          >
            {formatHour(hour)}
          </Typography>

          {DAYS.map((_, dayIndex) => {
            const active = activeSlots.some(
              (s) => s.day === dayIndex && hour >= s.start && hour < s.end,
            );

            const scheduleItem = activeSlots.find(
              (s) => s.day === dayIndex && hour >= s.start && hour < s.end,
            );

            return (
              <Tooltip
                key={`cell-${dayIndex}-${hour}`}
                title={
                  active
                    ? `${scheduleItem?.title} at ${formatHour(hour)}`
                    : undefined
                }
                arrow
                disableInteractive
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 1,
                    bgcolor: active ? "primary.extraLight" : "action.hover",
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.15s ease",
                    "&:hover": {
                      bgcolor: active ? "primary.main" : "action.selected",
                      scale: 1.1,
                      cursor: "pointer",
                      zIndex: 2,
                    },
                  }}
                />
              </Tooltip>
            );
          })}
        </React.Fragment>
      ))}

      {/* DAYS Row */}
      <Box />
      {DAYS.map((day, i) => (
        <Typography
          key={`day-${i}`}
          variant="button"
          fontWeight="bold"
          align="center"
          color={currentDay === i + 1 ? "primary.light" : "text.secondary"}
          sx={{ alignSelf: "center" }}
        >
          {day}
        </Typography>
      ))}
    </Box>
  );
};

export default HeatmapComponent;
