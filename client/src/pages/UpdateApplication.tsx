import { type FieldErrors } from "react-hook-form";
import {
  applicationFormSchema,
  type ApplicationFormInput,
  type ApplicationFormOutput,
} from "@/lib/schema/applicationSchema";
import { useParams } from "react-router";
import { useApplications } from "@/utils/hooks/useApplications";
import UpdateApplicationWrapper from "@/components/applications/UpdateApplicationWrapper";
import Loader from "@/components/shared/Loader";
import { deepEqual } from "@/utils/comparison";
import { showToast } from "@/lib/config/toast";
import { useQuery } from "@tanstack/react-query";
import { applicationKeys } from "@/lib/data/applicationKeys";
import { getApplicationById } from "@/lib/services/applicationService";

export default function UpdateApplication() {
  const { id } = useParams();
  const query = useQuery({
    queryKey: id ? applicationKeys.detail(id) : applicationKeys.details(),
    queryFn: () => {
      if (!id) {
        throw new Error("Fetch failed: Missing application ID");
      }

      return getApplicationById(id);
    },
    enabled: !!id,
  });

  const { updateApplication } = useApplications();

  if (query.isLoading) {
    return <Loader />;
  }
  if (query.isError || !id) {
    console.log(query.error);
    return <p>Error</p>;
  }

  const handleSubmit = async (data: ApplicationFormOutput) => {
    if (!id) return;

    const isEqual = deepEqual(query.data, data, applicationFormSchema);

    if (isEqual) {
      showToast("info", "No changes to save");
      return;
    }

    await updateApplication({ data, id: id });
  };

  const handleError = (errors: FieldErrors<ApplicationFormInput>) => {
    showToast("error", "Please fix errors before saving");
    console.error("ERRORS:", errors);
  };

  return (
    <UpdateApplicationWrapper
      data={query.data}
      onSubmit={handleSubmit}
      onError={handleError}
    />
  );
}
