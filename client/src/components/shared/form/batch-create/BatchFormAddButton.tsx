import Button, { type ButtonProps } from "@mui/material/Button";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

export default function BatchFormAddButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      type="button"
      variant="contained"
      startIcon={<AddRoundedIcon />}
    >
      Add another
    </Button>
  );
}
