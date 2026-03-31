import { useEffect, useRef } from "react";

export default function FeatureImageSection() {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const progress = -rect.top / window.innerHeight;
      imgRef.current.style.transform = `translateY(${progress * 60}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      {/* Parallax image */}
      <div
        ref={imgRef}
        className="absolute inset-0 -top-16 -bottom-16 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/image-019d43fd-0360-71a2-a3ce-7e94d339719d.png')`,
          willChange: "transform",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.085_0_0/0.85)] via-[oklch(0.085_0_0/0.4)] to-[oklch(0.085_0_0/0.6)]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[oklch(0.085_0_0)] to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[oklch(0.085_0_0)] to-transparent" />

      {/* Text */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-16 max-w-[1200px] mx-auto">
        <div className="fade-in-up max-w-lg">
          <p className="text-[oklch(0.70_0.12_75)] font-body tracking-[0.35em] text-xs font-semibold uppercase mb-3">
            Tennessee
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-[oklch(0.95_0_0)] leading-tight mb-4">
            From the roots
            <br />
            <span className="gold-text">to the stage</span>
          </h2>
          <div className="w-16 h-0.5 bg-[oklch(0.70_0.12_75)] mb-4" />
          <p className="font-body text-[oklch(0.72_0_0)] text-base sm:text-lg leading-relaxed">
            A songwriter's journey turned into a movement.
          </p>
        </div>
      </div>
    </section>
  );
}
