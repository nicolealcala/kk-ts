import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";

export interface ScheduleSlot {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  startHour: number;
  endHour: number;
}

type HeatmapConfig = {
  start: number;
  end: number;
  label: string;
};

type HeatmapComponentProps = {
  config: HeatmapConfig;
  activeSlots: ScheduleSlot[];
};

const DAYS: string[] = ["M", "T", "W", "T", "F", "S", "S"];

const HeatmapComponent: React.FC<HeatmapComponentProps> = ({
  config,
  activeSlots,
}) => {
  const hours = Array.from(
    { length: config.end - config.start + 1 },
    (_, i) => config.start + i
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
        gap: 0.75,
        alignItems: "center",
      }}
    >
      {/* Header Row */}
      <Box />
      {DAYS.map((day, i) => (
        <Typography
          key={`day-${i}`}
          variant="body2"
          fontWeight="700"
          align="center"
          color="text.secondary"
        >
          {day}
        </Typography>
      ))}
      {/* Hour Rows */}
      {hours.map((hour) => (
        <React.Fragment key={`hour-row-${hour}`}>
          <Typography
            variant="caption"
            color="text.secondary"
            align="right"
            sx={{ pr: 2, fontWeight: 500 }}
          >
            {formatHour(hour)}
          </Typography>

          {DAYS.map((_, dayIndex) => {
            const active = activeSlots.some(
              (s) =>
                s.day === dayIndex && hour >= s.startHour && hour < s.endHour
            );

            return (
              <Tooltip
                key={`cell-${dayIndex}-${hour}`}
                title={`${DAYS[dayIndex]} at ${formatHour(hour)}`}
                arrow
                disableInteractive
              >
                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: "1 / 1",
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
    </Box>
  );
};

export default HeatmapComponent;
