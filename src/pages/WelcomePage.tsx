import {
  HeroSection,
  MeaningSection,
  HowItWorksSection,
  AtmosphericSection,
  ClosingCTA,
  LandingFooter,
} from "../components/landing";

export default function WelcomePage() {
  return (
    <div className="min-h-dvh">
      <HeroSection />
      <MeaningSection />
      <HowItWorksSection />
      <AtmosphericSection />
      <ClosingCTA />
      <LandingFooter />
    </div>
  );
}
