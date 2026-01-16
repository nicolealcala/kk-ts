import type { ScheduleType } from "@/lib/types/schedules";
import Chip from "@mui/material/Chip";
import { alpha, type Theme } from "@mui/material/styles";

type ScheduleChipProps = {
  label: ScheduleType;
};

const styles = {
  interview: {
    color: "success.main",
    bgcolor: "success.extraLight",
    borderColor: "success.main",
  },
  assessment: {
    color: "primary.main",
    bgcolor: (theme: Theme) => alpha(theme.palette.primary.light, 0.15),
    borderColor: "primary.main",
  },
  task: {
    color: "secondary.main",
    bgcolor: "secondary.extraLight",
    borderColor: "secondary.main",
  },
  other: {
    color: "text.secondary",
    bgcolor: (theme: Theme) => alpha(theme.palette.text.secondary, 0.05),
    borderColor: "text.main",
  },
};
export default function ScheduleChip({ label }: ScheduleChipProps) {
  return (
    <Chip
      label={label}
      size="small"
      variant="outlined"
      sx={{ textTransform: "capitalize", ...styles[label] }}
    />
  );
}
