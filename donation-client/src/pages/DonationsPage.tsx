import { DashboardShell } from "@/components/Dashboard/DashbaordShell";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { DonationsTable } from "@/components/Dashboard/DonationTable";
import { DonationsTableFilters } from "@/components/Dashboard/DonationTableFilter";

export default function DonationsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Donations"
        text="Manage and view all donation transactions."
      />
      <DonationsTableFilters />
      <DonationsTable />
    </DashboardShell>
  );
}
