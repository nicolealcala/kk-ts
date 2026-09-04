import type { JobLocationData } from "@/lib/schema/applicationSchema";
import Typography from "@mui/material/Typography";

type JobLocationProps = { location: JobLocationData | null };
export default function JobLocation({ location }: JobLocationProps) {
  const renderedLocation = location
    ? Object.values(location)
        .filter(
          (val: string | null | undefined) =>
            val && val !== undefined && val !== null,
        )
        .join(", ")
    : "N/A";
  return (
    <Typography
      variant={renderedLocation === "N/A" ? "body2" : "body1"}
      color={renderedLocation === "N/A" ? "text.disabled" : "initial"}
      fontStyle={renderedLocation === "N/A" ? "italic" : "normal"}
    >
      {renderedLocation}
    </Typography>
  );
}
