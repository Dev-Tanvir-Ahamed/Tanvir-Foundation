import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const recentDonations = [
  {
    id: "DON-1234",
    donor: {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    amount: "$100.00",
    status: "completed",
    campaign: "Clean Water Initiative",
    date: "Apr 23, 2023",
  },
  {
    id: "DON-2345",
    donor: {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    amount: "$250.00",
    status: "completed",
    campaign: "Education for All",
    date: "Apr 22, 2023",
  },
  {
    id: "DON-3456",
    donor: {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    amount: "$50.00",
    status: "processing",
    campaign: "Clean Water Initiative",
    date: "Apr 21, 2023",
  },
  {
    id: "DON-4567",
    donor: {
      name: "William Kim",
      email: "william.kim@email.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    amount: "$75.00",
    status: "completed",
    campaign: "Hunger Relief",
    date: "Apr 20, 2023",
  },
  {
    id: "DON-5678",
    donor: {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    amount: "$500.00",
    status: "completed",
    campaign: "Medical Aid",
    date: "Apr 19, 2023",
  },
];

export function RecentDonations() {
  return (
    <Card className="col-span-7">
      <CardHeader>
        <CardTitle>Recent Donations</CardTitle>
        <CardDescription>
          You received 5 donations in the last 7 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Donor</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentDonations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={donation.donor.image}
                        alt={donation.donor.name}
                      />
                      <AvatarFallback>
                        {donation.donor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden flex-col sm:flex">
                      <span>{donation.donor.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {donation.donor.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{donation.campaign}</TableCell>
                <TableCell>{donation.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      donation.status === "completed" ? "default" : "secondary"
                    }
                  >
                    {donation.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {donation.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
