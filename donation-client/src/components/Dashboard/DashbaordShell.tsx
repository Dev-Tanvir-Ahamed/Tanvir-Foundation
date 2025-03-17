import type React from "react";
interface DashboardShellProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardShell({ children, className }: DashboardShellProps) {
  return <div className="flex flex-1 flex-col space-y-6 p-8">{children}</div>;
}
