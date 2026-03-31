import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

export default function NewsletterSection() {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setLoading(true);
    try {
      await actor.signupNewsletter(name, email);
      setDone(true);
      toast.success("You're on the list! 🎸");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="newsletter"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "oklch(0.10 0.015 55)" }}
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, oklch(0.70 0.12 75), transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-[700px] mx-auto px-4 sm:px-6 text-center">
        <div className="fade-in-up">
          <p className="text-[oklch(0.70_0.12_75)] font-body tracking-[0.35em] text-xs font-semibold uppercase mb-3">
            Fan Club
          </p>
          <h2 className="section-heading text-4xl md:text-5xl gold-text mb-4">
            Join the Crew
          </h2>
          <div className="w-16 h-0.5 bg-[oklch(0.70_0.12_75)] mx-auto mb-6" />
          <p className="font-body text-[oklch(0.65_0_0)] text-lg mb-8">
            Be the first to know about new music, tour announcements, and
            exclusive content. Drew's fans are everything to him.
          </p>

          {done ? (
            <div
              className="glass-card rounded-2xl p-8"
              data-ocid="newsletter.success_state"
            >
              <p className="text-4xl mb-3">🎸</p>
              <p className="font-display font-bold text-[oklch(0.92_0_0)] text-2xl mb-2">
                You're In!
              </p>
              <p className="font-body text-[oklch(0.60_0_0)]">
                Welcome to the crew. Keep an eye on your inbox for exclusive
                updates.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-left">
                  <label
                    htmlFor="nl-name"
                    className="font-body text-[oklch(0.60_0_0)] text-xs tracking-wider uppercase mb-1.5 block"
                  >
                    First Name
                  </label>
                  <Input
                    id="nl-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your name"
                    className="bg-[oklch(0.10_0.015_55)] border-[oklch(0.25_0.02_55)] text-[oklch(0.90_0_0)] placeholder:text-[oklch(0.40_0_0)]"
                    data-ocid="newsletter.input"
                  />
                </div>
                <div className="text-left">
                  <label
                    htmlFor="nl-email"
                    className="font-body text-[oklch(0.60_0_0)] text-xs tracking-wider uppercase mb-1.5 block"
                  >
                    Email
                  </label>
                  <Input
                    id="nl-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="bg-[oklch(0.10_0.015_55)] border-[oklch(0.25_0.02_55)] text-[oklch(0.90_0_0)] placeholder:text-[oklch(0.40_0_0)]"
                    data-ocid="newsletter.input"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading || !actor}
                className="w-full py-3 font-body font-semibold tracking-[0.15em] text-sm uppercase rounded-lg transition-all duration-300 hover:shadow-gold disabled:opacity-60"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.11 72), oklch(0.75 0.13 78))",
                  color: "oklch(0.085 0 0)",
                }}
                data-ocid="newsletter.submit_button"
              >
                {loading ? "Signing Up..." : "🎵 Join the Fan Club"}
              </button>
              <p className="font-body text-[oklch(0.40_0_0)] text-xs">
                No spam, ever. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
