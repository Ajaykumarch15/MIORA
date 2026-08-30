import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import MioraLogo from "../branding/MioraLogo";
import { useState, useRef, useEffect } from "react";

const navItems = [
  { to: "/people", label: "People" },
  { to: "/timeline", label: "Memories" },
] as const;

export default function AppHeader() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const initials = user
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-miora-diamond/80 backdrop-blur-xl border-b border-miora-blue/30">
      <div className="mx-auto max-w-[1280px] flex items-center justify-between h-16 px-8 lg:px-12">
        <Link to="/people" className="shrink-0">
          <MioraLogo variant="dark" size="small" />
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-4 py-2 text-sm rounded-full transition-colors ${
                  isActive
                    ? "text-miora-astral font-medium"
                    : "text-miora-turbulent hover:text-miora-astral"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 rounded-full bg-miora-blue/40 text-miora-astral flex items-center justify-center text-xs font-medium hover:bg-miora-blue/60 transition-colors"
          >
            {initials}
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-white rounded-xl shadow-lg shadow-miora-astral/8 border border-miora-line/50">
              <div className="px-4 py-2 border-b border-miora-line/40">
                <p className="text-sm font-medium text-miora-charcoal truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-miora-muted truncate mt-0.5">
                  {user?.email}
                </p>
              </div>
              <Link
                to="/settings"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 text-sm text-miora-charcoal hover:bg-miora-frost/60 transition-colors"
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-miora-charcoal hover:bg-miora-frost/60 transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
