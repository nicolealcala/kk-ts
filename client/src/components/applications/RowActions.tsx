import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import type { ApplicationRow } from "./Columns";

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
      >
        <DeleteRoundedIcon />
      </IconButton>
    </Stack>
  );
}
