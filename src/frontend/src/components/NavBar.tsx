import { useEffect, useState } from "react";

const navLinks = [
  { label: "MUSIC", href: "#music" },
  { label: "TOUR", href: "#events" },
  { label: "ABOUT", href: "#about" },
  { label: "STORE", href: "#merch" },
  { label: "CONTACT", href: "#contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[oklch(0.085_0_0/0.95)] backdrop-blur-md border-b border-[rgba(201,162,74,0.15)] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
            data-ocid="nav.link"
          >
            <div className="w-10 h-10 rounded-full border-2 border-[oklch(0.70_0.12_75)] flex items-center justify-center group-hover:shadow-gold transition-shadow">
              <span className="gold-text font-display font-bold text-sm tracking-widest">
                DG
              </span>
            </div>
            <span className="text-[oklch(0.95_0_0)] font-display font-bold text-lg tracking-[0.15em] hidden sm:block">
              DREW GREEN
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-[oklch(0.75_0_0)] hover:text-[oklch(0.70_0.12_75)] text-xs font-body font-semibold tracking-[0.2em] transition-colors duration-200"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            <span
              className={`block w-6 h-0.5 bg-[oklch(0.70_0.12_75)] transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-[oklch(0.70_0.12_75)] transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-[oklch(0.70_0.12_75)] transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden glass-card rounded-xl mb-4 p-4">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left py-3 px-2 text-[oklch(0.75_0_0)] hover:text-[oklch(0.70_0.12_75)] text-sm font-body font-semibold tracking-[0.2em] transition-colors border-b border-[rgba(201,162,74,0.1)] last:border-0"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
