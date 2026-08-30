export default function MeaningSection() {
  return (
    <section id="about" className="bg-white py-32 lg:py-44">
      <div className="mx-auto max-w-3xl px-8 lg:px-12 text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] text-miora-astral leading-snug tracking-tight">
          Some people stay with us.
        </h2>

        <div className="mt-14 lg:mt-16 space-y-1">
          <p className="text-lg lg:text-xl text-miora-turbulent leading-relaxed">
            Not every important thought needs to disappear into a conversation,
          </p>
          <p className="text-lg lg:text-xl text-miora-turbulent leading-relaxed">
            a photo album, or a forgotten note.
          </p>
        </div>

        <p className="mt-14 lg:mt-16 text-lg lg:text-xl text-miora-astral font-medium leading-relaxed">
          MIORA gives those memories a place to stay.
        </p>
      </div>
    </section>
  );
}
