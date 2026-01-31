import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import type { FilterAction, FilterState } from "./ApplicationsTable";

type ApplicationFiltersProps = {
  filters: FilterState;
  dispatch: React.ActionDispatch<[action: FilterAction]>;
};

export default function ApplicationFilters({
  filters,
  dispatch,
}: ApplicationFiltersProps) {
  // Check if any filter is active to show the "Clear" button
  const hasActiveFilters =
    filters.arrangement.length > 0 || filters.status.length > 0;

  return (
    <Stack direction="row" justifyContent="space-between" pb={2.5}>
      <Stack direction="row" spacing={4} justifyContent="start">
        {/* Work Arrangement Selection */}
        <FilterGroup
          label="Arrangement"
          options={[
            { label: "Remote", value: "remote" },
            { label: "Hybrid", value: "hybrid" },
            { label: "Onsite", value: "onsite" },
          ]}
          selected={filters.arrangement}
          onChange={(val: string) =>
            dispatch({
              type: "TOGGLE_FILTER",
              category: "arrangement",
              value: val,
            })
          }
        />

        {/* Status Section */}
        <FilterGroup
          label="Status"
          options={[
            { label: "Applied", value: "applied" },
            { label: "Interviewing", value: "interviewing" },
            { label: "Offered", value: "offered" },
            { label: "Not Selected", value: "not-selected" },
            { label: "Withdrawn", value: "withdrawn" },
            { label: "Accepted", value: "accepted" },
            { label: "Ghosted", value: "ghosted" },
          ]}
          selected={filters.status}
          onChange={(val: string) =>
            dispatch({ type: "TOGGLE_FILTER", category: "status", value: val })
          }
        />
      </Stack>

      {hasActiveFilters && (
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch({ type: "CLEAR_ALL" })}
          sx={{ alignSelf: "start" }}
        >
          Clear All
        </Button>
      )}
    </Stack>
  );
}

// Small helper component for the groups
function FilterGroup({
  label,
  options,
  selected,
  onChange,
}: {
  label?: string;
  options: { label: string; value: string }[];
  selected: string[];
  onChange: (value: string) => void;
}) {
  return (
    <Stack sx={{ width: "fit-content", pl: 1 }}>
      <Typography
        variant="body2"
        component="span"
        fontWeight="medium"
        gutterBottom
      >
        {label}
      </Typography>
      <FormGroup sx={{ maxWidth: "fit-content" }}>
        <Box
          sx={{
            width: "fit-content",
            display: "grid",
            gridTemplateColumns: "auto",
            gridTemplateRows:
              options.length > 4
                ? "repeat(4, auto)"
                : `repeat(${options.length}, auto)`,
            gridAutoFlow: "column",
            gap: 0,
          }}
        >
          {options.map((opt) => {
            const isString = typeof opt === "string";
            const value = isString ? opt : opt.value;
            const label = isString ? opt : opt.label;

            return (
              <Box key={value} sx={{ whiteSpace: "nowrap", pr: 2 }}>
                <FormControlLabel
                  key={value}
                  control={
                    <Checkbox
                      checked={selected.includes(value)}
                      onChange={() => onChange(value)}
                      size="small"
                      sx={{
                        "&.MuiCheckbox-root": {
                          p: 0,
                          borderRadius: 0.5,
                        },
                        "&.Mui-checked": {
                          color: "initial",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body1" color="textSecondary">
                      {label}
                    </Typography>
                  }
                  sx={{
                    gap: 1,
                    ml: 0,
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </FormGroup>
    </Stack>
  );
}
