import { zodResolver } from "@hookform/resolvers/zod";
import { useWatch, useForm, type FieldErrors } from "react-hook-form";
import { useNavigate } from "react-router";

import BatchCreate from "@/components/shared/form/batch-create/BatchCreate";
import ApplicationForm from "@/components/applications/ApplicationForm";
import {
  applicationBatchCreateSchema,
  initialValues,
  type ApplicationsBatchCreateFormInput,
  type ApplicationsBatchCreateFormOutput,
} from "@/lib/schema/applicationSchema.ts";
import { useApplications } from "@/utils/hooks/useApplications";
import { showToast } from "@/lib/config/toast";
import { useDialogStore } from "@/store/dialog/dialogStore";

export default function CreateApplication() {
  const navigate = useNavigate();
  const { createApplication } = useApplications();
  const openConfirmation = useDialogStore((state) => state.openConfirmation);
  const form = useForm<
    ApplicationsBatchCreateFormInput,
    unknown,
    ApplicationsBatchCreateFormOutput
  >({
    resolver: zodResolver(applicationBatchCreateSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      applications: [{ ...initialValues }],
    },
  });

  const applications = useWatch({
    control: form.control,
    name: "applications",
  });

  const {
    control,
    formState: { errors, isDirty },
  } = form;
  const onSubmit = async (data: ApplicationsBatchCreateFormOutput) => {
    await createApplication(data);
  };

  const handleError = (
    errors: FieldErrors<ApplicationsBatchCreateFormInput>,
  ) => {
    showToast("error", "Please fix errors before saving");
    console.error("ERRORS:", errors);
  };

  const handleBack = () => {
    if (isDirty)
      openConfirmation({
        title: "Discard changes?",
        message:
          "All progress will be discarded. This action cannot be undone.",
        type: "warning",
        onConfirm: () => navigate("/applications"),
        icon: "warning",
      });
    else navigate("/applications");
  };

  return (
    <BatchCreate
      form={form}
      fieldArrayName="applications"
      defaultItem={{ ...initialValues }}
      title="Applications"
      onSubmit={onSubmit}
      onError={handleError}
      onBack={handleBack}
      getItemTitle={(index) => {
        const position = applications[index]?.position.trim();
        const company = applications[index]?.company.trim();

        if (position && company) return `${position} at ${company}`;
        if (position) return position;

        return `Application ${index + 1}`;
      }}
      renderForm={(index) => (
        <ApplicationForm<ApplicationsBatchCreateFormInput>
          control={control}
          errors={errors.applications?.[index]}
          fieldPrefix={`applications.${index}.`}
        />
      )}
    />
  );
}
