import React from "react";
import { Menu, MenuItem, IconButton, ListItemIcon } from "@mui/material";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import InfoOutlineRoundedIcon from "@mui/icons-material/InfoOutlineRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

const applicationMenuItems = [
  {
    label: "Delete",
    icon: DeleteOutlineRoundedIcon,
    color: "hover:bg-red-50! text-red-500!",
  },
  { label: "Archive", icon: ArchiveOutlinedIcon },
  { label: "Info", icon: InfoOutlineRoundedIcon },
];

export default function ApplicationMenu() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={handleOpen} size="small">
        <MoreHorizRoundedIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {applicationMenuItems.map((item) => (
          <MenuItem key={item.label} className={item.color ?? ""}>
            <ListItemIcon>
              <item.icon fontSize="small" className={item.color ?? ""} />
            </ListItemIcon>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
