import type { JobSourceData } from "@/lib/schema/applicationSchema.ts";

function RowSourceLink({ source }: { source: JobSourceData }) {
  return source.url ? (
    <a
      className="block items-center text-primary hover:underline underline-offset-2 truncate max-w-28"
      href={source.url}
      target="_blank"
    >
      <span className="capitalize">{source.platform}</span>
    </a>
  ) : (
    <span className="capitalize text-gray-500">{source.platform}</span>
  );
}

export default RowSourceLink;
