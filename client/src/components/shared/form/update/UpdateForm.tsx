import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FieldErrors, useForm } from "react-hook-form";
import FormHeader from "@/components/shared/form/FormHeader";
import {
  type ApplicationFormInput,
  applicationFormSchema,
  type ApplicationFormOutput,
} from "@/lib/schema/applicationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useApplications } from "@/utils/hooks/useApplications";
import ApplicationForm from "@/components/applications/ApplicationForm";
import { showToast } from "@/lib/config/toast";

export default function UpdateForm({
  application,
  id,
}: {
  application: ApplicationFormInput;
  id: string;
}) {
  const navigate = useNavigate();
  const { updateApplication } = useApplications();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormInput, unknown, ApplicationFormOutput>({
    resolver: zodResolver(applicationFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: application,
  });

  const onSubmit = async (data: ApplicationFormOutput) => {
    await updateApplication({ data, id });
  };

  const onError = (errors: FieldErrors<ApplicationFormInput>) => {
    showToast("error", "Please fix errors before saving");

    console.error("ERRORS:", errors);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Stack
      height="100%"
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      {/* Header */}
      <FormHeader
        isSubmitting={isSubmitting}
        isMultiple={false}
        title="Applications"
        onBack={() => navigate("/applications")}
      />

      {/* Content */}
      <Box p={6} className="thin-scrollbar">
        <Box className="mx-auto w-full max-w-4xl space-y-6!">
          <Typography variant="h5" color="initial" fontWeight="semiBold">
            Update Application
          </Typography>

          <Box
            bgcolor="white"
            borderRadius={4}
            border={hasErrors ? "1px solid red" : "none"}
            className="subtle-shadow"
            px={4}
            py={6}
          >
            <ApplicationForm<ApplicationFormInput>
              control={control}
              errors={errors}
            />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
