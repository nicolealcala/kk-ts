import type { ApplicationTableData } from "@/components/applications/Columns";
import type {
  ApplicationStatusData,
  WorkArrangementData,
} from "@/lib/schema/applicationSchema.ts";
import { create } from "zustand";
import { combine } from "zustand/middleware";

export type SortColumn =
  | "appliedAt"
  | "position"
  | "company"
  | "location"
  | "source"
  | "status"
  | "workArrangment";
type SortOrder = "asc" | "desc";
export type PaginationData = {
  page?: number;
  pageSize?: number;
  totalCount?: number;
  filteredCount?: number;
  totalPages?: number;
};
export type FiltersArg =
  | {
      type: "workArrangement";
      filter: WorkArrangementData;
    }
  | {
      type: "status";
      filter: ApplicationStatusData;
    };

export type ApplicationTableState = {
  sortBy: SortColumn;
  sortOrder: SortOrder;
  searchTerm?: string;
  workArrangementFilters?: WorkArrangementData[];
  statusFilters?: ApplicationStatusData[];
  selectedApplications: ApplicationTableData[];
  pagination: PaginationData;
};

export const DEFAULT_SORT_BY = "appliedAt";
export const DEFAULT_SORT_ORDER: SortOrder = "desc";
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;

const getInitialTableParams = (): ApplicationTableState => {
  if (typeof window === "undefined")
    return {
      sortBy: DEFAULT_SORT_BY,
      sortOrder: DEFAULT_SORT_ORDER,
      selectedApplications: [],
      pagination: { page: 1, pageSize: 10, totalCount: 0, filteredCount: 0 },
    };

  const params = new URLSearchParams(window.location.search);

  return {
    sortBy: (params.get("sortBy") as SortColumn) ?? DEFAULT_SORT_BY,
    sortOrder: (params.get("sortOrder") as SortOrder) ?? DEFAULT_SORT_ORDER,
    selectedApplications: [],
    pagination: {
      page: Number(params.get("page")) || DEFAULT_PAGE,
      pageSize: Number(params.get("pageSize") || DEFAULT_PAGE_SIZE),
      totalCount: 0,
      filteredCount: 0,
    },
  };
};
export const useApplicationTable = create(
  combine(getInitialTableParams(), (set) => ({
    setSortBy: (column: SortColumn) =>
      set((state) => ({
        sortBy: column,
        pagination: {
          ...state.pagination,
          page: DEFAULT_PAGE,
        },
      })),
    setSortOrder: (order: SortOrder) =>
      set((state) => ({
        sortOrder: order,
        pagination: {
          ...state.pagination,
          page: DEFAULT_PAGE,
        },
      })),
    setSearchTerm: (term: string) =>
      set((state) => ({
        searchTerm: term || undefined,
        pagination: {
          ...state.pagination,
          page: DEFAULT_PAGE,
        },
      })),
    setPagination: (pagination: Partial<PaginationData>) =>
      set((state) => ({
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      })),
    setSelectedApplications: (applications: ApplicationTableData[]) =>
      set({
        selectedApplications: applications,
      }),
    setFilters: ({ filter, type }: FiltersArg) =>
      set((state) => {
        if (type === "workArrangement") {
          const filters = state.workArrangementFilters ?? [];

          const workArrangementFilters = filters.includes(filter)
            ? filters.filter((value) => value !== filter)
            : [...filters, filter];

          return {
            workArrangementFilters,
            pagination: {
              ...state.pagination,
              page: DEFAULT_PAGE,
            },
          };
        }

        const filters = state.statusFilters ?? [];

        const statusFilters = filters.includes(filter)
          ? filters.filter((value) => value !== filter)
          : [...filters, filter];

        return {
          statusFilters,
          pagination: {
            ...state.pagination,
            page: DEFAULT_PAGE,
          },
        };
      }),
    resetFilters: () =>
      set((state) => ({
        workArrangementFilters: undefined,
        statusFilters: undefined,
        pagination: {
          ...state.pagination,
          page: DEFAULT_PAGE,
        },
      })),
  })),
);
