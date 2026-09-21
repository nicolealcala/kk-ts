import type { ScheduleType } from "@/lib/types/schedules";
import Chip from "@mui/material/Chip";
import { alpha, type Theme } from "@mui/material/styles";

type ScheduleChipProps = {
  label: ScheduleType;
};

const styles = {
  interview: {
    bgcolor: "success.main",
    color: "success.extraLight",
  },
  assessment: {
    bgcolor: "primary.main",
    color: "primary.contrastText",
  },
  task: {
    bgcolor: "secondary.main",
    color: "secondary.extraLight",
  },
  other: {
    bgcolor: "text.disabled",
    color: "white",
  },
};
export default function ScheduleChip({ label }: ScheduleChipProps) {
  return (
    <Chip
      label={label}
      size="small"
      variant="outlined"
      sx={{
        fontSize: 10,
        textTransform: "uppercase",
        ...styles[label],
        border: "none",
        width: "fit-content",
      }}
    />
  );
}
