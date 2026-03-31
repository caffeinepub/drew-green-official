import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

const upcomingShows = [
  {
    date: "Apr 18, 2026",
    venue: "Stage Red",
    location: "Fontana, CA",
    flag: "🇺🇸",
  },
  {
    date: "Apr 25, 2026",
    venue: "Cannady Lane",
    location: "Cabool, MO",
    flag: "🇺🇸",
  },
  {
    date: "May 24, 2026",
    venue: "Drifters Music Festival",
    location: "Reno, NV",
    flag: "🇺🇸",
  },
  {
    date: "Jun 19, 2026",
    venue: "Barefoot Country Music Fest",
    location: "Wildwood, NJ",
    flag: "🇺🇸",
  },
  {
    date: "Jun 25, 2026",
    venue: "Country Drive Music Festival",
    location: "Ashland, NE",
    flag: "🇺🇸",
  },
  {
    date: "Aug 16, 2026",
    venue: "Country Calling Festival",
    location: "Chelmsford, UK",
    flag: "🇬🇧",
  },
];

const pastShows = [
  {
    date: "Aug 30, 2025",
    venue: "Colorado State Fair",
    location: "Pueblo, CO",
  },
  {
    date: "Aug 8, 2025",
    venue: "Crossroads 41 Festival",
    location: "Oshkosh, WI",
  },
  {
    date: "Apr 10, 2025",
    venue: "Country Thunder Arizona",
    location: "Florence, AZ",
  },
  {
    date: "Aug 31, 2024",
    venue: "Bluestem Amphitheater",
    location: "Moorhead, MN",
  },
  {
    date: "Aug 11, 2024",
    venue: "Voice of America MetroPark",
    location: "West Chester, OH",
  },
  {
    date: "Jun 27, 2024",
    venue: "Azura Amphitheater",
    location: "Bonner Springs, KS",
  },
  { date: "Jun 6, 2024", venue: "CMA Fest", location: "Nashville, TN" },
  {
    date: "Jul 14, 2023",
    venue: "Windy City Smokeout",
    location: "Chicago, IL",
  },
  { date: "Jul 13, 2023", venue: "Q Casino", location: "Dubuque, IA" },
];

export default function EventsSection() {
  const { actor } = useActor();
  const [requestOpen, setRequestOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    state: "",
    country: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setLoading(true);
    try {
      await actor.submitShowRequest(
        form.name,
        form.email,
        form.city,
        form.state,
        form.country,
        form.message,
      );
      toast.success("Show request submitted! We'll be in touch.");
      setRequestOpen(false);
      setForm({
        name: "",
        email: "",
        city: "",
        state: "",
        country: "",
        message: "",
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="events" className="py-20 md:py-28 bg-[oklch(0.085_0_0)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in-up text-center mb-12">
          <p className="text-[oklch(0.70_0.12_75)] font-body tracking-[0.35em] text-xs font-semibold uppercase mb-3">
            Live
          </p>
          <h2 className="section-heading text-4xl md:text-5xl gold-text mb-4">
            Tour &amp; Events
          </h2>
          <div className="w-16 h-0.5 bg-[oklch(0.70_0.12_75)] mx-auto" />
        </div>

        <Tabs defaultValue="upcoming" className="fade-in-up">
          <TabsList
            className="w-full max-w-xs mx-auto mb-8 p-1 rounded-full"
            style={{ background: "oklch(0.14 0.018 55)" }}
          >
            <TabsTrigger
              value="upcoming"
              className="flex-1 rounded-full font-body font-semibold tracking-widest text-xs uppercase data-[state=active]:text-[oklch(0.085_0_0)] data-[state=active]:bg-[oklch(0.70_0.12_75)] transition-all"
              data-ocid="events.tab"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="flex-1 rounded-full font-body font-semibold tracking-widest text-xs uppercase data-[state=active]:text-[oklch(0.085_0_0)] data-[state=active]:bg-[oklch(0.70_0.12_75)] transition-all"
              data-ocid="events.tab"
            >
              Past Shows
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="space-y-3">
              {upcomingShows.map((show, i) => (
                <div
                  key={show.venue}
                  className="glass-card rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[oklch(0.70_0.12_75/0.4)] hover:shadow-gold-sm transition-all duration-300 group"
                  data-ocid={`events.item.${i + 1}`}
                >
                  <div className="flex items-center gap-5">
                    <div className="text-center min-w-[60px]">
                      <p className="text-[oklch(0.70_0.12_75)] font-display font-bold text-xl leading-none">
                        {show.date.split(",")[0].split(" ")[1]}
                      </p>
                      <p className="text-[oklch(0.55_0_0)] font-body text-xs tracking-wider">
                        {show.date.split(" ")[0]}
                      </p>
                    </div>
                    <div className="w-px h-10 bg-[oklch(0.70_0.12_75/0.25)]" />
                    <div>
                      <p className="font-body font-semibold text-[oklch(0.92_0_0)] group-hover:text-[oklch(0.70_0.12_75)] transition-colors">
                        {show.venue}
                      </p>
                      <p className="font-body text-[oklch(0.55_0_0)] text-sm">
                        {show.flag} {show.location}
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://www.drewgreen.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 font-body font-semibold text-xs tracking-[0.15em] uppercase rounded-lg border border-[oklch(0.70_0.12_75/0.6)] text-[oklch(0.70_0.12_75)] hover:bg-[oklch(0.70_0.12_75/0.15)] transition-all shrink-0"
                    data-ocid="events.button"
                  >
                    Get Tickets
                  </a>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {pastShows.map((show, i) => (
                <div
                  key={show.venue}
                  className="glass-card rounded-xl p-4 opacity-70"
                  data-ocid={`events.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-body text-[oklch(0.55_0_0)] text-xs">
                      {show.date}
                    </p>
                    <span className="text-[oklch(0.45_0_0)] font-body text-xs tracking-wider uppercase border border-[oklch(0.40_0_0/0.3)] px-2 py-0.5 rounded-full">
                      Completed
                    </span>
                  </div>
                  <p className="font-body font-semibold text-[oklch(0.75_0_0)]">
                    {show.venue}
                  </p>
                  <p className="font-body text-[oklch(0.50_0_0)] text-sm">
                    {show.location}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="fade-in-up text-center mt-12">
          <div className="glass-card rounded-2xl p-8 max-w-lg mx-auto">
            <p className="text-[oklch(0.70_0.12_75)] text-2xl mb-3">📍</p>
            <h3 className="font-display font-bold text-[oklch(0.92_0_0)] text-xl mb-2">
              Request a Show in Your City
            </h3>
            <p className="font-body text-[oklch(0.60_0_0)] text-sm mb-5">
              Let us know where you want Drew to perform next!
            </p>
            <button
              type="button"
              onClick={() => setRequestOpen(true)}
              className="px-8 py-3 font-body font-semibold tracking-[0.15em] text-sm uppercase rounded-lg transition-all duration-300 hover:shadow-gold"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.11 72), oklch(0.75 0.13 78))",
                color: "oklch(0.085 0 0)",
              }}
              data-ocid="events.open_modal_button"
            >
              Request a Show
            </button>
          </div>
        </div>
      </div>

      <Dialog open={requestOpen} onOpenChange={setRequestOpen}>
        <DialogContent
          className="max-w-md rounded-2xl"
          style={{
            background: "oklch(0.12 0.018 55)",
            border: "1px solid rgba(201,162,74,0.2)",
          }}
          data-ocid="events.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-[oklch(0.92_0_0)] text-2xl">
              Request a Show
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="req-name"
                  className="font-body text-[oklch(0.60_0_0)] text-xs tracking-wider uppercase mb-1 block"
                >
                  Name
                </label>
                <Input
                  id="req-name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                  placeholder="Your name"
                  className="bg-[oklch(0.10_0.015_55)] border-[oklch(0.25_0.02_55)] text-[oklch(0.90_0_0)] placeholder:text-[oklch(0.40_0_0)]"
                  data-ocid="events.input"
                />
              </div>
              <div>
                <label
                  htmlFor="req-email"
                  className="font-body text-[oklch(0.60_0_0)] text-xs tracking-wider uppercase mb-1 block"
                >
                  Email
                </label>
                <Input
                  id="req-email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                  placeholder="your@email.com"
                  className="bg-[oklch(0.10_0.015_55)] border-[oklch(0.25_0.02_55)] text-[oklch(0.90_0_0)] placeholder:text-[oklch(0.40_0_0)]"
                  data-ocid="events.input"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label
                  htmlFor="req-city"
                  className="font-body text-[oklch(0.60_0_0)] text-xs tracking-wider uppercase mb-1 block"
                >
                  City
                </label>
                <Input
                  id="req-city"
                  value={form.city}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, city: e.target.value }))
                  }
                  required
                  placeholder="City"
                  className="bg-[oklch(0.10_0.015_55)] border-[oklch(0.25_0.02_55)] text-[oklch(0.90_0_0)] placeholder:text-[oklch(0.40_0_0)]"
                  data-ocid="events.input"
                />
              </div>
              <div>
                <label
                  htmlFor="req-state"
                  className="font-body text-[oklch(0.60_0_0)] text-xs tracking-wider uppercase mb-1 block"
                >
                  State
                </label>
                <Input
                  id="req-state"
                  value={form.state}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, state: e.target.value }))
                  }
                  placeholder="State"
                  className="bg-[oklch(0.10_0.015_55)] border-[oklch(0.25_0.02_55)] text-[oklch(0.90_0_0)] placeholder:text-[oklch(0.40_0_0)]"
                  data-ocid="events.input"
                />
              </div>
              <div>
                <label
                  htmlFor="req-country"
                  className="font-body text-[oklch(0.60_0_0)] text-xs tracking-wider uppercase mb-1 block"
                >
                  Country
                </label>
                <Input
                  id="req-country"
                  value={form.country}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, country: e.target.value }))
                  }
                  required
                  placeholder="Country"
                  className="bg-[oklch(0.10_0.015_55)] border-[oklch(0.25_0.02_55)] text-[oklch(0.90_0_0)] placeholder:text-[oklch(0.40_0_0)]"
                  data-ocid="events.input"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="req-message"
                className="font-body text-[oklch(0.60_0_0)] text-xs tracking-wider uppercase mb-1 block"
              >
                Message (Optional)
              </label>
              <Textarea
                id="req-message"
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                placeholder="Tell us about the venue or event..."
                rows={3}
                className="bg-[oklch(0.10_0.015_55)] border-[oklch(0.25_0.02_55)] text-[oklch(0.90_0_0)] placeholder:text-[oklch(0.40_0_0)] resize-none"
                data-ocid="events.textarea"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setRequestOpen(false)}
                className="flex-1 py-2.5 font-body font-semibold text-sm border border-[oklch(0.35_0_0)] text-[oklch(0.60_0_0)] hover:bg-[oklch(0.18_0.02_55)] rounded-lg transition-colors"
                data-ocid="events.cancel_button"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !actor}
                className="flex-1 py-2.5 font-body font-semibold text-sm text-[oklch(0.085_0_0)] rounded-lg transition-all disabled:opacity-60"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.11 72), oklch(0.75 0.13 78))",
                }}
                data-ocid="events.submit_button"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
