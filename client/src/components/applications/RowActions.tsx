import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import type { ApplicationRow } from "./Columns";
import { TrashIcon } from "@heroicons/react/24/solid";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

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
  const actionButtonStyle = {
    width: 30,
    height: 30,
    transition: "0.2s",
    "&:hover": {
      color: "primary.main",
    },
  };

  const actionIconStyle = {
    width: 20,
    height: 20,
  };
  return (
    <Stack direction="row" spacing={0.5} maxWidth="fit-content">
      <IconButton
        size="small"
        onClick={() => row.toggleExpanded()}
        disabled={!row.original.jobDescription || row.getIsSelected()}
        sx={{
          transform: row.getIsExpanded() ? "rotate(180deg)" : "rotate(0deg)",
          ...actionButtonStyle,
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
        sx={actionButtonStyle}
      >
        <EditRoundedIcon sx={actionIconStyle} />
      </IconButton>

      <IconButton
        size="small"
        href={row.original.source?.url ?? "#"}
        target="_blank"
        disabled={!row.original.source?.url}
        sx={actionButtonStyle}
      >
        <OpenInNewRoundedIcon sx={actionIconStyle} />
      </IconButton>

      <IconButton
        size="small"
        disabled={row.getIsSelected()}
        onClick={(e) => {
          e.stopPropagation();
          onDeleteRow();
        }}
        sx={{
          ...actionButtonStyle,

          "&:hover": {
            color: "error.main",
          },
        }}
      >
        <TrashIcon style={actionIconStyle} />
      </IconButton>
    </Stack>
  );
}
