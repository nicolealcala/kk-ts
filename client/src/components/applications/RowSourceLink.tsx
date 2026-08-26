import type { JobSourceData } from "@/lib/schema/application.validation.ts";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

function RowSourceLink({ source }: { source: JobSourceData }) {
  return source.url ? (
    <a
      className="inline-flex items-center text-primary hover:underline underline-offset-2"
      href={source.url}
      target="_blank"
    >
      <span className="capitalize">{source.platform}</span>&nbsp;
      <OpenInNewRoundedIcon fontSize="inherit" className="mb-0.5" />
    </a>
  ) : (
    <span className="capitalize text-gray-500">{source.platform}</span>
  );
}

export default RowSourceLink;
