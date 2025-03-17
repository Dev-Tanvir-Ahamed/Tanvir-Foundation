import { Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "../../lib/utils";

export function MainNav() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="mx-4 hidden md:flex ">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <Heart className="h-6 w-6 text-primary" />
        <span className="hidden font-bold sm:inline-block">
          Tanvir Foundation
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          to="/admin/dashboard"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/admin/dashboard"
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Overview
        </Link>
        <Link
          to="/admin/analytics"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/admin/analytics")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Analytics
        </Link>
        <Link
          to="/admin/reports"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/admin/reports")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Reports
        </Link>
      </nav>
    </div>
  );
}
