import {
  SiFacebook,
  SiInstagram,
  SiTiktok,
  SiX,
  SiYoutube,
} from "react-icons/si";

const TELEGRAM_URL = "https://t.me/Drewgreensong";

const socials = [
  {
    label: "Instagram",
    handle: "@Drewgreensong",
    href: TELEGRAM_URL,
    icon: SiInstagram,
    color: "#E1306C",
  },
  {
    label: "TikTok",
    handle: "@Drewgreensong",
    href: TELEGRAM_URL,
    icon: SiTiktok,
    color: "#69C9D0",
  },
  {
    label: "YouTube",
    handle: "@Drewgreensong",
    href: TELEGRAM_URL,
    icon: SiYoutube,
    color: "#FF0000",
  },
  {
    label: "Twitter / X",
    handle: "@Drewgreensong",
    href: TELEGRAM_URL,
    icon: SiX,
    color: "#FFFFFF",
  },
  {
    label: "Facebook",
    handle: "@Drewgreensong",
    href: TELEGRAM_URL,
    icon: SiFacebook,
    color: "#1877F2",
  },
];

export default function SocialSection() {
  return (
    <section
      id="social"
      className="py-20 md:py-28"
      style={{ background: "oklch(0.10 0.015 55)" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in-up text-center mb-12">
          <p className="text-[oklch(0.70_0.12_75)] font-body tracking-[0.35em] text-xs font-semibold uppercase mb-3">
            Connect
          </p>
          <h2 className="section-heading text-4xl md:text-5xl gold-text mb-4">
            Follow Drew
          </h2>
          <div className="w-16 h-0.5 bg-[oklch(0.70_0.12_75)] mx-auto mb-6" />
          <p className="font-body text-[oklch(0.60_0_0)] max-w-md mx-auto">
            Stay connected for behind-the-scenes content, new music, and tour
            updates. All links go directly to Telegram.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="fade-in-up glass-card rounded-2xl p-6 flex flex-col items-center gap-4 hover:border-[oklch(0.70_0.12_75/0.4)] hover:shadow-gold transition-all duration-300 group text-center"
                data-ocid="social.link"
              >
                <Icon
                  size={32}
                  style={{ color: s.color }}
                  className="group-hover:scale-110 transition-transform"
                />
                <div>
                  <p className="font-body font-semibold text-[oklch(0.88_0_0)] text-sm">
                    {s.label}
                  </p>
                  <p className="font-body text-[oklch(0.50_0_0)] text-xs mt-0.5">
                    {s.handle}
                  </p>
                </div>
                <span
                  className="px-4 py-1.5 rounded-full font-body font-semibold text-xs tracking-widest uppercase transition-opacity group-hover:opacity-90"
                  style={{
                    background: `${s.color}20`,
                    color: s.color,
                    border: `1px solid ${s.color}40`,
                  }}
                >
                  Message
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
