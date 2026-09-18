import { cn } from "@/utils/tailwind";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { statusOptions } from "@/lib/data/applicationComponentValues";
import type { ApplicationStatusData } from "@/lib/schema/applicationSchema.ts";
import { useState } from "react";
import { useApplications } from "@/utils/hooks/useApplications";
import Typography from "@mui/material/Typography";

const statusColors = {
  applied: "bg-blue-50! text-blue-500!",
  assessment: "bg-orange-50! text-orange-500!",
  final_interview: "bg-purple-50! text-purple-500!",
  initial_interview: "bg-yellow-50! text-yellow-600!",
  offer_accepted: "bg-emerald-600! text-emerald-50!",
  offer_declined: "bg-gray-100! text-gray-500!",
  offer_received: "bg-green-50! text-green-500!",
  rejected: "bg-red-50! text-red-600!",
  viewed: "bg-sky-50! text-sky-500!",
  withdrawn: "bg-gray-50! text-gray-500!",
};

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
      className={cn(
        "w-fit rounded-2xl!",
        statusColors[value as keyof typeof statusColors],
      )}
      sx={{
        borderRadius: "100%",
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
