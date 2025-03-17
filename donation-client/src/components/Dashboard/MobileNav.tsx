import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center"
            onClick={() => setOpen(false)}
          >
            <Heart className="mr-2 h-6 w-6 text-primary" />
            <span className="font-bold">DonateHub</span>
          </Link>
          <Button
            variant="ghost"
            className="ml-auto h-8 w-8 p-0"
            onClick={() => setOpen(false)}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            <Link
              to="/dashboard"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/dashboard"
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
              onClick={() => setOpen(false)}
            >
              Overview
            </Link>
            <Link
              to="/donations"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname?.startsWith("/donations")
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
              onClick={() => setOpen(false)}
            >
              Donations
            </Link>
            <Link
              to="/donors"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname?.startsWith("/donors")
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
              onClick={() => setOpen(false)}
            >
              Donors
            </Link>
            <Link
              to="/campaigns"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname?.startsWith("/campaigns")
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
              onClick={() => setOpen(false)}
            >
              Campaigns
            </Link>
            <Link
              to="/settings"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname?.startsWith("/settings")
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
              onClick={() => setOpen(false)}
            >
              Settings
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
