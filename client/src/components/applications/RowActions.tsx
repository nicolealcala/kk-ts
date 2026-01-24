import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import type { ApplicationRow } from "./Columns";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function RowActions({ row }: { row: ApplicationRow }) {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        size="small"
        onClick={() => row.toggleExpanded()}
        disabled={row.original.description ? false : true}
        sx={{
          transform: row.getIsExpanded() ? "rotate(180deg)" : "rotate(0deg)",
          transition: "0.2s",
        }}
      >
        <ExpandMoreRoundedIcon />
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
        }}
      >
        <TrashIcon style={{ width: 20, height: 20 }} />
      </IconButton>
    </Stack>
  );
}
