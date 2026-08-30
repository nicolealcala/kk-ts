import { zodResolver } from "@hookform/resolvers/zod";
import { useWatch, useForm, type FieldErrors } from "react-hook-form";
import { useNavigate } from "react-router";

import BatchCreate from "@/components/shared/form/batch-create/BatchCreate";
import ApplicationForm from "@/components/applications/ApplicationForm";
import {
  applicationsFormSchema,
  initialValues,
  type ApplicationsFormInput,
  type ApplicationsFormOutput,
} from "@/lib/schema/applicationSchema.ts";
import { useApplications } from "@/utils/hooks/useApplications";
import { showToast } from "@/lib/config/toast";

export default function CreateApplication() {
  const navigate = useNavigate();
  const { createApplication } = useApplications();

  const form = useForm<ApplicationsFormInput, unknown, ApplicationsFormOutput>({
    resolver: zodResolver(applicationsFormSchema),
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
    formState: { errors },
  } = form;
  const onSubmit = async (data: ApplicationsFormOutput) => {
    await createApplication(data);
  };

  const onError = (errors: FieldErrors<ApplicationsFormInput>) => {
    showToast("error", "Please fix errors before saving");
    console.error("ERRORS:", errors);
  };

  return (
    <BatchCreate
      form={form}
      fieldArrayName="applications"
      defaultItem={{ ...initialValues }}
      title="Applications"
      onSubmit={onSubmit}
      onError={onError}
      onBack={() => navigate("/applications")}
      getItemTitle={(index) => {
        const position = applications[index]?.position.trim();
        const company = applications[index]?.company.trim();

        if (position && company) return `${position} at ${company}`;
        if (position) return position;

        return `Application ${index + 1}`;
      }}
      renderForm={(index) => (
        <ApplicationForm<ApplicationsFormInput>
          control={control}
          errors={errors.applications?.[index]}
          fieldPrefix={`applications.${index}.`}
        />
      )}
    />
  );
}
