import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import MioraLogo from "../branding/MioraLogo";

type AuthLayoutProps = {
  heading: string;
  supportingText: string;
  children: ReactNode;
};

export default function AuthLayout({
  heading,
  supportingText,
  children,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-dvh">
      {/* Left side — branding */}
      <div className="hidden lg:flex lg:w-[48%] xl:w-[50%] relative bg-miora-astral flex-col justify-between p-12 xl:p-16">
        <Link to="/" className="shrink-0">
          <MioraLogo variant="light" size="medium" />
        </Link>

        <div className="max-w-md">
          <h2 className="font-display text-3xl xl:text-4xl font-medium text-miora-diamond leading-snug tracking-tight">
            {heading}
          </h2>
          <p className="mt-5 text-[15px] text-miora-blue leading-relaxed">
            {supportingText}
          </p>
        </div>

        <p className="text-xs text-miora-meditative">
          A quiet place to remember.
        </p>
      </div>

      {/* Right side — form */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center justify-between h-16 px-6">
          <Link to="/" className="shrink-0">
            <MioraLogo variant="dark" size="small" />
          </Link>
          <Link
            to="/"
            className="text-xs text-miora-muted hover:text-miora-charcoal transition-colors"
          >
            Back to home
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12 lg:py-0">
          <div className="w-full max-w-[420px]">
            {/* Desktop heading (hidden on mobile, shown in branding side) */}
            <div className="lg:hidden mb-10">
              <h1 className="font-display text-2xl font-medium text-miora-charcoal leading-snug">
                {heading}
              </h1>
              <p className="mt-3 text-sm text-miora-muted leading-relaxed">
                {supportingText}
              </p>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
