import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const topDonors = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    image: "/placeholder.svg?height=40&width=40",
    amount: "$1,250.00",
    donations: 12,
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    image: "/placeholder.svg?height=40&width=40",
    amount: "$975.00",
    donations: 8,
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    image: "/placeholder.svg?height=40&width=40",
    amount: "$820.00",
    donations: 6,
  },
  {
    name: "William Kim",
    email: "william.kim@email.com",
    image: "/placeholder.svg?height=40&width=40",
    amount: "$675.00",
    donations: 5,
  },
];

export function TopDonors({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Top Donors</CardTitle>
        <CardDescription>
          Your most generous supporters this month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {topDonors.map((donor) => (
            <div
              key={donor.email}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={donor.image} />
                  <AvatarFallback>{donor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {donor.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {donor.donations} donations
                  </p>
                </div>
              </div>
              <div className="font-medium">{donor.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
