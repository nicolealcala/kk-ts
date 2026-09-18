import type {
  ApplicationFormInput,
  ApplicationsBatchCreateFormOutput,
  ApplicationStatusData,
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

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatusData,
) {
  const response = await fetch(`${URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update application status");
  }

  return response.json();
}

export async function deleteApplication(ids: string[]) {
  if (!ids || ids.length === 0) {
    return;
  }

  const url = `${URL}/delete`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ids),
  });

  if (!response.ok) {
    throw new Error("Failed to delete application");
  }

  return response.json();
}
