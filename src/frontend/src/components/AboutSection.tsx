const timeline = [
  { year: "2016", label: "Began writing for other artists" },
  { year: "2020", label: "Released debut singles" },
  { year: "2022", label: "First major festival bookings" },
  { year: "2023", label: "Windy City Smokeout, Q Casino" },
  { year: "2024", label: "CMA Fest Nashville, Azura Amphitheater" },
  { year: "2025", label: "Colorado State Fair, Country Thunder AZ" },
  { year: "2026", label: "International tour dates" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 md:py-28"
      style={{ background: "oklch(0.10 0.015 55)" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in-up text-center mb-12">
          <p className="text-[oklch(0.70_0.12_75)] font-body tracking-[0.35em] text-xs font-semibold uppercase mb-3">
            Story
          </p>
          <h2 className="section-heading text-4xl md:text-5xl gold-text mb-4">
            About Drew
          </h2>
          <div className="w-16 h-0.5 bg-[oklch(0.70_0.12_75)] mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Portrait */}
          <div className="fade-in-up">
            <div className="relative rounded-2xl overflow-hidden gold-border shadow-gold">
              <img
                src="/assets/image-019d43fd-0360-71a2-a3ce-7e94d339719d.png"
                alt="Drew Green at festival"
                className="w-full object-cover"
                style={{ maxHeight: "520px", objectPosition: "center top" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.085_0_0/0.6)] to-transparent" />
            </div>
          </div>

          {/* Bio + Timeline */}
          <div className="fade-in-up space-y-8">
            <div className="space-y-4">
              <p className="font-body text-[oklch(0.78_0_0)] text-lg leading-relaxed">
                Drew Green is a rising country/pop crossover artist from
                Tennessee. Starting as a songwriter, he earned cuts with major
                artists before stepping into the spotlight himself.
              </p>
              <p className="font-body text-[oklch(0.65_0_0)] leading-relaxed">
                Known for blending heartfelt storytelling with modern
                production, Drew's authentic voice resonates with fans across
                generations. He's performed at CMA Fest, country festivals
                across the United States, and is now taking his music to
                international stages.
              </p>
              <p className="font-body text-[oklch(0.65_0_0)] leading-relaxed">
                His sound sits at the crossroads of classic country soul and
                contemporary pop sensibility — raw, real, and impossible to
                ignore.
              </p>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="font-display font-bold text-[oklch(0.70_0.12_75)] tracking-widest uppercase text-sm mb-6">
                Career Timeline
              </h3>
              <div className="relative">
                <div className="absolute left-[3.25rem] top-0 bottom-0 w-px bg-[oklch(0.70_0.12_75/0.25)]" />
                <div className="space-y-4">
                  {timeline.map((item) => (
                    <div
                      key={item.year}
                      className="flex items-center gap-4 group"
                    >
                      <span className="font-display font-bold text-[oklch(0.70_0.12_75)] text-sm w-12 flex-shrink-0 text-right">
                        {item.year}
                      </span>
                      <div className="relative flex-shrink-0">
                        <div className="w-3 h-3 rounded-full bg-[oklch(0.70_0.12_75)] group-hover:scale-150 transition-transform shadow-gold-sm" />
                      </div>
                      <p className="font-body text-[oklch(0.72_0_0)] group-hover:text-[oklch(0.88_0_0)] transition-colors text-sm">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
