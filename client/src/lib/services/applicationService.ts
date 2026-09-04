import type {
  ApplicationFormInput,
  ApplicationsBatchCreateFormOutput,
} from "../schema/applicationSchema";

const URL = `${import.meta.env.VITE_BASE_URL}/api/applications`;

export async function getApplications(urlQuery: string) {
  const response = await fetch(`${URL}?${urlQuery}`);

  if (!response.ok) {
    throw new Error("Failed to fetch applications");
  }

  return response.json();
}

export async function getApplicationById(id: string) {
  const response = await fetch(`${URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch application");
  }

  return response.json();
}

export async function createApplications(
  formsData: ApplicationsBatchCreateFormOutput,
) {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formsData.applications),
  });

  if (!response.ok) {
    throw new Error("Failed to create applications");
  }

  return response.json();
}

export async function updateApplication(
  formData: ApplicationFormInput,
  id: string,
) {
  const response = await fetch(`${URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to update application");
  }

  return response.json();
}

export async function deleteApplication(id: string | string[]) {
  if (!id || id.length === 0) {
    return;
  }

  const isBulkDelete = Array.isArray(id);
  const url = isBulkDelete ? `${URL}/bulk-delete` : `${URL}/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete application");
  }

  return response.json();
}
