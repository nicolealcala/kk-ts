import { eventColors } from "@/lib/config/colors";
import type { ScheduleType } from "@/lib/types/schedules";
import Chip, { type ChipProps } from "@mui/material/Chip";

type ScheduleChipProps = ChipProps & {
  label: ScheduleType;
};

export default function ScheduleChip({ label, sx }: ScheduleChipProps) {
  return (
    <Chip
      label={label}
      size="small"
      variant="outlined"
      sx={{
        fontSize: "0.65rem",
        textTransform: "uppercase",
        color: "background.paper",
        bgcolor:
          eventColors[label.toLowerCase() as keyof typeof eventColors][500],
        border: "none",
        width: "fit-content",
        "& .MuiChip-label": {
          px: 0.75,
          lineHeight: 1,
        },
        ...sx,
      }}
    />
  );
}
