import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import MioraLogo from "../branding/MioraLogo";

export default function HeroSection() {
  const { user } = useAuth();

  return (
    <section className="relative min-h-dvh flex flex-col overflow-hidden">
      {/* Background image */}
      <img
        src="/miora-assets/hero/Frosted Dandelion in Winter Blue.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Subtle left-to-right gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-miora-astral/50 via-miora-astral/20 to-transparent" />

      {/* Navbar integrated into hero */}
      <nav className="relative z-10">
        <div className="mx-auto max-w-[1280px] flex items-center justify-between h-20 px-8 lg:px-12">
          <Link to="/" className="shrink-0">
            <MioraLogo variant="light" size="medium" />
          </Link>

          <div className="flex items-center gap-8 lg:gap-10">
            <a
              href="#how-it-works"
              className="hidden sm:inline text-sm text-miora-diamond/80 hover:text-miora-diamond transition-colors"
            >
              How it works
            </a>
            <a
              href="#about"
              className="hidden sm:inline text-sm text-miora-diamond/80 hover:text-miora-diamond transition-colors"
            >
              About
            </a>
            {user ? (
              <Link
                to="/people"
                className="text-sm font-medium text-miora-astral bg-miora-diamond px-6 py-2.5 rounded-full hover:bg-white transition-colors"
              >
                People
              </Link>
            ) : (
              <Link
                to="/register"
                className="text-sm font-medium text-miora-astral bg-miora-diamond px-6 py-2.5 rounded-full hover:bg-white transition-colors"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto max-w-[1280px] w-full px-8 lg:px-12">
          <div className="max-w-xl">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-miora-diamond/70 mb-6">
              A quiet place to remember
            </p>

            <h1 className="font-display text-[40px] sm:text-[52px] lg:text-[64px] font-medium text-miora-diamond leading-[1.08] tracking-tight">
              For the people
              <br />
              you carry
              <br />
              with you.
            </h1>

            <p className="mt-7 lg:mt-8 text-lg text-miora-diamond/80 leading-relaxed max-w-md">
              MIORA is a quiet space for remembering the people, moments, and thoughts that continue to matter.
            </p>

            <div className="mt-10 lg:mt-12 flex flex-col items-start gap-4">
              <Link
                to={user ? "/people" : "/register"}
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-miora-diamond text-miora-astral font-medium text-[15px] transition-all hover:bg-white active:scale-[0.98]"
              >
                Get Started
              </Link>
              <span className="text-sm text-miora-diamond/60">
                Keep what matters close.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
