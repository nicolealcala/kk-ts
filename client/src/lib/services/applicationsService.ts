import type { ApplicationFormInputs } from "../forms/applicationFormSchema";

export async function getApplications(currentLocaleDate: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/applications?date=${currentLocaleDate}`,
  );

  if (!response.ok) throw new Error("Failed to fetch applications");

  return await response.json();
}

export const updateApplication = async (
  formData: ApplicationFormInputs,
  selectedId?: string,
) => {
  const isUpdate = !!selectedId;
  const url = isUpdate
    ? `${import.meta.env.VITE_BASE_URL}/api/applications/${selectedId}`
    : `${import.meta.env.VITE_BASE_URL}/api/applications`;

  const response = await fetch(url, {
    method: isUpdate ? "PATCH" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...formData }),
  });

  if (!response.ok) throw new Error("Save failed");
  return await response.json();
};
