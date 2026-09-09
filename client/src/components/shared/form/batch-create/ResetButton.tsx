import { useDialogStore } from "@/store/dialog/dialogStore";
import Button from "@mui/material/Button";

type ResetButtonProps = {
  label: string;
  isDirty: boolean;
  handleReset: () => void;
};
export default function ResetButton({
  label,
  isDirty,
  handleReset,
}: ResetButtonProps) {
  const openConfirmation = useDialogStore((state) => state.openConfirmation);
  return (
    <Button
      type="button"
      variant="text"
      sx={{ px: 2 }}
      onClick={() =>
        isDirty
          ? openConfirmation({
              type: "warning",
              title: `${label}?`,
              message:
                "All progress will be discarded. This action cannot be undone.",
              icon: "warning",
              onConfirm: handleReset,
            })
          : handleReset()
      }
    >
      {label}
    </Button>
  );
}
