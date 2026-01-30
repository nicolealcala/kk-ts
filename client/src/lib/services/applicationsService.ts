import type { ApplicationFormInputs } from "../forms/applicationFormSchema";

const URL = `${import.meta.env.VITE_BASE_URL}/api/applications`;
export async function getApplications(currentLocaleDate?: string) {
  const response = await fetch(`${URL}?date=${currentLocaleDate}`);

  if (!response.ok) throw new Error("Failed to fetch applications");

  return await response.json();
}

export const updateApplication = async (
  formData: ApplicationFormInputs,
  selectedId?: string,
) => {
  const isUpdate = !!selectedId;
  const url = isUpdate ? `${URL}/${selectedId}` : URL;

  const response = await fetch(url, {
    method: isUpdate ? "PATCH" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...formData }),
  });

  if (!response.ok) throw new Error("Save failed");
  return await response.json();
};

export const deleteApplication = async (idOrIds: string | string[]) => {
  const isBulkDelete = Array.isArray(idOrIds);

  const url = isBulkDelete
    ? `${URL}?ids=${idOrIds.map((id) => id)}`
    : `${URL}/${idOrIds}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) throw new Error("Failed to delete");
  return await response.json();
};
