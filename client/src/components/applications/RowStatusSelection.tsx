import { cn } from "@/utils/tailwind";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { statusOptions } from "@/lib/data/applicationComponentValues";
import type { ApplicationStatusData } from "@/lib/schema/application.validation.ts";

const statusColors = {
  applied: "bg-blue-50! text-blue-500!",
  initial_interview: "bg-yellow-50! text-yellow-500!",
  offer_received: "bg-green-50! text-green-500!",
  rejected: "bg-red-50! text-red-500!",
  offer_declined: "bg-gray-50! text-gray-500!",
  withdrawn: "bg-purple-50! text-purple-500!",
};

type ApplicationStatusSelectionProps = {
  value: ApplicationStatusData;
  row: { original: { id: string } };
};

export default function RowStatusSelection({
  value,
  row,
}: ApplicationStatusSelectionProps) {
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
        //TO DO: Make a PATCH request when this is updated
        console.log("Update ID:", row.original.id, "to", e.target.value)
      }
      // Custom rendering of the selected value
      renderValue={(selected) => {
        const option = statusOptions.find((opt) => opt.value === selected);
        return <span>{option?.label}</span>;
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
