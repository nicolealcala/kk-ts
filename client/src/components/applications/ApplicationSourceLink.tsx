import type { JobSource } from "@/lib/types/applications";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

function ApplicationSourceLink({ source }: { source: JobSource }) {
  return (
    <a
      className="inline-flex items-center text-primary hover:underline underline-offset-2"
      href={source.link}
      target="_blank"
    >
      {source.platform}&nbsp;
      <OpenInNewRoundedIcon fontSize="inherit" className="mb-0.5" />
    </a>
  );
}

export default ApplicationSourceLink;
