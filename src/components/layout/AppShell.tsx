import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";

export default function AppShell() {
  return (
    <div className="min-h-dvh bg-miora-diamond/50">
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
