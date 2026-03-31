import {
  SiFacebook,
  SiInstagram,
  SiTiktok,
  SiX,
  SiYoutube,
} from "react-icons/si";

const TELEGRAM_URL = "https://t.me/Drewgreensong";

const navLinks = [
  { label: "Music", href: "#music" },
  { label: "Tour", href: "#events" },
  { label: "About", href: "#about" },
  { label: "Discography", href: "#discography" },
  { label: "Videos", href: "#videos" },
  { label: "Merch", href: "#merch" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: SiInstagram, href: TELEGRAM_URL, label: "Instagram" },
  { icon: SiTiktok, href: TELEGRAM_URL, label: "TikTok" },
  { icon: SiYoutube, href: TELEGRAM_URL, label: "YouTube" },
  { icon: SiX, href: TELEGRAM_URL, label: "Twitter" },
  { icon: SiFacebook, href: TELEGRAM_URL, label: "Facebook" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="border-t border-[rgba(201,162,74,0.1)] pt-12 pb-8"
      style={{ background: "oklch(0.085 0 0)" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-10">
          <div className="text-center md:text-left">
            <div className="w-14 h-14 rounded-full border-2 border-[oklch(0.70_0.12_75)] flex items-center justify-center mx-auto md:mx-0 mb-3">
              <span className="gold-text font-display font-bold text-base tracking-widest">
                DG
              </span>
            </div>
            <p className="font-display font-bold text-[oklch(0.88_0_0)] text-xl tracking-[0.15em] uppercase">
              Drew Green
            </p>
            <p className="font-body text-[oklch(0.45_0_0)] text-sm mt-1">
              Modern Country. Real Stories. Timeless Sound.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="font-body text-[oklch(0.55_0_0)] hover:text-[oklch(0.70_0.12_75)] text-sm transition-colors"
                data-ocid="footer.link"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-[oklch(0.45_0_0)] hover:text-[oklch(0.70_0.12_75)] transition-colors"
                  data-ocid="footer.link"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="h-px bg-[oklch(0.70_0.12_75/0.1)] mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[oklch(0.38_0_0)] text-xs font-body">
          <p>© {year} Drew Green. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[oklch(0.70_0.12_75)] transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
