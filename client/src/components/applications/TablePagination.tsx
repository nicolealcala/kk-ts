import { useApplicationTable } from "@/store/application/applicationStore";
import useShallowStore from "@/store/useShallowStore";
import { handlePageChange } from "@/utils/application/table";
import Pagination from "@mui/material/Pagination";
export default function TablePagination() {
  const { page, totalPages, setPagination } = useShallowStore(
    useApplicationTable,
    (state) => ({
      page: state.pagination.page,
      totalPages: state.pagination.totalPages,
      setPagination: state.setPagination,
    }),
  );
  return (
    <Pagination
      count={totalPages}
      page={page}
      color="primary"
      size="large"
      sx={{
        mx: "auto",
        mt: 2.5,
        "& .MuiPaginationItem-root": {
          borderRadius: 3,
        },
      }}
      shape="rounded"
      onChange={(_, newPage) => handlePageChange(newPage, setPagination)}
    />
  );
}
