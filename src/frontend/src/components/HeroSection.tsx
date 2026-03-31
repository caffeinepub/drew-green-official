export default function HeroSection() {
  const scrollToMusic = () => {
    const el = document.querySelector("#music");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/image-019d43fd-0047-73e8-bff3-8878d9ec4840.png')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.085_0_0)] via-[oklch(0.085_0_0/0.6)] to-[oklch(0.085_0_0/0.3)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.085_0_0/0.5)] via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[oklch(0.085_0_0)] to-transparent" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <p
          className="text-[oklch(0.70_0.12_75)] font-body tracking-[0.4em] text-xs sm:text-sm font-semibold mb-4 uppercase"
          style={{ animation: "fadeIn 1s ease forwards" }}
        >
          Official Artist
        </p>
        <h1
          className="font-display font-extrabold leading-none mb-6 gold-text"
          style={{
            fontSize: "clamp(3.5rem, 12vw, 9rem)",
            letterSpacing: "0.05em",
            animation: "fadeInUp 1s ease 0.2s both",
          }}
        >
          DREW GREEN
        </h1>
        <p
          className="text-[oklch(0.82_0_0)] font-body font-light tracking-[0.12em] text-base sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto"
          style={{ animation: "fadeInUp 1s ease 0.4s both" }}
        >
          Modern Country. Real Stories. Timeless Sound.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{ animation: "fadeInUp 1s ease 0.6s both" }}
        >
          <button
            type="button"
            onClick={scrollToMusic}
            className="px-8 py-4 font-body font-semibold tracking-[0.15em] text-sm uppercase transition-all duration-300 rounded-sm hover:shadow-gold hover:scale-105 active:scale-95"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.11 72), oklch(0.75 0.13 78))",
              color: "oklch(0.085 0 0)",
            }}
            data-ocid="hero.primary_button"
          >
            ▶ Listen Now
          </button>
          <button
            type="button"
            onClick={scrollToContact}
            className="px-8 py-4 font-body font-semibold tracking-[0.15em] text-sm uppercase border-2 border-[oklch(0.70_0.12_75)] text-[oklch(0.70_0.12_75)] hover:bg-[oklch(0.70_0.12_75/0.1)] transition-all duration-300 rounded-sm hover:shadow-gold hover:scale-105 active:scale-95"
            data-ocid="hero.secondary_button"
          >
            🎤 Book / Contact
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-8 bg-gradient-to-b from-[oklch(0.70_0.12_75)] to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.70_0.12_75)]" />
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}
