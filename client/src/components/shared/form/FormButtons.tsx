import Button, { type ButtonProps } from "@mui/material/Button";

export default function FormButtons({ children, ...props }: ButtonProps) {
  return (
    <Button
      fullWidth
      variant={props.variant || "contained"}
      color="primary"
      size="large"
      loadingPosition="start"
      sx={{ borderRadius: 2 }}
      {...props}
    >
      {children}
    </Button>
  );
}
