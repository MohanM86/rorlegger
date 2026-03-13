import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Star, Clock, MapPin, CheckCircle, Award, Users, Phone } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Om Rørlegger.io – Norges ledende rørleggerplattform",
  description: "Les om Rørlegger.io – Norges ledende plattform for å finne autoriserte rørleggere. Vår misjon, verdier og hvem vi er.",
  alternates: { canonical: "https://rorlegger.io/om-oss" },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rørlegger.io",
  url: "https://rorlegger.io",
  description: "Norges ledende plattform for å finne autoriserte rørleggere.",
  foundingDate: "2022",
  areaServed: { "@type": "Country", name: "Norway" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "3400", bestRating: "5" },
};

const VERDIER = [
  { ikkon: Shield, tittel: "Trygghet",        tekst: "Vi samarbeider kun med autoriserte rørleggere med gyldig mesterbrev. Du er alltid i trygge hender." },
  { ikkon: Star,   tittel: "Kvalitet",         tekst: "Vi følger opp alle oppdrag og samler tilbakemeldinger for å sikre høy standard." },
  { ikkon: Clock,  tittel: "Raskhet",          tekst: "Vi vet at rørleggerproblemer ikke kan vente. Målet er kontakt innen 24 timer – og raskere ved akutt." },
  { ikkon: MapPin, tittel: "Tilgjengelighet",  tekst: "Med dekning i 356 kommuner er vi alltid i nærheten, uansett hvor i Norge du bor." },
];

const PROSESS = [
  { num:"01", tittel:"Du beskriver oppdraget",    tekst:"Via skjema, telefon eller chat – vi noterer hva som trengs." },
  { num:"02", tittel:"Vi matcher deg med fagmann", tekst:"Vi finner nærmeste ledige autoriserte rørlegger." },
  { num:"03", tittel:"Rørlegger gir tilbud",       tekst:"Konkret pris og tidspunkt – gratis og uforpliktende." },
  { num:"04", tittel:"Jobben blir gjort",           tekst:"Fagmannen utfører arbeidet og du betaler direkte." },
];

export default function OmOssPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <Header />
      <main id="main-content" className="pt-[calc(2.5rem+4rem)]">

        <section className="section-primary-gradient section-py-sm">
          <div className="container-site">
            <Breadcrumb items={[{ navn:"Om oss" }]} />
            <div className="mt-6 text-white max-w-2xl">
              <h1 className="font-display font-black text-display-xl text-white mb-4">Om Rørlegger.io</h1>
              <p className="text-body-lg text-white/80">
                Vi er Norges ledende plattform for å finne autoriserte rørleggere – raskt, enkelt og gratis.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="section-white section-py">
          <div className="container-site max-w-3xl mx-auto">
            <h2 className="font-display font-black text-display-lg text-secondary-950 mb-6">Vår misjon</h2>
            <p className="text-body-lg text-secondary-700 leading-relaxed mb-5">
              Rørlegger.io ble grunnlagt med én klar visjon: å gjøre det enkelt å finne riktig autorisert rørlegger – uansett hvor i Norge du bor, og uansett om det haster eller er planlagt.
            </p>
            <p className="text-body-lg text-secondary-700 leading-relaxed mb-5">
              Vi har bygget et nasjonalt nettverk av sertifiserte rørleggere som vi formidler kontakt med. Alt arbeid utføres av fagfolk med gyldig mesterbrev og autorisasjon etter norsk lovgivning.
            </p>
            <p className="text-body-lg text-secondary-700 leading-relaxed">
              Fra akutte vannlekkasjer til planlagte baderomrenoveringer – vi matcher deg med riktig fagmann innen 24 timer, gratis og uforpliktende.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="section-navy section-py">
          <div className="container-site">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { verdi:"3 400+", label:"Fornøyde kunder" },
                { verdi:"4,9/5",  label:"Snittkarakter" },
                { verdi:"356",    label:"Kommuner dekket" },
                { verdi:"2022",   label:"Etablert" },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="font-display font-black text-[2.5rem] text-primary-400 block">{s.verdi}</div>
                  <div className="text-body-sm text-neutral-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verdier */}
        <section className="section-subtle section-py">
          <div className="container-site">
            <h2 className="font-display font-black text-display-lg text-secondary-950 text-center mb-10">Våre verdier</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {VERDIER.map(({ ikkon: Icon, tittel, tekst }) => (
                <div key={tittel} className="card p-6 text-center">
                  <div className="w-12 h-12 rounded-16 bg-primary-50 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-display font-bold text-heading-sm text-secondary-950 mb-2">{tittel}</h3>
                  <p className="text-body-sm text-secondary-500">{tekst}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prosess */}
        <section className="section-white section-py">
          <div className="container-site">
            <h2 className="font-display font-black text-display-lg text-secondary-950 text-center mb-10">Slik jobber vi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROSESS.map(p => (
                <div key={p.num} className="card p-6">
                  <div className="font-mono font-black text-[2.5rem] text-primary-100 mb-3">{p.num}</div>
                  <h3 className="font-display font-bold text-heading-sm text-secondary-900 mb-2">{p.tittel}</h3>
                  <p className="text-body-sm text-secondary-500">{p.tekst}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Garantier */}
        <section className="section-subtle section-py">
          <div className="container-site max-w-3xl mx-auto">
            <h2 className="font-display font-black text-display-lg text-secondary-950 text-center mb-8">Våre garantier til deg</h2>
            <div className="space-y-4">
              {[
                { tittel:"Gratis tilbud",          tekst:"Det koster deg ingenting å bruke Rørlegger.io. Tilbudet er alltid gratis og uforpliktende." },
                { tittel:"Kun autoriserte fagfolk", tekst:"Vi kontrollerer autorisasjonen til alle rørleggere vi samarbeider med." },
                { tittel:"Svar innen 24 timer",    tekst:"Vi lover kontakt fra rørlegger innen 24 timer. Akutte oppdrag prioriteres." },
                { tittel:"Fornøydgaranti",          tekst:"Ikke fornøyd med tilbudet? Vi hjelper deg å finne en annen rørlegger – kostnadsfritt." },
              ].map(g => (
                <div key={g.tittel} className="trust-box">
                  <div className="trust-icon-wrap"><CheckCircle className="w-4 h-4 text-primary-600" /></div>
                  <div>
                    <p className="font-display font-semibold text-label text-secondary-900">{g.tittel}</p>
                    <p className="text-body-sm text-secondary-600 mt-0.5">{g.tekst}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-white section-py">
          <div className="container-site">
            <div className="cta-block">
              <Award className="w-10 h-10 text-white/60 mx-auto mb-4" />
              <h2 className="font-display font-black text-display-lg text-white mb-4">Klar til å finne din rørlegger?</h2>
              <p className="text-body-lg text-white/80 mb-6 max-w-xl mx-auto">Gratis og uforpliktende tilbud innen 24 timer.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt" className="btn bg-white text-primary-700 font-semibold px-8 py-4 rounded-8 hover:bg-primary-50 transition-all">Bestill gratis tilbud</Link>
                <a href="tel:+4780000000" className="btn border-2 border-white/40 text-white px-8 py-4 rounded-8 hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4" /> Ring 800 00 000
                </a>
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
