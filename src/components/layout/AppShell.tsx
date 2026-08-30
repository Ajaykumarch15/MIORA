import { Outlet, useLocation } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";

const BOTTOM_NAV_HIDDEN_PATTERNS = [
  /\/new$/,
  /\/remembrance$/,
  /\/context$/,
  /\/archive$/,
  /\/deletion$/,
];

export default function AppShell() {
  const location = useLocation();

  const showBottomNav = !BOTTOM_NAV_HIDDEN_PATTERNS.some((pattern) =>
    pattern.test(location.pathname),
  );

  return (
    <div className="min-h-dvh bg-miora-paper">
      <div className="mx-auto max-w-lg min-h-dvh relative">
        <main className={showBottomNav ? "pb-20" : ""}>
          <Outlet />
        </main>
        {showBottomNav && <BottomNavigation />}
      </div>
    </div>
  );
}
