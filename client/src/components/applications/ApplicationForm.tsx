import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form";
import Stack from "@mui/material/Stack";
import ControlledFormTextField from "../shared/form/ControlledFormTextField";
import ControlledFormSelect from "../shared/form/ControlledFormSelect";
import { ControlledFormAutocomplete } from "../shared/form/ControlledFormAutocomplete";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import {
  jobTypeOptions,
  modalityOptions,
  payFrequencyOptions,
  platformOptions,
  statusOptions,
} from "@/lib/data/applicationComponentValues";
import useRestCountriesData from "@/utils/hooks/useRestCountriesData";
import Button from "@mui/material/Button";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

type ApplicationFormProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  errors?: FieldErrors<TFieldValues>;
  fieldPrefix?: string;
};

export default function ApplicationForm<TFieldValues extends FieldValues>({
  control,
  errors,
  fieldPrefix = "",
}: ApplicationFormProps<TFieldValues>) {
  const field = (name: string) => `${fieldPrefix}${name}` as Path<TFieldValues>;

  const { countries, currencies, isLoading } = useRestCountriesData();
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "900px",
      }}
    >
      <Stack spacing={3} useFlexGap={true}>
        {/* Position Field */}
        <ControlledFormTextField
          name={field("position")}
          control={control}
          label="Position"
          placeholder="Position/Role"
          error={!!errors?.position}
          required
        />
        {/* Company Field */}
        <ControlledFormTextField
          name={field("company")}
          control={control}
          label="Company"
          error={!!errors?.company}
          placeholder="Company Name"
          required
        />

        <Stack direction="row" spacing={2}>
          {/* Work Arrangement Field */}
          <ControlledFormSelect
            name={field("workArrangement")}
            control={control}
            label="Work Arrangement"
            items={modalityOptions}
          />

          {/* Location Field */}
          <ControlledFormAutocomplete
            name={field("location.countryCode")}
            control={control}
            options={countries}
            loading={isLoading}
            label="Location"
            placeholder={
              isLoading ? "Loading countries..." : "Search for a country"
            }
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          {/* Job Type Field */}
          <ControlledFormSelect
            name={field("employmentType")}
            control={control}
            label="Job Type"
            items={jobTypeOptions}
          />

          {/* Status Field */}
          <ControlledFormSelect
            name={field("status")}
            control={control}
            label="Status"
            items={statusOptions}
          />
        </Stack>

        <Typography fontSize={18} fontWeight={600} mt={1.5} mb={-1}>
          Source Information
        </Typography>
        <Stack direction="row" spacing={2}>
          {/* Source Platform Field*/}
          <Box sx={{ flex: 1 }}>
            <ControlledFormSelect
              name={field("source.platform")}
              control={control}
              label="Platform"
              items={platformOptions}
              required
            />
          </Box>

          {/* Source Link Field*/}
          <Box sx={{ flex: 2 }}>
            <ControlledFormTextField
              name={field("source.url")}
              control={control}
              label="Link"
              placeholder="Link"
            />
          </Box>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mt={1.5}
          mb={-1}
        >
          <Typography fontSize={18} fontWeight={600}>
            Job Description
          </Typography>
          <Button variant="text" startIcon={<AutoAwesomeIcon />} disabled>
            Generate with AI
          </Button>
        </Stack>

        {/* Description Field */}
        <Controller
          name={field("jobDescription")}
          control={control}
          render={({ field }) => (
            <MDEditor
              value={field.value ?? ""}
              onChange={field.onChange}
              preview="edit"
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
              textareaProps={{
                placeholder: "Write additional information here",
              }}
            />
          )}
        />

        {/* Compensation Fields */}
        <Typography fontSize={18} fontWeight={600} mt={1.5} mb={-1}>
          Compensation
        </Typography>
        <Stack direction="row" spacing={2}>
          <ControlledFormAutocomplete
            name={field("currency")}
            control={control}
            label={"Currency"}
            options={currencies}
          />

          <ControlledFormTextField
            name={field("compensationMin")}
            control={control}
            label="Minimum"
            type="number"
          />
          <ControlledFormTextField
            name={field("compensationMax")}
            control={control}
            label="Maximum"
            type="number"
          />
          <ControlledFormSelect
            name={field("payFrequency")}
            control={control}
            label="Pay Frequency"
            items={payFrequencyOptions}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
