import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import MioraLogo from "../branding/MioraLogo";

export default function LandingNav() {
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-[1280px] flex items-center justify-between h-20 px-8 lg:px-12">
        <Link to="/" className="shrink-0">
          <MioraLogo variant="dark" size="medium" />
        </Link>

        <div className="flex items-center gap-8 lg:gap-10">
          <a
            href="#how-it-works"
            className="hidden sm:inline text-sm text-miora-turbulent hover:text-miora-astral transition-colors"
          >
            How it works
          </a>
          <a
            href="#about"
            className="hidden sm:inline text-sm text-miora-turbulent hover:text-miora-astral transition-colors"
          >
            About
          </a>
          {user ? (
            <Link
              to="/people"
              className="text-sm font-medium text-miora-diamond bg-miora-astral px-6 py-2.5 rounded-full hover:bg-miora-turbulent transition-colors"
            >
              People
            </Link>
          ) : (
            <Link
              to="/register"
              className="text-sm font-medium text-miora-diamond bg-miora-astral px-6 py-2.5 rounded-full hover:bg-miora-turbulent transition-colors"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
