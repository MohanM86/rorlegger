import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FAQ from "@/components/ui/FAQ";
import RorleggerKalkulator from "@/components/calculators/RorleggerKalkulator";
import { TJENESTER } from "@/data/tjenester";

export const metadata: Metadata = {
  title: "Rørlegger priser 2025 – Hva koster rørlegger? | Rørlegger.io",
  description: "Komplett prisoversikt for rørleggerarbeid 2025. Timepris, pris per oppdrag og hva som påvirker prisen. Se priser og bestill gratis tilbud.",
  alternates: { canonical: "https://rorlegger.io/priser" },
};

const FAQ_ITEMS = [
  { sporsmal:"Hva er timepris for rørlegger i 2025?",     svar:"Timepris varierer fra 800 kr (dagtid) til 1 800 kr (kveld/helg). Akuttutrykninger kan koste 2 500–5 000 kr." },
  { sporsmal:"Betaler jeg for reisetid?",                  svar:"De fleste rørleggere fakturerer reisetid. Typisk halv timepris. Noen har en fast utrykkingskostnad i stedet." },
  { sporsmal:"Hva koster et nødkall om natten?",           svar:"Nattevakt og akutt utrykning koster 2 000–5 000 kr bare i utrykkingsavgift, pluss timepris på 1 500–2 000 kr." },
  { sporsmal:"Kan jeg forhandle prisen?",                  svar:"For planlagte oppdrag kan du innhente 2–3 tilbud og velge det beste. Akuttutrykninger har mindre rom for forhandling." },
  { sporsmal:"Hva er inkludert i tilbudet?",               svar:"Et seriøst tilbud skal inkludere arbeidskostnad, materialer, reisetid og mva. Be alltid om skriftlig tilbud." },
  { sporsmal:"Hvorfor varierer prisen så mye?",            svar:"Pris avhenger av type oppdrag, omfang, tilgjengelighet til røranlegg, tidspunkt og din geografi." },
];

export default function PriserPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-[calc(2.5rem+4rem)]">
        <section className="section-primary-gradient section-py-sm">
          <div className="container-site">
            <Breadcrumb items={[{ navn:"Priser" }]} />
            <div className="mt-6 text-white max-w-2xl">
              <h1 className="font-display font-black text-display-xl text-white mb-4">Rørlegger priser 2025</h1>
              <div className="bg-white/10 border border-white/20 rounded-12 p-4 mb-4">
                <p className="text-caption text-accent-300 font-semibold mb-1">📌 Rask svar</p>
                <p className="text-body-md text-white/90">Timepris rørlegger 2025: 800–1 400 kr/t på dagtid. Kveld og helg: 1 200–1 800 kr/t. Akutt utrykning: 2 500–5 000 kr ekstra.</p>
              </div>
              <p className="text-body-lg text-white/80">Komplett oversikt over priser for alle typer rørleggerarbeid i Norge.</p>
            </div>
          </div>
        </section>

        {/* Timepris */}
        <section className="section-white section-py">
          <div className="container-site">
            <h2 className="font-display font-black text-heading-xl text-secondary-950 mb-6">Timepris rørlegger</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label:"Dagtid (08–16)", pris:"800–1 200 kr/t", sub:"Man–fre" },
                { label:"Ettermiddag",    pris:"1 000–1 400 kr/t",sub:"16–20" },
                { label:"Kveld/natt",     pris:"1 400–1 800 kr/t",sub:"20–08" },
                { label:"Helg/helligdag", pris:"1 400–2 000 kr/t",sub:"Lør/søn" },
              ].map(r => (
                <div key={r.label} className="price-box text-center">
                  <p className="text-label font-semibold text-secondary-700 mb-2">{r.label}</p>
                  <div className="font-mono font-bold text-price-lg text-secondary-950">{r.pris}</div>
                  <p className="text-caption text-secondary-400 mt-1">{r.sub}</p>
                </div>
              ))}
            </div>

            <h2 className="font-display font-black text-heading-xl text-secondary-950 mb-6">Pris per tjenestetype</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-body-sm">
                <thead>
                  <tr className="bg-secondary-50 border-b border-neutral-200">
                    <th className="text-left px-4 py-3 font-display font-bold text-secondary-800">Tjeneste</th>
                    <th className="text-left px-4 py-3 font-display font-bold text-secondary-800">Prisintervall</th>
                    <th className="text-left px-4 py-3 font-display font-bold text-secondary-800">Enhet</th>
                  </tr>
                </thead>
                <tbody>
                  {TJENESTER.map((tj, i) => (
                    <tr key={tj.slug} className={`border-b border-neutral-100 ${i%2===0?'bg-white':'bg-secondary-50/40'}`}>
                      <td className="px-4 py-3">
                        <Link href={`/tjenester/${tj.slug}`} className="font-semibold text-secondary-900 hover:text-primary-600 transition-colors">
                          {tj.ikkon} {tj.kortTittel}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-mono font-semibold text-secondary-950">
                        {tj.prisMin.toLocaleString("nb-NO")}–{tj.prisMax.toLocaleString("nb-NO")} kr
                      </td>
                      <td className="px-4 py-3 text-secondary-500">{tj.prisenhet}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Kalkulator */}
        <section className="section-subtle section-py">
          <div className="container-site max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display font-black text-display-lg text-secondary-950 mb-3">Beregn pris på ditt oppdrag</h2>
              <p className="text-body-lg text-secondary-600">Få et estimat basert på type oppdrag og hastegrad</p>
            </div>
            <RorleggerKalkulator />
          </div>
        </section>

        {/* FAQ */}
        <section className="section-white section-py">
          <div className="container-site max-w-3xl mx-auto">
            <FAQ items={FAQ_ITEMS} tittel="Vanlige spørsmål om rørleggerpriser" />
          </div>
        </section>

        <section className="section-subtle section-py">
          <div className="container-site">
            <div className="cta-block">
              <h2 className="font-display font-black text-display-lg text-white mb-4">Vil du vite nøyaktig hva det koster?</h2>
              <p className="text-body-lg text-white/80 mb-6 max-w-xl mx-auto">Bestill gratis og uforpliktende tilbud fra autorisert rørlegger i ditt område.</p>
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
