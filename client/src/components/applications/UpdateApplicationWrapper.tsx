import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import FormHeader from "@/components/shared/form/FormHeader";
import {
  type ApplicationFormInput,
  applicationFormSchema,
  type ApplicationFormOutput,
} from "@/lib/schema/applicationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import ApplicationForm from "@/components/applications/ApplicationForm";

type UpdateApplicationWrapperProps = {
  data: ApplicationFormInput;
  onSubmit: SubmitHandler<ApplicationFormOutput>;
  onError?: SubmitErrorHandler<ApplicationFormInput>;
};
export default function UpdateApplicationWrapper({
  data,
  onSubmit,
  onError,
}: UpdateApplicationWrapperProps) {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormInput, unknown, ApplicationFormOutput>({
    resolver: zodResolver(applicationFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: data,
  });

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
