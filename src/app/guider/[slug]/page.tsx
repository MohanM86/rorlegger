import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Phone } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FAQ from "@/components/ui/FAQ";
import { TJENESTER } from "@/data/tjenester";

const GUIDER_META: Record<string,{tittel:string;lesetid:number;kategori:string;seoTitle:string;seoDesc:string}> = {
  "hva-koster-rorlegger":      { tittel:"Hva koster rørlegger i 2025?",              lesetid:5, kategori:"Pris",      seoTitle:"Hva koster rørlegger 2025? Priser og guide",            seoDesc:"Alt om rørleggerpriser i 2025. Timepris, pris per oppdrag og hva som påvirker prisen." },
  "bytte-varmtvannstank-selv": { tittel:"Kan du bytte varmtvannstank selv?",          lesetid:4, kategori:"VVS",       seoTitle:"Bytte varmtvannstank selv – hva er lov?",                seoDesc:"Kan du bytte varmtvannstank selv? Regler, risiko og når du MÅ bruke autorisert rørlegger." },
  "tegn-pa-vannlekkasje":      { tittel:"Tegn på skjult vannlekkasje i veggen",      lesetid:4, kategori:"Lekkasje",  seoTitle:"Tegn på skjult vannlekkasje – Sjekkliste",               seoDesc:"Lær å gjenkjenne tegn på skjult vannlekkasje. Sjekkliste og hva du bør gjøre." },
  "forebygg-frostskader":      { tittel:"Slik forebygger du frostskader på rør",     lesetid:5, kategori:"Frost",     seoTitle:"Forebygg frostskader på rør – Råd fra fagfolk",           seoDesc:"Effektive tiltak for å forebygge frostskader på rørledninger i vinter." },
  "baderom-renovering-guide":  { tittel:"Komplett guide til baderomrenovering",       lesetid:8, kategori:"Renovering",seoTitle:"Baderomrenovering guide 2025 – steg for steg",           seoDesc:"Alt du trenger å vite om baderomrenovering. Rørlegger, flislegger, kostnader og regler." },
  "rorlegger-forsikring":      { tittel:"Rørlegger og forsikring – hva dekkes?",     lesetid:5, kategori:"Forsikring",seoTitle:"Rørlegger og forsikring – hva dekker husforsikringen?",  seoDesc:"Komplett guide til hva husforsikringen dekker av rørleggerarbeid og vannskader." },
  "kloakk-problemer":          { tittel:"Kloakkproblemer – årsaker og løsninger",    lesetid:5, kategori:"Kloakk",    seoTitle:"Kloakkproblemer – årsaker, tegn og løsninger",           seoDesc:"Alt om kloakkproblemer: vanlige årsaker, advarselstegn og når du trenger fagmann." },
  "gulvvarme-guide":           { tittel:"Gulvvarme – alt du trenger å vite",         lesetid:6, kategori:"Varme",     seoTitle:"Gulvvarme guide – vannbåren vs. elektrisk",              seoDesc:"Komplett guide til gulvvarme. Vannbåren vs elektrisk, priser og installasjon." },
  "varmepumpe-guide":          { tittel:"Varmtvannspumpe – er det lønnsomt?",         lesetid:5, kategori:"Energi",   seoTitle:"Varmtvannspumpe – lønnsomt investering i 2025?",         seoDesc:"Er varmtvannspumpe lønnsomt? Priser, Enova-tilskudd og beregning av besparelse." },
  "rorlegger-tilbud":          { tittel:"Slik får du det beste rørleggertilbudet",   lesetid:4, kategori:"Tips",      seoTitle:"Slik får du det beste tilbudet fra rørlegger",           seoDesc:"Tips for å sammenligne og velge rørlegger. Hva bør et tilbud inneholde og hva bør du sjekke?" },
};

export async function generateStaticParams() {
  return Object.keys(GUIDER_META).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = GUIDER_META[slug];
  if (!m) return {};
  return { title: m.seoTitle, description: m.seoDesc, alternates: { canonical: `https://rorlegger.io/guider/${slug}` } };
}

function getGuideContent(slug: string): { ingress: string; avsnitt: {tittel:string;tekst:string}[]; faq:{sporsmal:string;svar:string}[] } {
  const defaults = {
    ingress: `Denne guiden gir deg alt du trenger å vite om ${GUIDER_META[slug]?.tittel?.toLowerCase() ?? "temaet"}. Vi har samlet råd fra autoriserte rørleggere og bransjekjennere.`,
    avsnitt: [
      { tittel:"Innledning", tekst:"Rørleggerarbeid er faglig arbeid som krever autorisasjon i Norge. Det er viktig å velge riktig fagmann for jobben." },
      { tittel:"Hva du bør vite",tekst:"Alltid innhent skriftlig tilbud. Sjekk at rørleggeren har gyldig autorisasjon og faglig ansvarlig. Ring 800 00 000 for hjelp." },
      { tittel:"Kostnader",tekst:"Priser varierer med type oppdrag, region og hastegrad. Se vår prisoversikt for detaljerte priser på alle tjenester." },
    ],
    faq: [
      { sporsmal:"Trenger jeg alltid autorisert rørlegger?", svar:"Ja. Alt VVS-arbeid i Norge krever autorisasjon. Ufaglært arbeid ugyldiggjør forsikringen." },
      { sporsmal:"Hva koster det?", svar:"Timepris 800–1 400 kr/t på dagtid. Se vår prisoversikt for detaljer." },
    ],
  };
  return defaults;
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = GUIDER_META[slug];
  if (!meta) return <div>Guide ikke funnet</div>;
  const content = getGuideContent(slug);
  const articleSchema = {
    "@context":"https://schema.org","@type":"Article",
    headline: meta.tittel, url:`https://rorlegger.io/guider/${slug}`,
    author:{"@type":"Organization",name:"Rørlegger.io"},
    publisher:{"@type":"Organization",name:"Rørlegger.io"},
    dateModified: new Date().toISOString().split("T")[0],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Header />
      <main id="main-content" className="pt-[calc(2.5rem+4rem)]">
        <section className="section-primary-gradient section-py-sm">
          <div className="container-site">
            <Breadcrumb items={[{navn:"Guider",href:"/guider"},{navn:meta.tittel}]} />
            <div className="mt-6 text-white max-w-2xl">
              <div className="badge bg-white/10 text-white border-white/20 mb-4">{meta.kategori}</div>
              <h1 className="font-display font-black text-display-xl text-white mb-4">{meta.tittel}</h1>
              <div className="flex items-center gap-3 text-caption text-white/60">
                <Clock className="w-3.5 h-3.5" /> {meta.lesetid} min lesetid · Rørlegger.io
              </div>
            </div>
          </div>
        </section>

        <section className="section-white section-py">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <p className="text-body-lg text-secondary-700 mb-8 leading-relaxed">{content.ingress}</p>
                {content.avsnitt.map(a => (
                  <div key={a.tittel} className="mb-8">
                    <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-3">{a.tittel}</h2>
                    <p className="text-body-md text-secondary-600 leading-relaxed">{a.tekst}</p>
                  </div>
                ))}
                <div className="mt-10">
                  <FAQ items={content.faq} tittel="Vanlige spørsmål" />
                </div>
              </div>
              <div className="space-y-5">
                <div className="card p-5">
                  <h3 className="font-display font-bold text-heading-sm mb-4">Trenger du rørlegger?</h3>
                  <Link href="/kontakt" className="btn-primary w-full justify-center mb-3">Gratis tilbud</Link>
                  <a href="tel:+4780000000" className="btn-phone w-full justify-center"><Phone className="w-4 h-4"/>Ring 800 00 000</a>
                </div>
                <div className="card-flat p-5">
                  <h3 className="font-display font-bold text-heading-sm text-secondary-950 mb-4">Relevante tjenester</h3>
                  <ul className="space-y-2">
                    {TJENESTER.slice(0,4).map(t => (
                      <li key={t.slug}>
                        <Link href={`/tjenester/${t.slug}`} className="text-body-sm text-secondary-600 hover:text-primary-600 transition-colors flex items-center gap-2">
                          <span>{t.ikkon}</span> {t.kortTittel}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
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
