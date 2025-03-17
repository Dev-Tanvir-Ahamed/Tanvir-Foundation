import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import { cn } from "../../lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface DonationStatsProps {
  title: string;
  value: string;
  description: string;
  trend: "up" | "down" | "neutral";
  className?: string;
}

export function DonationStats({
  title,
  value,
  description,
  trend,
  className,
}: DonationStatsProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {trend === "up" && <ArrowUp className="h-4 w-4 text-emerald-500" />}
        {trend === "down" && <ArrowDown className="h-4 w-4 text-rose-500" />}
        {trend === "neutral" && (
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={cn(
            "text-xs text-muted-foreground",
            trend === "up" && "text-emerald-500",
            trend === "down" && "text-rose-500"
          )}
        >
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
