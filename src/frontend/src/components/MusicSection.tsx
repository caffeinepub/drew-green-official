export default function MusicSection() {
  const listenLinks = [
    {
      label: "Spotify",
      href: "https://open.spotify.com/artist/7xZTozOYTK6YKaxcQxeBdP",
      color: "#1DB954",
      icon: "🎵",
    },
    {
      label: "Apple Music",
      href: "https://music.apple.com/us/artist/drew-green",
      color: "#FC3C44",
      icon: "🍎",
    },
    {
      label: "YouTube Music",
      href: "https://music.youtube.com/channel/UCW6MpJD8-esPsZRM8TJLGbg",
      color: "#FF0000",
      icon: "▶",
    },
    {
      label: "Amazon Music",
      href: "https://music.amazon.com/artists/drew-green",
      color: "#00A8E0",
      icon: "🎧",
    },
  ];

  return (
    <section id="music" className="py-20 md:py-28 bg-[oklch(0.085_0_0)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in-up text-center mb-12">
          <p className="text-[oklch(0.70_0.12_75)] font-body tracking-[0.35em] text-xs font-semibold uppercase mb-3">
            Stream
          </p>
          <h2 className="section-heading text-4xl md:text-5xl gold-text mb-4">
            Music
          </h2>
          <div className="w-16 h-0.5 bg-[oklch(0.70_0.12_75)] mx-auto" />
        </div>

        {/* Spotify Embed */}
        <div className="fade-in-up mb-10 glass-card rounded-2xl overflow-hidden">
          <iframe
            src="https://open.spotify.com/embed/artist/7xZTozOYTK6YKaxcQxeBdP?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Drew Green on Spotify"
          />
        </div>

        {/* YouTube Embed */}
        <div className="fade-in-up mb-12 glass-card rounded-2xl overflow-hidden">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/videoseries?list=UUW6MpJD8-esPsZRM8TJLGbg"
              title="Drew Green YouTube"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        {/* Listen Everywhere */}
        <div className="fade-in-up">
          <p className="text-center text-[oklch(0.65_0_0)] font-body tracking-[0.25em] text-xs font-semibold uppercase mb-6">
            Listen Everywhere
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {listenLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-xl p-4 flex items-center gap-3 hover:border-[oklch(0.70_0.12_75/0.4)] hover:shadow-gold transition-all duration-300 group"
                data-ocid="music.link"
              >
                <span className="text-2xl">{link.icon}</span>
                <div>
                  <p className="text-[oklch(0.92_0_0)] font-body font-semibold text-sm group-hover:text-[oklch(0.70_0.12_75)] transition-colors">
                    {link.label}
                  </p>
                  <p className="text-[oklch(0.55_0_0)] text-xs font-body">
                    Stream Now
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
