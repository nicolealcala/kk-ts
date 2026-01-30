/* eslint-disable @typescript-eslint/no-explicit-any */
import Drawer from "@mui/material/Drawer";
import { DrawerHeader } from "../layout/Sidebar";
import type { ApplicationFormInputs } from "@/lib/forms/applicationFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import applicationFormSchema, {
  initialValues,
} from "@/lib/forms/applicationFormSchema";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import type { OpenDrawerValues } from "@/lib/types/forms";
import Stack from "@mui/material/Stack";
import ControlledFormTextField from "../shared/form/ControlledFormTextField";
import ControlledFormSelect from "../shared/form/ControlledFormSelect";
import { ControlledFormAutocomplete } from "../shared/form/ControlledFormAutocomplete";
import React from "react";
import Divider from "@mui/material/Divider";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import FormButtons from "../shared/form/FormButtons";
import type { CustomApplication } from "./Columns";
import { useApplicationsData } from "@/utils/hooks/useApplicationsData";
import useRestCountriesData from "@/utils/hooks/useRestCountriesData";

type ApplicationFormProps = {
  openDrawer: OpenDrawerValues;
  setOpenDrawer: React.Dispatch<React.SetStateAction<OpenDrawerValues>>;
  selectedApplication: CustomApplication | null;
  setSelectedApplication: React.Dispatch<
    React.SetStateAction<CustomApplication | null>
  >;
};

const jobTypeOptions = [
  { value: "gig", label: "Gig" },
  { value: "partime", label: "Part-time" },
  { value: "fulltime", label: "Full-time" },
  { value: "contract", label: "Contract" },
];
const modalityOptions = [
  { value: "remote", label: "Remote" },
  { value: "onsite", label: "In-Person" },
  { value: "hybrid", label: "Hybrid" },
];

const platformOptions = [
  { value: "glassdoor", label: "Glassdoor" },
  { value: "indeed", label: "Indeed" },
  { value: "jobstreet", label: "JobStreet" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "other", label: "Other" },
];

const statusOptions = [
  { label: "Applied", value: "applied" },
  { label: "Interviewing", value: "interviewing" },
  { label: "Offered", value: "offered" },
  { label: "Rejected", value: "rejected" },
  { label: "Withdrawn", value: "withdrawn" },
  { label: "Accepted", value: "accepted" },
  { label: "Ghosted", value: "ghosted" },
];

export default function ApplicationForm({
  openDrawer,
  setOpenDrawer,
  selectedApplication,
  setSelectedApplication,
}: ApplicationFormProps) {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormInputs>({
    resolver: zodResolver(applicationFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: initialValues,
  });

  function handleCancel() {
    reset(initialValues);
    setSelectedApplication(null);
    setOpenDrawer(null);
  }

  const currentLocalDate = new Date().toISOString().split("T")[0];
  const { saveApplication } = useApplicationsData(currentLocalDate);

  async function onSubmit(formData: ApplicationFormInputs) {
    saveApplication(
      { data: formData, id: selectedApplication?.id },
      {
        onSuccess: () => {
          setOpenDrawer(null);
          reset();
        },
      },
    );
  }

  const { countries, currencies, isLoading } = useRestCountriesData();

  React.useEffect(() => {
    if (selectedApplication) {
      reset({
        ...initialValues,
        ...selectedApplication,
      } as ApplicationFormInputs);

      setOpenDrawer("update");
    }
  }, [selectedApplication, setOpenDrawer, reset]);

  return (
    <Drawer open={!!openDrawer} onClose={handleCancel} anchor="right">
      <DrawerHeader />
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          my: 2,
          mt: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Typography variant="h5" component="h1" fontWeight="medium" px={2.5}>
          {openDrawer === "create"
            ? "Add an application"
            : "Update application"}
        </Typography>

        <Box
          sx={{
            p: 2.5,
            pr: 1.3,
            pb: 0,
          }}
          className="thin-scrollbar"
        >
          <Stack spacing={3}>
            {/* Position Field */}
            <ControlledFormTextField
              name="position"
              control={control}
              label="Position"
              placeholder="Position"
            />

            <Stack direction="row" spacing={2}>
              {/* Organization Field */}
              <Box flex={2}>
                <ControlledFormTextField
                  name="organization"
                  control={control}
                  label="Organization"
                  error={!!errors.organization}
                  placeholder="Organization Name"
                />
              </Box>

              {/* Location Field */}
              <Box flex={1}>
                <ControlledFormAutocomplete
                  name="location.country"
                  control={control}
                  options={countries}
                  loading={isLoading}
                  label="Location"
                  placeholder={
                    isLoading ? "Loading countries..." : "Search for a country"
                  }
                />
              </Box>
            </Stack>

            <Stack direction="row" spacing={2}>
              {/* Job Type Field */}
              <ControlledFormSelect
                name="type"
                control={control}
                label="Job Type"
                items={jobTypeOptions}
              />
              {/* Work Arrangement Field */}
              <ControlledFormSelect
                name="workArrangement"
                control={control}
                label="Arrangement"
                items={modalityOptions}
              />
              {/* Status Field */}
              <ControlledFormSelect
                name="status"
                control={control}
                label="Status"
                items={statusOptions}
              />
            </Stack>

            <Divider />
            <Stack spacing={1.5}>
              <Typography variant="body1" color="textSecondary">
                Salary Range:
              </Typography>

              <Stack direction="row" spacing={2}>
                <ControlledFormAutocomplete
                  name="salary.currency"
                  control={control}
                  label={"Currency"}
                  options={currencies}
                />

                <ControlledFormTextField
                  name="salary.minAmount"
                  control={control}
                  label="Minimum"
                  type="number"
                />
                <ControlledFormTextField
                  name="salary.maxAmount"
                  control={control}
                  label="Maximum"
                  type="number"
                />
              </Stack>
            </Stack>

            <Divider />
            <Stack spacing={1.5}>
              <Typography variant="body1" color="textSecondary">
                Source:
              </Typography>
              <Stack direction="row" spacing={2}>
                {/* Source Platform Field*/}
                <Box sx={{ flex: 1 }}>
                  <ControlledFormSelect
                    name="source.platform"
                    control={control}
                    label="Platform"
                    items={platformOptions}
                  />
                </Box>

                {/* Source Link Field*/}
                <Box sx={{ flex: 2 }}>
                  <ControlledFormTextField
                    name="source.link"
                    control={control}
                    label="Link"
                    placeholder="Link"
                  />
                </Box>
              </Stack>
            </Stack>

            {/* Description Field */}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <MDEditor
                  value={field.value}
                  onChange={field.onChange}
                  preview="edit"
                  previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                  }}
                  textareaProps={{
                    placeholder: "Description (optional)",
                  }}
                />
              )}
            />
          </Stack>
        </Box>

        <Stack direction="row" spacing={2} width="100%" px={2.5}>
          {/* Cancel Button */}
          <FormButtons
            type="button"
            variant="outlined"
            loading={isSubmitting}
            onClick={handleCancel}
          >
            Cancel
          </FormButtons>

          {/* Save Button */}
          <FormButtons type="submit" loading={isSubmitting}>
            Save
          </FormButtons>
        </Stack>
      </Box>
    </Drawer>
  );
}
