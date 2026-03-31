const videos = [
  {
    id: "v1",
    title: "Drew Green — Official Music Video",
    embedId: "videoseries?list=UUW6MpJD8-esPsZRM8TJLGbg",
    label: "Latest Videos",
  },
  {
    id: "v2",
    title: "Drew Green Live Performance",
    embedId: "videoseries?list=PLW6MpJD8-esPsZRM8TJLGbg",
    label: "Live Shows",
  },
];

export default function VideosSection() {
  return (
    <section
      id="videos"
      className="py-20 md:py-28"
      style={{ background: "oklch(0.10 0.015 55)" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in-up text-center mb-12">
          <p className="text-[oklch(0.70_0.12_75)] font-body tracking-[0.35em] text-xs font-semibold uppercase mb-3">
            Watch
          </p>
          <h2 className="section-heading text-4xl md:text-5xl gold-text mb-4">
            Videos
          </h2>
          <div className="w-16 h-0.5 bg-[oklch(0.70_0.12_75)] mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="fade-in-up glass-card rounded-2xl overflow-hidden group hover:shadow-gold transition-all duration-300"
              data-ocid="videos.item.1"
            >
              <div className="relative" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.embedId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-[oklch(0.70_0.12_75)] font-body text-xs tracking-[0.15em] uppercase">
                    {video.label}
                  </p>
                  <p className="font-body text-[oklch(0.85_0_0)] font-medium">
                    {video.title}
                  </p>
                </div>
                <a
                  href="https://www.youtube.com/c/DrewGreen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[oklch(0.70_0.12_75)] hover:text-[oklch(0.85_0.13_78)] font-body text-xs tracking-widest uppercase transition-colors"
                  data-ocid="videos.link"
                >
                  More ›
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="fade-in-up text-center mt-8">
          <a
            href="https://www.youtube.com/c/DrewGreen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border border-[oklch(0.70_0.12_75/0.5)] text-[oklch(0.70_0.12_75)] hover:bg-[oklch(0.70_0.12_75/0.1)] font-body font-semibold text-sm tracking-[0.15em] uppercase rounded-lg transition-all duration-300 hover:shadow-gold"
            data-ocid="videos.button"
          >
            ▶ View All Videos on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
