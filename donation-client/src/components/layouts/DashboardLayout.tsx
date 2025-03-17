import { Outlet } from "react-router-dom";
import { DashboardNav } from "../Dashboard/DashboardNav";
import { MainNav } from "../Dashboard/MainNav";
import { MobileNav } from "../Dashboard/MobileNav";
import { UserNav } from "../Dashboard/UserNav";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <MobileNav />
          <UserNav />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex lg:w-[240px]">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
