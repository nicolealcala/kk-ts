export async function getApplications(currentLocaleDate: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/applications?date=${currentLocaleDate}`,
  );

  if (!response.ok) throw new Error("Failed to fetch applications");

  return await response.json();
}
