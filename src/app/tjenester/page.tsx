import type { Metadata } from "next";
import Link from "next/link";
import { Wrench, ArrowRight, Phone } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { TJENESTER, TJENESTE_KATEGORIER } from "@/data/tjenester";

export const metadata: Metadata = {
  title: "Rørleggertjenester – Alle tjenester | Rørlegger.io",
  description: "Oversikt over alle rørleggertjenester: akutt lekkasje, baderomrenovering, varmtvannstank, kloakk, frostskade og mer. Finn riktig tjeneste og bestill gratis tilbud.",
  alternates: { canonical: "https://rorlegger.io/tjenester" },
};

export default function TjenesterPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-[calc(2.5rem+4rem)]">
        <section className="section-primary-gradient section-py-sm">
          <div className="container-site">
            <Breadcrumb items={[{ navn:"Tjenester" }]} />
            <div className="mt-6 text-white max-w-2xl">
              <div className="badge bg-white/10 text-white border-white/20 mb-4"><Wrench className="w-3.5 h-3.5"/>Tjenester</div>
              <h1 className="font-display font-black text-display-xl text-white mb-4">Alle rørleggertjenester</h1>
              <p className="text-body-lg text-white/80">Fra akutte lekkasjer til planlagte renoveringer – finn riktig tjeneste og bestill gratis tilbud fra autorisert rørlegger.</p>
            </div>
          </div>
        </section>

        {TJENESTE_KATEGORIER.map(kat => {
          const tjenester = TJENESTER.filter(t => t.kategori === kat.id);
          if (!tjenester.length) return null;
          return (
            <section key={kat.id} className="section-white section-py-sm border-b border-neutral-100">
              <div className="container-site">
                <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-6">{kat.navn}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {tjenester.map(tj => (
                    <Link key={tj.slug} href={`/tjenester/${tj.slug}`} className="card p-6 group">
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{tj.ikkon}</span>
                        <div className="flex-1">
                          <h3 className="font-display font-bold text-heading-sm text-secondary-900 mb-2">{tj.tittel}</h3>
                          <p className="text-body-sm text-secondary-500 mb-4">{tj.kortBeskrivelse}</p>
                          <div className="flex items-center justify-between">
                            <span className="badge badge-neutral">{tj.prisMin.toLocaleString("nb-NO")}–{tj.prisMax.toLocaleString("nb-NO")} kr</span>
                            <span className="text-primary-600 text-caption font-semibold group-hover:underline">Les mer <ArrowRight className="w-3.5 h-3.5 inline"/></span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        <section className="section-subtle section-py">
          <div className="container-site">
            <div className="cta-block">
              <h2 className="font-display font-black text-display-lg text-white mb-4">Usikker på hvilken tjeneste du trenger?</h2>
              <p className="text-body-lg text-white/80 mb-6">Ring oss eller beskriv problemet – vi hjelper deg å finne riktig rørlegger.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt" className="btn bg-white text-primary-700 font-semibold px-8 py-4 rounded-8 hover:bg-primary-50 transition-all">Bestill gratis tilbud</Link>
                <a href="tel:+4780000000" className="btn border-2 border-white/40 text-white px-8 py-4 rounded-8 hover:bg-white/10 transition-all"><Phone className="w-4 h-4"/>Ring 800 00 000</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
