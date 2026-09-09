import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useApplicationTable } from "@/store/application/applicationStore";
import type {
  ApplicationStatusData,
  WorkArrangementData,
} from "@/lib/schema/applicationSchema.ts";
import {
  statusOptions,
  workArrangementOptions,
} from "@/lib/data/applicationComponentValues";
import useShallowStore from "@/store/useShallowStore";

export default function Filters() {
  const { workArrangementFilters, statusFilters, setFilters, resetFilters } =
    useShallowStore(useApplicationTable, (state) => ({
      workArrangementFilters: state.workArrangementFilters,
      statusFilters: state.statusFilters,
      setFilters: state.setFilters,
      resetFilters: state.resetFilters,
    }));

  const hasActiveFilters =
    (workArrangementFilters && workArrangementFilters.length > 0) ||
    (statusFilters && statusFilters.length > 0);

  return (
    <Stack direction="row" justifyContent="space-between" pb={2}>
      <Stack direction="row" spacing={4} justifyContent="start">
        {/* Work Arrangement Selection */}
        <FilterGroup
          groupLabel="Arrangement"
          options={workArrangementOptions}
          selected={workArrangementFilters ?? []}
          onChange={(val: WorkArrangementData) =>
            setFilters({ filter: val, type: "workArrangement" })
          }
        />

        {/* Status Section */}
        <FilterGroup
          groupLabel="Status"
          options={statusOptions}
          selected={statusFilters ?? []}
          onChange={(val: ApplicationStatusData) =>
            setFilters({ filter: val, type: "status" })
          }
        />
      </Stack>

      {hasActiveFilters && (
        <Button
          size="small"
          color="primary"
          onClick={resetFilters}
          sx={{ alignSelf: "start" }}
        >
          Clear All
        </Button>
      )}
    </Stack>
  );
}

function FilterGroup<T extends WorkArrangementData | ApplicationStatusData>({
  groupLabel,
  options,
  selected,
  onChange,
}: {
  groupLabel?: string;
  options: {
    label: string;
    value: T;
  }[];
  selected: T[];
  onChange: (value: T) => void;
}) {
  return (
    <Stack sx={{ width: "fit-content", pl: 1 }}>
      {groupLabel && (
        <Typography
          variant="body2"
          component="span"
          fontWeight="medium"
          gutterBottom
        >
          {groupLabel}
        </Typography>
      )}
      <FormGroup>
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: `repeat(${Math.min(options.length, 4)}, auto)`,
            gridAutoFlow: "column",
            columnGap: 2,
          }}
        >
          {options.map((option) => {
            return (
              <Box key={option.value} sx={{ whiteSpace: "nowrap", pr: 2 }}>
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={selected.includes(option.value)}
                      onChange={() => onChange(option.value)}
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
                      {option.label}
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
