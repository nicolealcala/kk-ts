import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { useDialogStore } from "@/store/dialog/dialogStore";
import useShallowStore from "@/store/useShallowStore";
import { useState } from "react";

const buttonStyles = {
  default: {
    bgcolor: "primary.dark",
    color: "primary.contrastText",
  },
  success: {
    bgcolor: "success.dark",
    color: "success.contrastText",
  },
  error: {
    bgcolor: "error.main",
    color: "error.contrastText",
    "&:hover": {
      bgcolor: "error.dark",
    },
  },
  info: {
    bgcolor: "info.dark",
    color: "info.contrastText",
  },
};

export default function GlobalDialog() {
  const { isOpen, title, message, type, headerIcon, onConfirm, closeDialog } =
    useShallowStore(useDialogStore, (state) => ({
      isOpen: state.isOpen,
      title: state.title,
      message: state.message,
      type: state.type,
      headerIcon: state.headerIcon,
      onConfirm: state.onConfirm,
      closeDialog: state.closeDialog,
    }));

  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!onConfirm) return;
    setIsLoading(true);

    try {
      await onConfirm();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      closeDialog();
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 4,
          },
        },
      }}
    >
      {headerIcon && (
        <Box p={3} pb={0}>
          {headerIcon}
        </Box>
      )}
      <DialogTitle
        id="alert-dialog-title"
        sx={{ pb: 1, fontWeight: "semiBold" }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ pt: 0, maxWidth: "400px" }}>{message}</DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        {/* Cancel Button */}
        <Button
          variant="outlined"
          onClick={closeDialog}
          disabled={isLoading}
          sx={{
            borderColor: "grey.400",
            borderRadius: 10,
            color: "initial",
            "&:hover": { bgcolor: "grey.50" },
          }}
        >
          Cancel
        </Button>

        {/* Confirm Button */}
        <Button
          variant="contained"
          loading={isLoading}
          loadingPosition="start"
          sx={{
            ...(type ? buttonStyles[type as keyof typeof buttonStyles] : ""),
            borderRadius: 10,
          }}
          onClick={handleConfirm}
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
