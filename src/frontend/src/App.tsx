import { Toaster } from "@/components/ui/sonner";
import { useEffect, useRef } from "react";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import DiscographySection from "./components/DiscographySection";
import EventsSection from "./components/EventsSection";
import FeatureImageSection from "./components/FeatureImageSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MerchSection from "./components/MerchSection";
import MusicSection from "./components/MusicSection";
import NavBar from "./components/NavBar";
import NewsletterSection from "./components/NewsletterSection";
import SocialSection from "./components/SocialSection";
import VideosSection from "./components/VideosSection";

export default function App() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = document.querySelectorAll(".fade-in-up");
    for (const el of Array.from(elements)) {
      observerRef.current?.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NavBar />
      <main>
        <HeroSection />
        <FeatureImageSection />
        <MusicSection />
        <AboutSection />
        <DiscographySection />
        <VideosSection />
        <EventsSection />
        <SocialSection />
        <MerchSection />
        <NewsletterSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "oklch(0.14 0.022 55)",
            border: "1px solid rgba(201,162,74,0.3)",
            color: "oklch(0.95 0 0)",
          },
        }}
      />
    </div>
  );
}
