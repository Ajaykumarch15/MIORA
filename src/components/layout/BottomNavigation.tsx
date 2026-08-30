import { NavLink } from "react-router-dom";
import { Heart, Settings } from "lucide-react";

const navItems = [
  { to: "/people", label: "People", icon: Heart },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export default function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-miora-paper/80 backdrop-blur-xl border-t border-miora-line">
      <div className="mx-auto flex items-center justify-around max-w-lg h-16">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 sm:px-6 py-2 transition-colors ${
                isActive
                  ? "text-miora-charcoal"
                  : "text-miora-muted"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.2 : 1.6}
                  className={isActive ? "text-miora-charcoal" : ""}
                />
                <span
                  className={`text-xs ${
                    isActive ? "font-semibold" : "font-normal"
                  }`}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
