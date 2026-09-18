import { useDialogStore } from "@/store/dialog/dialogStore";
import { TrashIcon } from "@heroicons/react/24/solid";
import IconButton from "@mui/material/IconButton";

type DeleteItemButtonProps = {
  onRemove: () => void;
};
export default function DeleteItem({ onRemove }: DeleteItemButtonProps) {
  const openConfirmation = useDialogStore((state) => state.openConfirmation);
  return (
    <IconButton
      type="button"
      aria-label="Remove item"
      onClick={(event) => {
        event.stopPropagation();
        openConfirmation({
          type: "warning",
          title: "Remove this application?",
          message:
            "All data associated with this application will not be saved. This action cannot be undone.",
          icon: "warning",
          onConfirm: onRemove,
        });
      }}
      sx={{
        display: { xs: "none", md: "flex" },
        position: "absolute",
        top: 20,
        right: -60,
        bgcolor: "white",
        color: "inherit",
        width: 40,
        height: 40,
        "&:hover": {
          bgcolor: "error.extraLight",
          color: "error.main",
        },
      }}
    >
      <TrashIcon className="size-5" />
    </IconButton>
  );
}
