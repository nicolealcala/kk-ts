import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import UnfoldLessRoundedIcon from "@mui/icons-material/UnfoldLessRounded";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { TrashIcon } from "@heroicons/react/24/solid";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import { forwardRef, type ReactNode } from "react";
import Box from "@mui/material/Box";

type FloatingMenuProps = {
  position: {
    top: number;
    left: number;
  } | null;
  fieldsLength: number;
  isExpanded: boolean;
  hasErrors: boolean;

  handleAdd: () => void;
  handleDelete: () => void;
  handleToggle: () => void;
  handleDuplicate: () => void;
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
      handleDuplicate,
      isExpanded,
      fieldsLength,
      hasErrors,
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
        key: "duplicate",
        icon: <ContentCopyRoundedIcon />,
        label: "Duplicate",
        onClick: handleDuplicate,
      },
      {
        key: "toggle",
        icon: isExpanded ? (
          <UnfoldLessRoundedIcon />
        ) : (
          <UnfoldMoreRoundedIcon />
        ),
        label: isExpanded ? "Collapse" : "Expand",
        onClick: handleToggle,
      },
      {
        key: "delete",
        icon: <TrashIcon />,
        label: "Remove item",
        onClick: handleDelete,
      },
    ];

    return (
      <Fade in={position !== null} timeout={500}>
        <Box>
          <Box
            ref={ref}
            sx={{
              bgcolor: "white",
              position: "fixed",
              top: position?.top,
              left: position?.left,
              zIndex: 30,
              borderRadius: 5,
              border: "1px solid",
              borderColor: "action.hover",
              p: 1,
              transition: "top 0.2s ease, left 0.2s ease",
            }}
            className="subtle-shadow"
          >
            <Stack spacing={1}>
              {menuItems.map((item) => {
                let isDisabled = false;

                if (
                  ["delete", "toggle"].includes(item.key) &&
                  fieldsLength <= 1
                )
                  isDisabled = true;

                if (hasErrors) isDisabled = true;

                return (
                  <Tooltip key={item.key} title={item.label} placement="right">
                    <IconButton
                      aria-label={item.label}
                      onClick={item.onClick}
                      sx={{
                        color: "black",
                      }}
                      disabled={isDisabled}
                    >
                      {item.icon}
                    </IconButton>
                  </Tooltip>
                );
              })}
            </Stack>
          </Box>
        </Box>
      </Fade>
    );
  },
);

export default FloatingMenu;
