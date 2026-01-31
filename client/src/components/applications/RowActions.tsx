import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import type { ApplicationRow } from "./Columns";
import { TrashIcon } from "@heroicons/react/24/solid";

type ApplicationRowProps = {
  row: ApplicationRow;
  onEditRow: () => void;
  onDeleteRow: () => void;
};

export default function RowActions({
  row,
  onEditRow,
  onDeleteRow,
}: ApplicationRowProps) {
  return (
    <Stack direction="row" spacing={1} maxWidth="fit-content">
      <IconButton
        size="small"
        onClick={() => row.toggleExpanded()}
        disabled={!row.original.description || row.getIsSelected()}
        sx={{
          transform: row.getIsExpanded() ? "rotate(180deg)" : "rotate(0deg)",
          transition: "0.2s",
          "&:hover": {
            color: "black",
          },
        }}
      >
        <ExpandMoreRoundedIcon />
      </IconButton>
      <IconButton
        size="small"
        disabled={row.getIsSelected()}
        onClick={(e) => {
          e.stopPropagation();
          onEditRow();
        }}
        sx={{
          transition: "0.2s",
          "&:hover": {
            color: "black",
          },
        }}
      >
        <EditRoundedIcon />
      </IconButton>

      <IconButton
        size="small"
        disabled={row.getIsSelected()}
        onClick={(e) => {
          e.stopPropagation();
          onDeleteRow();
        }}
        sx={{
          width: 34,
          height: 34,
          transition: "0.2s",
          "&:hover": {
            color: "black",
          },
        }}
      >
        <TrashIcon style={{ width: 20, height: 20 }} />
      </IconButton>
    </Stack>
  );
}
