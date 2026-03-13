import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { FYLKER, getKommunerByFylke } from "@/data/kommuner";

export const metadata: Metadata = {
  title: "Finn rørlegger i hele Norge – Alle kommuner | Rørlegger.io",
  description: "Finn autorisert rørlegger i din kommune. Vi dekker alle 356 norske kommuner fordelt på 11 fylker. Gratis tilbud innen 24 timer.",
  alternates: { canonical: "https://rorlegger.io/elektriker" },
};

export default function ElektrikerPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-[calc(2.5rem+4rem)]">
        <section className="section-primary-gradient section-py-sm">
          <div className="container-site">
            <Breadcrumb items={[{ navn:"Finn rørlegger" }]} />
            <div className="mt-6 text-white max-w-2xl">
              <h1 className="font-display font-black text-display-xl text-white mb-4">Rørlegger i hele Norge</h1>
              <p className="text-body-lg text-white/80">Finn autorisert rørlegger i din kommune. Vi dekker alle norske kommuner med sertifiserte fagfolk.</p>
            </div>
          </div>
        </section>

        {FYLKER.map(f => {
          const kommuner = getKommunerByFylke(f.slug);
          return (
            <section key={f.slug} className="section-white section-py-sm border-b border-neutral-100">
              <div className="container-site">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-display font-bold text-heading-xl text-secondary-950">
                    <Link href={`/fylke/${f.slug}`} className="hover:text-primary-600 transition-colors">{f.navn}</Link>
                  </h2>
                  <Link href={`/fylke/${f.slug}`} className="text-caption text-primary-600 hover:underline">{f.kommuneCount} kommuner →</Link>
                </div>
                {kommuner.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                    {kommuner.map(k => (
                      <Link key={k.slug} href={`/kommune/${k.slug}`}
                        className="flex items-center gap-2 p-3 rounded-10 border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-all group">
                        <MapPin className="w-3 h-3 text-primary-400 flex-shrink-0" />
                        <span className="text-label text-secondary-700 group-hover:text-primary-700 truncate">{k.navn}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-body-sm text-secondary-400">Kom tilbake snart – vi legger til kommuner fortløpende.</p>
                )}
              </div>
            </section>
          );
        })}
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
