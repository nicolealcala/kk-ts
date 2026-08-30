import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import DeleteItemButton from "./DeleteItemButton";

type BatchFormItemProps = {
  index: number;
  title: React.ReactNode;
  isOpen: boolean;
  isActive: boolean;
  hasErrors: boolean;
  showIndex: boolean;

  formRef: (element: HTMLDivElement | null) => void;

  onClick: () => void;
  onToggle: () => void;
  onRemove: () => void;

  children: React.ReactNode;
};

export default function BatchFormItem({
  index,
  title,
  isOpen,
  isActive,
  hasErrors,
  showIndex,
  formRef,
  onClick,
  onToggle,
  onRemove,
  children,
}: BatchFormItemProps) {
  return (
    <Box
      ref={formRef}
      display="flex"
      flexDirection="column"
      position="relative"
      bgcolor="white"
      borderRadius={4}
      border={hasErrors ? "1px solid red" : "none"}
      sx={{
        scrollMarginTop: "24px",
        mt: 3,
      }}
      className="subtle-shadow"
      onClick={onClick}
    >
      {showIndex && (
        <Chip
          label={index + 1}
          color="primary"
          variant={isActive ? "filled" : "outlined"}
          className="size-10! rounded-full!"
          sx={{
            display: { xs: "none", md: "flex" },
            position: "absolute",
            top: 20,
            left: -60,
          }}
        />
      )}

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={4}
        py={2}
      >
        <Typography variant="h6">{title}</Typography>

        <IconButton
          type="button"
          aria-label={isOpen ? "Collapse item" : "Expand item"}
          onClick={(event) => {
            event.stopPropagation();
            onToggle();
          }}
        >
          <KeyboardArrowDownRoundedIcon
            sx={{
              transition: "transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)",
              transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
            }}
          />
        </IconButton>
      </Stack>

      <Collapse in={isOpen} timeout={300}>
        <Box px={4} pt={1.5} pb={6}>
          {children}
        </Box>
      </Collapse>

      {showIndex && <DeleteItemButton onRemove={onRemove} />}
    </Box>
  );
}
