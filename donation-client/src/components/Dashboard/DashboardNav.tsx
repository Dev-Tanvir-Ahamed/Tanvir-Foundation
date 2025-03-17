import {
  BarChart3,
  Heart,
  LayoutDashboard,
  Megaphone,
  Settings,
  Users,
} from "lucide-react";
import type React from "react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    title: "Overview",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Donations",
    href: "/admin/donations",
    icon: Heart,
  },
  {
    title: "Donors",
    href: "/admin/donors",
    icon: Users,
  },
  {
    title: "Campaigns",
    href: "/admin/campaigns",
    icon: Megaphone,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function DashboardNav() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav className="grid items-start gap-2 py-8">
      {navItems.map((item) => (
        <Link key={item.href} to={item.href}>
          <Button
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              pathname === item.href && "bg-secondary"
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
