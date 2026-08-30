export default function AtmosphericSection() {
  return (
    <section className="relative h-[250px] lg:h-[200px] overflow-hidden">
      <img
        src="/miora-assets/MIORA_NEW_BRAND_ASSETS/winter/frost-dandelion.png"
        alt="Frost dandelion in winter light"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-miora-astral/40" />
      <div className="relative z-10 h-full flex items-center justify-center px-8">
        <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-miora-diamond text-center leading-snug max-w-2xl tracking-tight">
          Some memories do not need to be loud
          <br className="hidden sm:block" />
          to remain important.
        </p>
      </div>
    </section>
  );
}
