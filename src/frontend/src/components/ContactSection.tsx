import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { toast } from "sonner";

const EMAILJS_SERVICE_ID = "service_8hvt6yl";
const EMAILJS_TEMPLATE_ID = "template_ab7506b";
const EMAILJS_PUBLIC_KEY = "83DcK7WnKM-ih6gz1";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    inquiryType: "general" as "general" | "booking",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          inquiry_type: form.inquiryType,
          message: form.message,
          to_email: "drewgreenmusic@hotmail.com",
        },
        EMAILJS_PUBLIC_KEY,
      );
      setDone(true);
      toast.success("Message received! We'll be in touch soon.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[oklch(0.085_0_0)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in-up text-center mb-12">
          <p className="text-[oklch(0.70_0.12_75)] font-body tracking-[0.35em] text-xs font-semibold uppercase mb-3">
            Reach Out
          </p>
          <h2 className="section-heading text-4xl md:text-5xl gold-text mb-4">
            Contact &amp; Booking
          </h2>
          <div className="w-16 h-0.5 bg-[oklch(0.70_0.12_75)] mx-auto mb-4" />
          <p className="font-body text-[oklch(0.55_0_0)] max-w-md mx-auto">
            For booking inquiries, media, or general questions, send a message
            below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="fade-in-up lg:col-span-2 space-y-6">
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="font-display font-bold text-[oklch(0.70_0.12_75)] text-lg uppercase tracking-widest">
                Booking
              </h3>
              <p className="font-body text-[oklch(0.62_0_0)] text-sm leading-relaxed">
                Available for festivals, private events, concerts, and corporate
                entertainment. Use the form to submit your booking inquiry.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="font-display font-bold text-[oklch(0.70_0.12_75)] text-lg uppercase tracking-widest">
                Press &amp; Media
              </h3>
              <p className="font-body text-[oklch(0.62_0_0)] text-sm leading-relaxed">
                For press requests, interviews, photo rights, or media
                inquiries, please select General in the form.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-bold text-[oklch(0.70_0.12_75)] text-lg uppercase tracking-widest mb-3">
                Official Site
              </h3>
              <a
                href="https://www.drewgreen.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[oklch(0.70_0.12_75)] hover:text-[oklch(0.85_0.13_78)] text-sm transition-colors"
                data-ocid="contact.link"
              >
                www.drewgreen.com ›
              </a>
            </div>
          </div>

          <div className="fade-in-up lg:col-span-3">
            {done ? (
              <div
                className="glass-card rounded-2xl p-12 text-center"
                data-ocid="contact.success_state"
              >
                <p className="text-5xl mb-4">✉️</p>
                <p className="font-display font-bold text-[oklch(0.92_0_0)] text-2xl mb-2">
                  Message Received!
                </p>
                <p className="font-body text-[oklch(0.60_0_0)]">
                  We'll get back to you as soon as possible.
                </p>
                <button
                  type="button"
                  onClick={() => setDone(false)}
                  className="mt-6 px-6 py-2 font-body text-sm text-[oklch(0.70_0.12_75)] border border-[oklch(0.70_0.12_75/0.4)] rounded-lg hover:bg-[oklch(0.70_0.12_75/0.1)] transition-colors"
                  data-ocid="contact.button"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl p-8 space-y-5"
                data-ocid="contact.modal"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="ct-name"
                      className="font-body text-[oklch(0.60_0_0)] text-xs tracking-wider uppercase mb-1.5 block"
                    >
                      Name
                    </label>
                    <Input
                      id="ct-name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                      placeholder="Your full name"
                      className="bg-[oklch(0.10_0.015_55)] border-[oklch(0.25_0.02_55)] text-[oklch(0.90_0_0)] placeholder:text-[oklch(0.40_0_0)]"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ct-email"
                      className="font-body text-[oklch(0.60_0_0)] text-xs tracking-wider uppercase mb-1.5 block"
                    >
                      Email
                    </label>
                    <Input
                      id="ct-email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      required
                      placeholder="your@email.com"
                      className="bg-[oklch(0.10_0.015_55)] border-[oklch(0.25_0.02_55)] text-[oklch(0.90_0_0)] placeholder:text-[oklch(0.40_0_0)]"
                      data-ocid="contact.input"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="ct-inquiry"
                    className="font-body text-[oklch(0.60_0_0)] text-xs tracking-wider uppercase mb-1.5 block"
                  >
                    Inquiry Type
                  </label>
                  <Select
                    value={form.inquiryType}
                    onValueChange={(v) =>
                      setForm((p) => ({
                        ...p,
                        inquiryType: v as "general" | "booking",
                      }))
                    }
                  >
                    <SelectTrigger
                      id="ct-inquiry"
                      className="bg-[oklch(0.10_0.015_55)] border-[oklch(0.25_0.02_55)] text-[oklch(0.90_0_0)]"
                      data-ocid="contact.select"
                    >
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        background: "oklch(0.14 0.022 55)",
                        borderColor: "oklch(0.25 0.02 55)",
                      }}
                    >
                      <SelectItem
                        value="general"
                        className="text-[oklch(0.88_0_0)] focus:bg-[oklch(0.20_0.025_55)]"
                      >
                        General Inquiry
                      </SelectItem>
                      <SelectItem
                        value="booking"
                        className="text-[oklch(0.88_0_0)] focus:bg-[oklch(0.20_0.025_55)]"
                      >
                        Booking Request
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label
                    htmlFor="ct-message"
                    className="font-body text-[oklch(0.60_0_0)] text-xs tracking-wider uppercase mb-1.5 block"
                  >
                    Message
                  </label>
                  <Textarea
                    id="ct-message"
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    required
                    placeholder="Tell us about your inquiry..."
                    rows={5}
                    className="bg-[oklch(0.10_0.015_55)] border-[oklch(0.25_0.02_55)] text-[oklch(0.90_0_0)] placeholder:text-[oklch(0.40_0_0)] resize-none"
                    data-ocid="contact.textarea"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 font-body font-semibold tracking-[0.15em] text-sm uppercase rounded-lg transition-all duration-300 hover:shadow-gold disabled:opacity-60"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.65 0.11 72), oklch(0.75 0.13 78))",
                    color: "oklch(0.085 0 0)",
                  }}
                  data-ocid="contact.submit_button"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
