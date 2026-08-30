import Button from "@mui/material/Button";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

type BatchFormAddButtonProps = {
  onClick: () => void;
};

export default function BatchFormAddButton({
  onClick,
}: BatchFormAddButtonProps) {
  return (
    <Button
      type="button"
      variant="contained"
      startIcon={<AddRoundedIcon />}
      onClick={onClick}
    >
      Add another
    </Button>
  );
}
