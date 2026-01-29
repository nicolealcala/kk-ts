import ApplicationsTable from "../components/applications/ApplicationsTable";
import ApplicationTableHeader from "@/components/applications/ApplicationTableHeader";
import Stack from "@mui/material/Stack";
import ApplicationsForm from "@/components/applications/ApplicationForm";
import React from "react";
import { type OpenDrawerValues } from "@/lib/types/forms";
import type { CustomApplication } from "@/components/applications/Columns";
import { useApplicationsData } from "@/utils/hooks/useApplicationsData";
import Loader from "@/components/shared/Loader";
import EmptyApplications from "@/components/applications/EmptyApplications";

export default function ApplicationsPage() {
  const [openDrawer, setOpenDrawer] = React.useState<OpenDrawerValues>(null);
  const [selectedApplication, setSelectedApplication] =
    React.useState<CustomApplication | null>(null);
  const currentLocalDate = new Date().toLocaleDateString();

  const { applications, totalCount, isLoading } =
    useApplicationsData(currentLocalDate);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Stack
      component="article"
      spacing={3.5}
      sx={{
        height: "100%",
        minHeight: 0,
        width: "100%",
      }}
    >
      {applications && applications.length > 0 ? (
        <>
          <ApplicationTableHeader
            totalCount={totalCount}
            setOpenDrawer={setOpenDrawer}
          />
          <ApplicationsTable
            data={applications}
            setSelectedApplication={setSelectedApplication}
          />
          <ApplicationsForm
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
            selectedApplication={selectedApplication}
            setSelectedApplication={setSelectedApplication}
          />
        </>
      ) : (
        <EmptyApplications />
      )}
    </Stack>
  );
}
