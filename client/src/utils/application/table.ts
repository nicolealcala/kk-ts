import {
  DEFAULT_PAGE,
  useApplicationTable,
  type SortColumn,
} from "@/store/application/applicationStore";
import type {
  RowSelectionState,
  SortingState,
  Updater,
} from "@tanstack/react-table";
import { updateUrl } from "../url";
import type { ApplicationTableData } from "@/components/applications/Columns";

export const handleSort = (
  updater: Updater<SortingState>,
  setSortBy: (column: SortColumn) => void,
  setSortOrder: (order: "asc" | "desc") => void,
  invalidateQueries: (queryKey: readonly unknown[]) => Promise<void>,
) => {
  const { sortBy, sortOrder } = useApplicationTable.getState();
  const currentSorting = [{ id: sortBy, desc: sortOrder === "desc" }];

  const nextSorting =
    typeof updater === "function" ? updater(currentSorting) : updater;

  const nextSort = nextSorting[0];

  if (!nextSort) return;

  setSortBy(nextSort.id as SortColumn);
  setSortOrder(nextSort.desc === true ? "desc" : "asc");
  invalidateQueries(["applicationsData"]);
  updateUrl({
    sortBy: nextSort.id,
    sortOrder: nextSort.desc === true ? "desc" : "asc",
    page: DEFAULT_PAGE,
  });
};

export function handleRowSelectionChange(
  updater: Updater<RowSelectionState>,
  rowSelection: RowSelectionState,
  data: ApplicationTableData[],
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>,
  setSelectedApplications: (applications: ApplicationTableData[]) => void,
) {
  const next = typeof updater === "function" ? updater(rowSelection) : updater;

  const selected = data.filter((application) => next[application.id]);

  setSelectedApplications(selected);
  setRowSelection(next);
}
