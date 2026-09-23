import Button, { type ButtonProps } from "@mui/material/Button";

export default function FormButtons({ children, sx, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      fullWidth
      variant={props.variant || "contained"}
      size="large"
      loadingPosition="start"
      sx={{ ...sx, borderRadius: 2 }}
    >
      {children}
    </Button>
  );
}
