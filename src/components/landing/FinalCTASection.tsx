import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

export default function FinalCTASection() {
  const { user } = useAuth();

  return (
    <section className="bg-miora-astral py-32 lg:py-40">
      <div className="mx-auto max-w-3xl px-8 lg:px-12 text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-miora-diamond leading-snug">
          Keep the people who matter close.
        </h2>

        <div className="mt-10 lg:mt-12">
          <Link
            to={user ? "/people" : "/register"}
            className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-miora-diamond text-miora-astral font-medium text-[15px] transition-all hover:bg-white active:scale-[0.98]"
          >
            Start with someone
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
