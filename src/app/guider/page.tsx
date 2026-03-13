import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Rørlegger guider – Tips og råd | Rørlegger.io",
  description: "Nyttige guider om rørleggerarbeid. Hva koster rørlegger, tegn på lekkasje, forebygg frostskader, baderomrenovering og mer.",
  alternates: { canonical: "https://rorlegger.io/guider" },
};

const GUIDER = [
  { slug:"hva-koster-rorlegger",       tittel:"Hva koster rørlegger i 2025?",              lesetid:5, kategori:"Pris" },
  { slug:"bytte-varmtvannstank-selv",  tittel:"Kan du bytte varmtvannstank selv?",          lesetid:4, kategori:"VVS" },
  { slug:"tegn-pa-vannlekkasje",       tittel:"Tegn på skjult vannlekkasje i veggen",      lesetid:4, kategori:"Lekkasje" },
  { slug:"forebygg-frostskader",       tittel:"Slik forebygger du frostskader på rør",     lesetid:5, kategori:"Frost" },
  { slug:"baderom-renovering-guide",   tittel:"Komplett guide til baderomrenovering",       lesetid:8, kategori:"Renovering" },
  { slug:"rorlegger-forsikring",       tittel:"Rørlegger og forsikring – hva dekkes?",     lesetid:5, kategori:"Forsikring" },
  { slug:"kloakk-problemer",           tittel:"Kloakkproblemer – årsaker og løsninger",    lesetid:5, kategori:"Kloakk" },
  { slug:"gulvvarme-guide",            tittel:"Gulvvarme – alt du trenger å vite",         lesetid:6, kategori:"Varme" },
  { slug:"varmepumpe-guide",           tittel:"Varmtvannspumpe – er det lønnsomt?",         lesetid:5, kategori:"Energi" },
  { slug:"rorlegger-tilbud",           tittel:"Slik får du det beste rørleggertilbudet",   lesetid:4, kategori:"Tips" },
];

export default function GuiderPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-[calc(2.5rem+4rem)]">
        <section className="section-primary-gradient section-py-sm">
          <div className="container-site">
            <Breadcrumb items={[{ navn:"Guider" }]} />
            <div className="mt-6 text-white max-w-2xl">
              <div className="badge bg-white/10 text-white border-white/20 mb-4"><BookOpen className="w-3.5 h-3.5"/>Guider</div>
              <h1 className="font-display font-black text-display-xl text-white mb-4">Rørlegger guider</h1>
              <p className="text-body-lg text-white/80">Tips, råd og veiledning om rørleggerarbeid – skrevet av fagfolk.</p>
            </div>
          </div>
        </section>

        <section className="section-white section-py">
          <div className="container-site">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {GUIDER.map(g => (
                <Link key={g.slug} href={`/guider/${g.slug}`} className="card p-5 group flex flex-col">
                  <div className="badge badge-primary mb-3 self-start">{g.kategori}</div>
                  <h2 className="font-display font-bold text-heading-sm text-secondary-900 mb-3 clamp-2 flex-1">{g.tittel}</h2>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-neutral-100">
                    <span className="text-caption text-secondary-400">{g.lesetid} min lesetid</span>
                    <span className="text-primary-600 text-caption font-semibold group-hover:underline">Les guide <ArrowRight className="w-3.5 h-3.5 inline"/></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
