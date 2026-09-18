import type { WorkArrangementData } from "@/lib/schema/applicationSchema";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER,
  type ApplicationTableState,
  type SortColumn,
} from "@/store/application/applicationStore";

type QueryParamValue = string | number | boolean | null | undefined;

interface AppSearchState {
  [key: string]: QueryParamValue | QueryParamValue[];
}
export function createSearchQuery(stateObject: AppSearchState) {
  const queryParams = new URLSearchParams();

  Object.entries(stateObject).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") return;

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== null && item !== undefined && item !== "")
          queryParams.append(key, String(item));
      });
    } else queryParams.set(key, String(value));
  });

  return queryParams.toString();
}

export function getApplicationTableStateFromUrl(
  search: string,
): Partial<ApplicationTableState> {
  const params = new URLSearchParams(search);

  const page = Number(params.get("page"));
  const pageSize = Number(params.get("pageSize"));

  const sortBy = params.get("sortBy") as SortColumn | null;
  const sortOrder = params.get("sortOrder") as "asc" | "desc" | null;

  const searchTerm = params.get("search") || undefined;

  const workArrangementFilters = params.getAll("workArrangement");
  const statusFilters = params.getAll("status");

  return {
    sortBy: sortBy ?? DEFAULT_SORT_BY,

    sortOrder: sortOrder ?? DEFAULT_SORT_ORDER,

    searchTerm,

    workArrangementFilters:
      workArrangementFilters.length > 0
        ? (workArrangementFilters as ApplicationTableState["workArrangementFilters"])
        : undefined,

    statusFilters:
      statusFilters.length > 0
        ? (statusFilters as ApplicationTableState["statusFilters"])
        : undefined,

    pagination: {
      page: page > 0 ? page : DEFAULT_PAGE,
      pageSize: pageSize > 0 ? pageSize : DEFAULT_PAGE_SIZE,
    },
  };
}

export function updateUrls(state: AppSearchState) {
  const search = createSearchQuery(state);

  window.history.pushState(
    null,
    "",
    search ? `?${search}` : window.location.pathname,
  );
}

export function updateUrl(stateObject: AppSearchState) {
  const queryParams = new URLSearchParams();

  Object.entries(stateObject).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      queryParams.delete(key);
      return;
    }

    if (Array.isArray(value)) {
      queryParams.delete(key);

      value.forEach((item) => {
        if (item !== null && item !== undefined && item !== "")
          queryParams.append(key, String(item));
      });
      return;
    }

    queryParams.set(key, String(value));
  });
  window.history.pushState(
    null,
    "",
    queryParams.toString()
      ? `${window.location.pathname}?${queryParams.toString()}`
      : window.location.pathname,
  );
}
