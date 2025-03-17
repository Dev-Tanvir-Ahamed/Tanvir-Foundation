import { DashboardShell } from "@/components/Dashboard/DashbaordShell";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { DonorsTable } from "@/components/Dashboard/DonorsTable";
import { DonorsTableFilters } from "@/components/Dashboard/DonorTableFilter";

export default function DonorsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Donors"
        text="Manage your donor database and relationships."
      />
      <DonorsTableFilters />
      <DonorsTable />
    </DashboardShell>
  );
}
