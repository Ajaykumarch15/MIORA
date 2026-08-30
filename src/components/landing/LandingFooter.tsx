import MioraLogo from "../branding/MioraLogo";

export default function LandingFooter() {
  return (
    <footer className="bg-miora-astral border-t border-miora-turbulent/30">
      <div className="mx-auto max-w-[1280px] flex items-center justify-between h-20 px-8 lg:px-12">
        <MioraLogo variant="light" size="small" />

        <div className="flex items-center gap-6 text-xs text-miora-meditative">
          <span>A quiet place to remember.</span>
          <span>&copy; 2026</span>
        </div>
      </div>
    </footer>
  );
}
