import ApplicationsTable from "../components/applications/ApplicationsTable";
//import EmptyApplications from "../components/applications/EmptyApplications";

export default function ApplicationsPage() {
  return (
    <article className="size-full">
      {/* <EmptyApplications /> */}
      <ApplicationsTable />
    </article>
  );
}
