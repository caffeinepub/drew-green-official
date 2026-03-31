import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

const albums = [
  {
    id: 1,
    title: "Dirt Boy Vol. 1",
    year: "2023",
    image: "/assets/image-019d43fc-ee83-74fb-b3cf-9bdd5bf37594.png",
    genre: "Country / Pop",
    tracks: [
      "Dirt Boy",
      "Thousand Times",
      "Tennessee Homesick Blues",
      "Summer Isn't Summer",
      "Whiskey Sunrise",
      "Last Last Time",
    ],
    spotifyUri: "7xZTozOYTK6YKaxcQxeBdP",
  },
];

export default function DiscographySection() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<(typeof albums)[0] | null>(null);

  return (
    <section id="discography" className="py-20 md:py-28 bg-[oklch(0.085_0_0)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in-up text-center mb-12">
          <p className="text-[oklch(0.70_0.12_75)] font-body tracking-[0.35em] text-xs font-semibold uppercase mb-3">
            Studio
          </p>
          <h2 className="section-heading text-4xl md:text-5xl gold-text mb-4">
            Discography
          </h2>
          <div className="w-16 h-0.5 bg-[oklch(0.70_0.12_75)] mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <button
              type="button"
              key={album.id}
              onClick={() => {
                setSelected(album);
                setOpen(true);
              }}
              className="fade-in-up glass-card rounded-2xl overflow-hidden cursor-pointer group hover:border-[oklch(0.70_0.12_75/0.5)] hover:shadow-gold transition-all text-left w-full"
              data-ocid="discography.item.1"
            >
              <div className="relative overflow-hidden">
                <img
                  src={album.image}
                  alt={album.title}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.085_0_0/0.9)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-[oklch(0.70_0.12_75)] font-body font-semibold tracking-widest text-xs uppercase">
                    View Album
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[oklch(0.70_0.12_75)] font-body text-xs tracking-[0.2em] uppercase mb-1">
                  {album.year} · {album.genre}
                </p>
                <h3 className="font-display font-bold text-[oklch(0.92_0_0)] text-xl">
                  {album.title}
                </h3>
              </div>
            </button>
          ))}

          {/* Coming Soon placeholder */}
          <div className="fade-in-up glass-card rounded-2xl overflow-hidden flex flex-col items-center justify-center aspect-square opacity-40">
            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-[oklch(0.70_0.12_75/0.5)] flex items-center justify-center mx-auto mb-4">
                <span className="text-[oklch(0.70_0.12_75)] text-2xl">+</span>
              </div>
              <p className="font-display font-bold text-[oklch(0.55_0_0)] uppercase tracking-widest text-sm">
                Coming Soon
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Album Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-2xl rounded-2xl p-0 overflow-hidden"
          style={{
            background: "oklch(0.12 0.018 55)",
            border: "1px solid rgba(201,162,74,0.2)",
          }}
          data-ocid="discography.dialog"
        >
          {selected && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-6 flex flex-col justify-between">
                  <DialogHeader>
                    <p className="text-[oklch(0.70_0.12_75)] font-body text-xs tracking-[0.2em] uppercase">
                      {selected.year}
                    </p>
                    <DialogTitle className="font-display font-bold text-[oklch(0.92_0_0)] text-2xl">
                      {selected.title}
                    </DialogTitle>
                    <p className="text-[oklch(0.60_0_0)] font-body text-sm">
                      {selected.genre}
                    </p>
                  </DialogHeader>
                  <div>
                    <p className="font-body font-semibold text-[oklch(0.70_0.12_75)] text-xs tracking-widest uppercase mb-3">
                      Tracklist
                    </p>
                    <ol className="space-y-2">
                      {selected.tracks.map((track) => (
                        <li key={track} className="flex items-center gap-3">
                          <span className="text-[oklch(0.45_0_0)] font-body text-xs w-4">
                            {selected.tracks.indexOf(track) + 1}
                          </span>
                          <span className="font-body text-[oklch(0.80_0_0)] text-sm">
                            {track}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <a
                    href={`https://open.spotify.com/artist/${selected.spotifyUri}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg font-body font-semibold text-sm text-[oklch(0.085_0_0)] transition-opacity hover:opacity-90"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.65 0.11 72), oklch(0.75 0.13 78))",
                    }}
                    data-ocid="discography.link"
                  >
                    🎵 Listen on Spotify
                  </a>
                </div>
              </div>
              <div className="p-4 border-t border-[rgba(201,162,74,0.1)]">
                <iframe
                  src={`https://open.spotify.com/embed/artist/${selected.spotifyUri}?utm_source=generator&theme=0`}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Player"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
