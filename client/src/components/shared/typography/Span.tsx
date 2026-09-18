import Typography, { type TypographyProps } from "@mui/material/Typography";

export default function Span({
  children,
  fontWeight,
  color,
  variant = "body1",
}: TypographyProps) {
  return (
    <Typography
      variant={variant}
      component="span"
      color={color || "initial"}
      fontWeight={fontWeight || "medium"}
    >
      {children}
    </Typography>
  );
}
