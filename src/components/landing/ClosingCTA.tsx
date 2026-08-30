import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

export default function ClosingCTA() {
  const { user } = useAuth();

  return (
    <section className="bg-miora-diamond py-32 lg:py-40">
      <div className="mx-auto max-w-3xl px-8 lg:px-12 text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-medium text-miora-astral leading-snug">
          Keep what matters close.
        </h2>

        <p className="mt-6 text-lg text-miora-turbulent leading-relaxed">
          Begin creating a quiet place for the people on your mind.
        </p>

        <div className="mt-10 lg:mt-12">
          <Link
            to={user ? "/people" : "/register"}
            className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-miora-astral text-miora-diamond font-medium text-[15px] transition-all hover:bg-miora-turbulent active:scale-[0.98]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
