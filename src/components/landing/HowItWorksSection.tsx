const steps = [
  {
    number: "01",
    title: "Add someone",
    description: "Create a space for someone you want to keep in mind.",
  },
  {
    number: "02",
    title: "Remember",
    description: "Save thoughts, moments, feelings, and small things worth keeping.",
  },
  {
    number: "03",
    title: "Return",
    description: "Whenever you want, revisit the people and memories that matter.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-miora-diamond py-32 lg:py-40">
      <div className="mx-auto max-w-[1280px] px-8 lg:px-12">
        <h2 className="font-display text-3xl sm:text-4xl font-medium text-miora-astral text-center mb-20 lg:mb-28">
          How MIORA works
        </h2>

        <div className="relative grid lg:grid-cols-3 gap-14 lg:gap-0">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-[16.7%] right-[16.7%] h-px bg-miora-blue/30" />

          {steps.map((step) => (
            <div key={step.number} className="relative text-center lg:px-12">
              <span className="inline-block font-display text-sm font-medium text-miora-meditative tracking-widest mb-4">
                {step.number}
              </span>
              <h3 className="text-xl font-medium text-miora-astral mb-3">
                {step.title}
              </h3>
              <p className="text-miora-turbulent leading-relaxed max-w-[280px] mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
