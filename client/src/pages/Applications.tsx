import ApplicationsTable from "../components/applications/ApplicationsTable";
import EmptyApplications from "../components/applications/EmptyApplications";
import { mockData } from "../lib/table/applications";
//import EmptyApplications from "../components/applications/EmptyApplications";

export default function ApplicationsPage() {
  return (
    <article className="size-full">
      {mockData.length > 0 ? <ApplicationsTable /> : <EmptyApplications />}
    </article>
  );
}
