import { DashboardShell } from "@/components/Dashboard/DashbaordShell";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { SettingsForm } from "@/components/Dashboard/SettingsForm";

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage your organization and donation settings."
      />
      <SettingsForm />
    </DashboardShell>
  );
}
