import { CampaignProgress } from "@/components/Dashboard/CampainProcess";
import { DashboardShell } from "@/components/Dashboard/DashbaordShell";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { DonationStats } from "@/components/Dashboard/DonationStats";
import { RecentDonations } from "@/components/Dashboard/RecentDonations";
import { TopDonors } from "@/components/Dashboard/TopDonor";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Overview of your donation campaigns and statistics."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DonationStats
          title="Total Donations"
          value="$24,231"
          description="+20.1% from last month"
          trend="up"
        />
        <DonationStats
          title="Active Donors"
          value="573"
          description="+12 new donors this week"
          trend="up"
        />
        <DonationStats
          title="Campaigns"
          value="12"
          description="3 ending this month"
          trend="neutral"
        />
        <DonationStats
          title="Avg. Donation"
          value="$42.30"
          description="-5.2% from last month"
          trend="down"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <CampaignProgress className="col-span-4" />
        <TopDonors className="col-span-3" />
      </div>
      <RecentDonations />
    </DashboardShell>
  );
}
