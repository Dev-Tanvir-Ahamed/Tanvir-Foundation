import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";

const campaigns = [
  {
    name: "Clean Water Initiative",
    raised: 12500,
    goal: 20000,
    daysLeft: 15,
  },
  {
    name: "Education for All",
    raised: 8750,
    goal: 10000,
    daysLeft: 7,
  },
  {
    name: "Hunger Relief",
    raised: 5300,
    goal: 15000,
    daysLeft: 30,
  },
];

export function CampaignProgress({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Campaign Progress</CardTitle>
        <CardDescription>
          Track your active fundraising campaigns.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {campaigns.map((campaign) => {
            const percentage = Math.round(
              (campaign.raised / campaign.goal) * 100
            );

            return (
              <div key={campaign.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{campaign.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {campaign.daysLeft} days left
                  </div>
                </div>
                <Progress value={percentage} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <div>${campaign.raised.toLocaleString()} raised</div>
                  <div className="text-muted-foreground">
                    ${campaign.goal.toLocaleString()} goal
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
