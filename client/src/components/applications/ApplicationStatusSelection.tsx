import { cn } from "@/utils/tailwind";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const statusOptions = [
  { label: "Applied", value: "applied" },
  { label: "Interviewing", value: "interviewing" },
  { label: "Offered", value: "offered" },
  { label: "Rejected", value: "rejected" },
  { label: "Withdrawn", value: "withdrawn" },
  { label: "Accepted", value: "accepted" },
  { label: "Ghosted", value: "ghosted" },
];

const statusColors = {
  applied: "bg-blue-50! text-blue-500!",
  interviewing: "bg-yellow-50! text-yellow-500!",
  offered: "bg-green-50! text-green-500!",
  rejected: "bg-red-50! text-red-500!",
  ghosted: "bg-gray-50! text-gray-500!",
  withdrawn: "bg-purple-50! text-purple-500!",
};

type ApplicationStatusSelectionProps = {
  getValue: () => string;
  row: { original: { id: string } };
};

export default function ApplicationStatusSelection({
  getValue,
  row,
}: ApplicationStatusSelectionProps) {
  const currentValue = getValue();

  return (
    <Select
      value={currentValue}
      size="small"
      className={cn(
        "w-fit",
        statusColors[currentValue as keyof typeof statusColors],
      )}
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "& .MuiSelect-select": {
          py: 0.5,
          px: 1.5,
          display: "flex",
          alignItems: "center",
          fontSize: "small",
          fontWeight: "medium",
        },
      }}
      onChange={(e) =>
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
