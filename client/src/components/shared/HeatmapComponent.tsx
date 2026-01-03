import React, { useState, useEffect, useMemo } from "react";
import { Box, Typography, Tooltip, Paper } from "@mui/material";

export interface ScheduleSlot {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  startHour: number;
  endHour: number;
}

interface HeatmapComponentProps {
  activeSlots: ScheduleSlot[];
}

const DAYS: string[] = ["M", "T", "W", "T", "F", "S", "S"];

const HeatmapComponent: React.FC<HeatmapComponentProps> = ({ activeSlots }) => {
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

  // Dynamic range logic based on your 1AM-12PM vs 12PM-12AM rule
  const config = useMemo(() => {
    const isMorningRange = currentHour >= 0 && currentHour < 12;

    return {
      start: isMorningRange ? 0 : 12,
      end: isMorningRange ? 11 : 23, // 23 represents the 11PM-12AM block
      label: isMorningRange
        ? "Morning Schedule (12AM - 12PM)"
        : "Evening Schedule (12PM - 12AM)",
    };
  }, [currentHour]);

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
    <Paper
      elevation={0}
      variant="outlined"
      sx={{ p: 2, borderRadius: 2, bgcolor: "background.paper" }}
    >
      <Typography
        variant="overline"
        sx={{
          mb: 2,
          display: "block",
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        {config.label}
      </Typography>

      <Box
        sx={{
          display: "grid",
          // 40px for labels, then 7 equal columns for days
          gridTemplateColumns: "40px repeat(7, 1fr)",
          gap: 0.75,
          alignItems: "center", // Aligns hour labels to the center of the squares
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
                      // THE FIX:
                      width: "100%",
                      aspectRatio: "1 / 1",
                      borderRadius: 1,
                      bgcolor: active ? "primary.light" : "action.hover",
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.15s ease",
                      "&:hover": {
                        bgcolor: active ? "primary.main" : "action.selected",
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
    </Paper>
  );
};

export default HeatmapComponent;
