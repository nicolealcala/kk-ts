import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import type { ApplicationRow } from "./Columns";
import { TrashIcon } from "@heroicons/react/24/solid";

type ApplicationRowProps = {
  row: ApplicationRow;
  onOpen: () => void;
};

export default function RowActions({ row, onOpen }: ApplicationRowProps) {
  return (
    <Stack direction="row" spacing={1} maxWidth="fit-content">
      <IconButton
        size="small"
        onClick={() => row.toggleExpanded()}
        disabled={row.original.description ? false : true}
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
        onClick={(e) => {
          e.stopPropagation(); 
          onOpen();
          console.log("Update ID:", row.original.id);
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
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering row click/expansion
          console.log("Delete ID:", row.original.id);
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
