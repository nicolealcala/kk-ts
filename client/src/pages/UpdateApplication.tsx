import { type FieldErrors } from "react-hook-form";
import {
  applicationFormSchema,
  type ApplicationFormInput,
  type ApplicationFormOutput,
} from "@/lib/schema/applicationSchema";
import { useParams } from "react-router";
import { useApplications } from "@/utils/hooks/useApplications";
import { useFetchApplication } from "@/utils/hooks/useFetchApplication";
import UpdateApplicationWrapper from "@/components/applications/UpdateApplicationWrapper";
import Loader from "@/components/shared/Loader";
import { deepEqual } from "@/utils/comparison";
import { showToast } from "@/lib/config/toast";

export default function UpdateApplication() {
  const { id } = useParams();
  const {
    data: application,
    isLoading,
    isError,
    error,
  } = useFetchApplication(id);

  const { updateApplication } = useApplications();

  if (isLoading) {
    return <Loader />;
  }
  if (isError || !id) {
    console.log(error);
    return <p>Error</p>;
  }

  const onSubmit = async (data: ApplicationFormOutput) => {
    if (!id) return;

    const isEqual = deepEqual(application, data, applicationFormSchema);

    if (isEqual) {
      showToast("info", "No changes to save");
      return;
    }

    await updateApplication({ data, id: id });
  };

  const onError = (errors: FieldErrors<ApplicationFormInput>) => {
    showToast("error", "Please fix errors before saving");
    console.error("ERRORS:", errors);
  };

  return (
    <UpdateApplicationWrapper
      data={application}
      onSubmit={onSubmit}
      onError={onError}
    />
  );
}
