import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import {
  getApplications,
  createApplications,
  deleteApplication,
  updateApplication,
} from "@/lib/services/applicationService";

import { applicationKeys } from "@/lib/data/applicationKeys";

import {
  type ApplicationsBatchCreateFormOutput,
  type ApplicationFormInput,
} from "@/lib/schema/applicationSchema";
import useShallowStore from "@/store/useShallowStore";
import { useApplicationTable } from "@/store/application/applicationStore";
import { createSearchQuery } from "../url";
import { showToast } from "@/lib/config/toast";
import useDebounced from "./useDebounced";

export function useApplications(keys?: string[]) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { page, pageSize, sortBy, sortOrder, workArrangement, status, search } =
    useShallowStore(useApplicationTable, (state) => ({
      page: state.pagination.page,
      pageSize: state.pagination.pageSize,
      sortBy: state.sortBy,
      sortOrder: state.sortOrder,
      workArrangement: state.workArrangementFilters,
      status: state.statusFilters,
      search: state.searchTerm,
    }));

  const { setPagination } = useShallowStore(useApplicationTable, (state) => ({
    setPagination: state.setPagination,
  }));

  const debouncedSearch = useDebounced(search);

  const urlQuery = createSearchQuery({
    page,
    pageSize,
    sortBy,
    sortOrder,
    workArrangement,
    status,
    search: debouncedSearch,
  });

  // --- GET ALL ---
  const getAll = useQuery({
    queryKey: applicationKeys.list(urlQuery, keys),
    queryFn: async () => {
      const response = await getApplications(urlQuery);

      setPagination({
        totalCount: response.pagination.totalCount,
        filteredCount: response.pagination.filteredCount,
        totalPages: response.pagination.totalPages,
      });

      return response;
    },
  });

  // --- CREATE ---
  const createMutation = useMutation({
    mutationFn: (data: ApplicationsBatchCreateFormOutput) =>
      createApplications(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: applicationKeys.lists(),
      });

      showToast("success", "Applications saved successfully");
      navigate("/applications");
    },

    onError: () => {
      showToast("error", "Failed to save applications");
    },
  });

  // --- UPDATE ---
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ApplicationFormInput }) =>
      updateApplication(data, id),

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: applicationKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: applicationKeys.detail(id),
      });

      showToast("success", "Application updated successfully");

      navigate("/applications");
    },

    onError: (err) => {
      showToast("error", "Failed to update application");
      console.error(err);
    },
  });

  // --- DELETE ---
  const deleteMutation = useMutation({
    mutationFn: (idOrIds: string | string[]) => deleteApplication(idOrIds),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: applicationKeys.lists(),
      });

      if (Array.isArray(variables)) {
        for (const id of variables) {
          queryClient.removeQueries({
            queryKey: applicationKeys.detail(id),
          });
        }
      } else {
        queryClient.removeQueries({
          queryKey: applicationKeys.detail(variables),
        });
      }

      const isBulkDelete = Array.isArray(variables) && variables.length > 1;

      showToast(
        "success",
        isBulkDelete
          ? "Applications deleted successfully"
          : "Application deleted successfully",
      );
    },

    onError: (_, variables) => {
      const isBulkDelete = Array.isArray(variables) && variables.length > 1;

      showToast(
        "error",
        isBulkDelete
          ? "Failed to delete applications"
          : "Failed to delete application",
      );
    },
  });

  const invalidateQueries = (queryKey: readonly unknown[]) =>
    queryClient.invalidateQueries({
      queryKey,
    });

  return {
    applicationsList: {
      data: getAll.data?.data ?? [],
      isLoading: getAll.isLoading,
      isError: getAll.isError,
      error: getAll.error,
    },

    createApplication: createMutation.mutateAsync,
    isCreating: createMutation.isPending,

    updateApplication: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,

    deleteApplication: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,

    invalidateQueries,
  };
}
