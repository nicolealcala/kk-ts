import type { JobLocationData } from "@/lib/schema/applicationSchema";
import Typography from "@mui/material/Typography";

type JobLocationProps = { location: JobLocationData | null };
export default function JobLocation({ location }: JobLocationProps) {
  const { city, state, country, countryCode } = location ?? {};

  let renderedLocation = "N/A";

  if (city && state && countryCode)
    renderedLocation = `${city}, ${state}, ${countryCode}`;
  else if (country) renderedLocation = country;
  return (
    <Typography
      variant="body2"
      color={renderedLocation === "N/A" ? "text.disabled" : "inherit"}
      fontFamily="Inter"
    >
      {renderedLocation}
    </Typography>
  );
}
