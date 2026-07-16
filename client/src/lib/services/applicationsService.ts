import supabase from "../config/supabaseClient";
import type { ApplicationFormInputs } from "../forms/applicationFormSchema";

//const URL = `${import.meta.env.VITE_BASE_URL}/api/applications`;

export async function getApplications(currentLocaleDate?: string) {
  console.log(currentLocaleDate);
  // const response = await fetch(`${URL}?date=${currentLocaleDate}`);

  // if (!response.ok) throw new Error("Failed to fetch applications");

  // return await response.json();
  const { data, count, error } = await supabase
    .from("applications")
    .select("*", { count: "exact" })
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message, { cause: error });
  return { applications: data, totalCount: count };
}

export const upsertApplication = async (
  formData: ApplicationFormInputs,
  selectedId?: string,
) => {
  // const isUpdate = !!selectedId;
  // const url = isUpdate ? `${URL}/${selectedId}` : URL;

  // const response = await fetch(url, {
  //   method: isUpdate ? "PATCH" : "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ ...formData }),
  // });

  // if (!response.ok) throw new Error("Save failed");
  // return await response.json();

  const { data, error } = await supabase
    .from("applications")
    .upsert({
      id: selectedId,
      ...formData,
    })
    .select();

  if (error) throw new Error(error.message, { cause: error });
  return data;
};

export const deleteApplication = async (idOrIds: string | string[]) => {
  //const isBulkDelete = Array.isArray(idOrIds);

  // const url = isBulkDelete
  //   ? `${URL}?ids=${idOrIds.map((id) => id)}`
  //   : `${URL}/${idOrIds}`;

  // const response = await fetch(url, {
  //   method: "DELETE",
  //   headers: { "Content-Type": "application/json" },
  // });

  // if (!response.ok) throw new Error("Failed to delete");
  // return await response.json();

  const arrayIds = Array.isArray(idOrIds) ? idOrIds : [idOrIds];
  const { data, error } = await supabase
    .from("applications")
    .delete()
    .in("id", arrayIds);

  if (error) {
    throw new Error("Failed to delete your application", { cause: error });
  }
  return data;
};
