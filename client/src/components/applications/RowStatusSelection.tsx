import { cn } from "@/utils/tailwind";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { statusOptions } from "@/lib/data/applicationComponentValues";
import type { ApplicationStatusData } from "@/lib/schema/applicationSchema.ts";
import { useState } from "react";
import { useApplications } from "@/utils/hooks/useApplications";
import Typography from "@mui/material/Typography";
import { statusColors } from "@/lib/config/colors";

type ApplicationStatusSelectionProps = {
  value: ApplicationStatusData;
  row: { original: { id: string } };
};

export default function RowStatusSelection({
  value: defaultValue,
  row,
}: ApplicationStatusSelectionProps) {
  const { updateApplicationStatus } = useApplications();

  const [value, setValue] = useState<ApplicationStatusData>(defaultValue);

  const handleStatusChange = (newStatus: ApplicationStatusData) => {
    setValue(newStatus);
    updateApplicationStatus({ id: row.original.id, status: newStatus });
  };

  return (
    <Select
      value={value}
      size="small"
      className={cn("w-fit rounded-2xl!")}
      sx={{
        borderRadius: "100%",
        bgcolor: statusColors[value][50],
        color: statusColors[value][800],
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "& .MuiSelect-select": {
          py: 0.5,
          px: 1.5,
          display: "flex",
          alignItems: "center",
          fontSize: "14px",
          fontWeight: "medium",
        },
      }}
      onChange={(e) =>
        handleStatusChange(e.target.value as ApplicationStatusData)
      }
      renderValue={(selected) => {
        const option = statusOptions.find((opt) => opt.value === selected);
        return (
          <Typography fontFamily="Inter" variant="body2">
            {option?.label}
          </Typography>
        );
      }}
    >
      {statusOptions.map((opt) => (
        <MenuItem key={opt.value} value={opt.value} className="text-sm">
          {opt.label}
        </MenuItem>
      ))}
    </Select>
  );
}
