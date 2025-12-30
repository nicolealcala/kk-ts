import React from "react";
import {
  MenuItem,
  Select,
  Tooltip,
  type SelectChangeEvent,
} from "@mui/material";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";

type SelectValueProps = {
  year: string;
  organization: { img: string; name: string };
};

const headerItems: SelectValueProps[] = [
  { year: "2025", organization: { img: "", name: "" } },
  {
    year: "2024",
    organization: {
      img: "https://lh3.googleusercontent.com/IgRKLuNUXam-9GZOCWXTmIN_WXJS86BrE0RdvBdcy9dL-omOL4lDpETzMtN38QgF84fnjn5Ruy3TjgHbyvo=s280",
      name: "WPH Digital Pte Ltd",
    },
  },
  { year: "2023", organization: { img: "", name: "" } },
  { year: "2022", organization: { img: "", name: "" } },
];

function SelectValue({ value }: { value: SelectValueProps }) {
  return (
    <div className="relative flex gap-x-3 w-full">
      <img
        src={
          value.organization.img
            ? value.organization.img
            : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
        }
        alt={
          value.organization.img
            ? `${value.organization.name}'s Image`
            : "Organization Image"
        }
        className="aspect-square size-10 rounded-md object-contain object-center"
      />

      <div className="flex flex-col w-full">
        <Tooltip
          title={value.organization.name || "Unemployed"}
          placement="right-start"
        >
          <h5 className="font-bold w-full max-w-[95%] truncate">
            {value.organization.name || "Unemployed"}
          </h5>
        </Tooltip>
        <p className="text-xs max-w-[95%] truncate">{value.year}</p>
      </div>
    </div>
  );
}

export default function ContextSwitcher() {
  const [currentYear, setCurrentYear] = React.useState<string>(
    headerItems[0].year
  );

  const handleChange = (event: SelectChangeEvent<string>) => {
    setCurrentYear(event.target.value);
  };

  const currentPeriod = React.useMemo(
    () => headerItems.find((item) => item.year === currentYear),
    [currentYear]
  );

  return (
    <Select
      fullWidth
      value={currentYear}
      onChange={handleChange}
      renderValue={() =>
        currentPeriod ? <SelectValue value={currentPeriod} /> : null
      }
      MenuProps={{
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left",
        },
      }}
      IconComponent={UnfoldMoreRoundedIcon}
      sx={{
        "&.MuiInputBase-root": {
          padding: 0,
          borderRadius: 0,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "0 !important",
        },
        "& .MuiSelect-select": {
          borderRadius: 0,
          transition: "background-color 0.2s ease",
          py: 1.5,
        },
        "&:hover .MuiSelect-select": {
          bgcolor: "rgba(0,0,0,0.05)",
        },
      }}
    >
      {headerItems.map((item) => (
        <MenuItem key={item.year} value={item.year}>
          {item.year}
        </MenuItem>
      ))}
    </Select>
  );
}
