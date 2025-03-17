import { CampaignsTable } from "@/components/Dashboard/CampainTable";
import { DashboardShell } from "@/components/Dashboard/DashbaordShell";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function CampaignsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Campaigns"
        text="Manage your fundraising campaigns."
      >
        <Button asChild>
          <Link to="/campaigns/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Campaign
          </Link>
        </Button>
      </DashboardHeader>
      <CampaignsTable />
    </DashboardShell>
  );
}
