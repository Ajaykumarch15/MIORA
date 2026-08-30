import { useNavigate } from "react-router-dom";
import { useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "../auth/AuthProvider";

export default function WelcomePage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [ready, setReady] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useLayoutEffect(() => {
    timerRef.current = setTimeout(() => setReady(true), 100);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleGetStarted() {
    if (user) {
      navigate("/people");
    } else {
      navigate("/register");
    }
  }

  return (
    <main className="relative min-h-dvh overflow-hidden select-none">
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3a4a5c] via-[#5a6e82] to-[#7a8fa3]" />
      <div className="absolute inset-0 bg-miora-charcoal/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-miora-charcoal/70 via-transparent to-miora-charcoal/20" />

      {/* Content */}
      <div
        className={`relative z-10 min-h-dvh flex flex-col items-center px-8 transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Top spacer */}
        <div className="flex-1 min-h-16" />

        {/* Brand block */}
        <div className="flex flex-col items-center text-center">
          {/* Leaf icon */}
          <svg
            viewBox="0 0 40 48"
            className="w-10 h-12 mb-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M20 44 C20 44 4 32 4 18 C4 8 12 2 20 2 C28 2 36 8 36 18 C36 32 20 44 20 44Z"
              className="text-miora-paper/70"
            />
            <path
              d="M20 14 L20 34"
              className="text-miora-paper/50"
            />
            <path
              d="M20 20 C16 16 10 16 8 18"
              className="text-miora-paper/50"
            />
            <path
              d="M20 26 C24 22 30 22 32 24"
              className="text-miora-paper/50"
            />
          </svg>

          <h1 className="font-display text-[40px] font-medium text-miora-paper tracking-[0.02em] leading-none">
            MIORA
          </h1>
        </div>

        {/* Middle spacer */}
        <div className="flex-[2]" />

        {/* Tagline and copy */}
        <div className="text-center mb-10 max-w-[300px]">
          <p className="font-display text-lg text-miora-paper/90 mb-4 italic">
            For the ones on your mind.
          </p>
          <p className="text-[15px] text-miora-paper/50 leading-relaxed">
            A quiet place to remember
            <br />
            the people who matter to you.
          </p>
        </div>

        {/* Bottom spacer */}
        <div className="flex-1" />

        {/* CTA block */}
        <div className="w-full max-w-[320px] pb-10">
          <button
            onClick={handleGetStarted}
            disabled={loading}
            className="w-full h-14 rounded-full bg-miora-paper text-miora-charcoal font-medium text-[15px] transition-all duration-150 hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
          >
            Get Started
          </button>
        </div>
      </div>
    </main>
  );
}
