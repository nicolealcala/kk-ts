import Button, { type ButtonOwnProps } from "@mui/material/Button";
import Dialog, { type DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

type ConfirmationModalProps = DialogProps & {
  title: string;
  message: string | React.ReactNode;
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
  title,
  message,
  handleConfirm,
  confirmButtonColor,
  headerIcon,
  loading,
  ...props
}: ConfirmationModalProps) {
  return (
    <Dialog
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...props}
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
      <DialogContent sx={{ pt: 0 }}>{message}</DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        {/* Cancel Button */}
        <Button
          variant="outlined"
          onClick={props.onClose as React.MouseEventHandler<HTMLButtonElement>}
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
