import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { TrashIcon } from "@heroicons/react/24/solid";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { forwardRef, type ReactNode } from "react";

type FloatingMenuProps = {
  position: {
    top: number;
    left: number;
  } | null;
  fieldsLength: number;
  isExpanded: boolean;

  handleAdd: () => void;
  handleDelete: () => void;
  handleToggle: () => void;
};

type FloatingMenuItem = {
  key: string;
  icon: ReactNode;
  label: string;
  onClick: () => void;
};

const FloatingMenu = forwardRef<HTMLDivElement, FloatingMenuProps>(
  function FloatingMenu(
    {
      position,
      handleAdd,
      handleDelete,
      handleToggle,
      isExpanded,
      fieldsLength,
    },
    ref,
  ) {
    const menuItems: FloatingMenuItem[] = [
      {
        key: "add",
        icon: <AddCircleRoundedIcon />,
        label: "Add new item",
        onClick: handleAdd,
      },
      {
        key: "delete",
        icon: <TrashIcon />,
        label: "Remove item",
        onClick: handleDelete,
      },
      {
        key: "toggle",
        icon: isExpanded ? <UnfoldLessIcon /> : <UnfoldMoreIcon />,
        label: isExpanded ? "Collapse" : "Expand",
        onClick: handleToggle,
      },
    ];

    return (
      <Fade in={position !== null} timeout={150} unmountOnExit>
        <Paper
          ref={ref}
          elevation={0}
          className="subtle-shadow"
          sx={{
            position: "fixed",
            top: position?.top ?? 0,
            left: position?.left ?? 0,

            zIndex: (theme) => theme.zIndex.tooltip,

            borderRadius: 100,
            p: 1,
          }}
        >
          <Stack spacing={1}>
            {menuItems.map((item) => (
              <Tooltip key={item.key} title={item.label} placement="right">
                <IconButton
                  aria-label={item.label}
                  onClick={item.onClick}
                  sx={{
                    color: "black",
                  }}
                  disabled={item.key === "delete" && fieldsLength <= 1}
                >
                  {item.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Stack>
        </Paper>
      </Fade>
    );
  },
);

export default FloatingMenu;
