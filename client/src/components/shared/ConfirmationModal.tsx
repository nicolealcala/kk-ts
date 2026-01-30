import Button, { type ButtonOwnProps } from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

type ConfirmationModalProps = {
  open: boolean;
  title: string;
  message: string | React.ReactNode;
  handleClose: () => void;
  handleConfirm: () => void;
  confirmButtonColor: ButtonOwnProps["color"];
  headerIcon?: React.ReactNode;
  loading?: boolean;
};

const buttonStyles = {
  primary: {
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

export default function ConfirmationModal({
  open,
  title,
  message,
  handleClose,
  handleConfirm,
  confirmButtonColor,
  headerIcon,
  loading,
}: ConfirmationModalProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
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
      <DialogContent sx={{ pt: 0 }}>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        {/* Cancel Button */}
        <Button
          variant="outlined"
          onClick={handleClose}
          disabled={loading}
          sx={{
            borderColor: "grey.400",
            color: "initial",
            "&:hover": { bgcolor: "grey.50" },
          }}
        >
          Cancel
        </Button>

        {/* Confirm Button */}
        <Button
          variant="contained"
          loading={loading}
          loadingPosition="start"
          sx={{
            ...(confirmButtonColor
              ? buttonStyles[confirmButtonColor as keyof typeof buttonStyles]
              : ""),
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
