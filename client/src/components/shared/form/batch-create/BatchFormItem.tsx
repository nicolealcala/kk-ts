import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
type BatchFormItemProps = {
  title: React.ReactNode;
  isOpen: boolean;
  hasErrors: boolean;

  formRef: (element: HTMLDivElement | null) => void;

  onClick: () => void;

  children: React.ReactNode;
};

export default function BatchFormItem({
  title,
  isOpen,
  hasErrors,
  formRef,
  onClick,
  children,
}: BatchFormItemProps) {
  return (
    <Box
      ref={formRef}
      display="flex"
      flexDirection="column"
      position="relative"
      bgcolor="white"
      borderRadius={5}
      border={hasErrors ? "1px solid red" : "none"}
      sx={{
        scrollMarginTop: "24px",
        borderTop: "4px solid",
        borderColor: hasErrors ? "error.main" : "primary.main",
        cursor: isOpen ? "auto" : "pointer",
      }}
      className="subtle-shadow"
      onClick={onClick}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={4}
        py={2}
        pt={isOpen ? 3 : 2}
        sx={{ transition: "padding 0.3s ease-in-out" }}
      >
        <Typography variant="h6">{title}</Typography>

        {!isOpen && (
          <KeyboardArrowDownRoundedIcon
            aria-label={isOpen ? "Collapse item" : "Expand item"}
            sx={{
              color: "text.secondary",
              transition: "transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)",
              transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
            }}
          />
        )}
      </Stack>

      <Collapse in={isOpen} timeout={300}>
        <Box px={4} pt={1.5} pb={6}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
}
