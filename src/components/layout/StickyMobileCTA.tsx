"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageSquare } from "lucide-react";

export default function StickyMobileCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  if (!show) return null;
  return (
    <div className="sticky-cta-bar" role="complementary" aria-label="Rask kontakt">
      <a href="tel:+4780000000" className="flex-1 flex items-center justify-center gap-2 bg-secondary-950 border border-neutral-200 rounded-10 py-3 font-display font-semibold text-label text-white">
        <Phone className="w-4 h-4 text-primary-400" aria-hidden /> Ring nå
      </a>
      <Link href="/kontakt" className="flex-1 flex items-center justify-center gap-2 bg-primary-600 rounded-10 py-3 font-display font-semibold text-label text-white shadow-primary">
        <MessageSquare className="w-4 h-4" aria-hidden /> Gratis tilbud
      </Link>
    </div>
  );
}
