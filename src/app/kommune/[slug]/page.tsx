import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Shield, Clock, Star, Phone, ChevronRight, Wrench } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import LeadForm from "@/components/forms/LeadForm";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FAQ from "@/components/ui/FAQ";
import { getKommune, getAllKommuneSlugs } from "@/data/kommuner";
import { TJENESTER } from "@/data/tjenester";
import { buildFAQSchema } from "@/lib/utils";

export async function generateStaticParams() {
  return getAllKommuneSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const k = getKommune(slug);
  if (!k) return {};
  return {
    title: k.seoTitle,
    description: k.seoDesc,
    alternates: { canonical: `https://rorlegger.io/kommune/${slug}` },
    openGraph: { title: k.seoTitle, description: k.seoDesc, url: `https://rorlegger.io/kommune/${slug}` },
  };
}

export default async function KommunePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const k = getKommune(slug);
  if (!k) notFound();

  const faqItems = [
    { sporsmal: `Hva koster rørlegger i ${k.navn}?`,           svar: `Timepris for rørlegger i ${k.navn} er typisk 800–1 400 kr. Pris per oppdrag varierer med type jobb og omfang.` },
    { sporsmal: `Hvor raskt kan jeg få rørlegger i ${k.navn}?`, svar: `Via Rørlegger.io forventer du kontakt innen 24 timer. Akutte lekkasjer prioriteres og rørlegger kan komme raskere.` },
    { sporsmal: `Trenger jeg autorisert rørlegger i ${k.navn}?`,svar: "Ja. Alt VVS-arbeid i Norge krever autorisert rørlegger med faglig ansvarlig. Ufaglært arbeid ugyldiggjør forsikring." },
    { sporsmal: `Dekker forsikringen rørleggerarbeid i ${k.navn}?`, svar: "Husforsikringen dekker som regel akutte vannskader. Planlagte renoveringer er ikke alltid dekket – sjekk dine vilkår." },
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Rørlegger ${k.navn}`,
    description: k.beskrivelse,
    url: `https://rorlegger.io/kommune/${slug}`,
    areaServed: { "@type": "City", name: k.navn, containedInPlace: { "@type": "State", name: k.fylkeNavn } },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "3400", bestRating: "5" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(faqItems)) }} />
      <Header />
      <main id="main-content" className="pt-[calc(2.5rem+4rem)]">

        {/* Hero */}
        <section className="section-primary-gradient section-py-sm">
          <div className="container-site">
            <Breadcrumb items={[
              { navn:"Finn rørlegger", href:"/elektriker" },
              { navn:k.fylkeNavn, href:`/fylke/${k.fylkeSlug}` },
              { navn:`Rørlegger ${k.navn}` },
            ]} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6 items-start">
              <div className="text-white">
                <div className="badge bg-white/10 text-white border-white/20 mb-4">
                  <MapPin className="w-3.5 h-3.5" /> {k.fylkeNavn}
                </div>
                <h1 className="font-display font-black text-display-xl text-white mb-4">
                  Rørlegger {k.navn}
                </h1>
                {/* AEO short answer */}
                <div className="bg-white/10 border border-white/20 rounded-12 p-4 mb-5">
                  <p className="text-caption text-accent-300 font-semibold mb-1">📌 Rask svar</p>
                  <p className="text-body-md text-white/90">
                    Finn autorisert rørlegger i {k.navn} via Rørlegger.io. Timepris 800–1 400 kr.
                    Gratis tilbud innen 24 timer. Akutt hjelp tilgjengelig.
                  </p>
                </div>
                <p className="text-body-lg text-white/80 mb-6">{k.beskrivelse}</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { Icon:Shield, t:"Autoriserte fagfolk" },
                    { Icon:Clock,  t:"Svar innen 24t" },
                    { Icon:Star,   t:"4,9/5 karakter" },
                  ].map(({Icon,t}) => (
                    <div key={t} className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-8 px-3 py-2 text-label text-white/90">
                      <Icon className="w-3.5 h-3.5 text-accent-300" /> {t}
                    </div>
                  ))}
                </div>
              </div>
              <div><LeadForm kilde={`kommune-${slug}`} /></div>
            </div>
          </div>
        </section>

        {/* Services in this city */}
        <section className="section-white section-py">
          <div className="container-site">
            <h2 className="font-display font-black text-display-lg text-secondary-950 mb-8">
              Rørleggertjenester i {k.navn}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TJENESTER.slice(0,8).map(tj => (
                <Link key={tj.slug} href={`/tjenester/${tj.slug}`} className="card p-4 group">
                  <div className="text-2xl mb-2">{tj.ikkon}</div>
                  <h3 className="font-display font-bold text-heading-sm text-secondary-900 mb-1">{tj.kortTittel}</h3>
                  <p className="text-body-sm text-secondary-500 clamp-2 mb-3">{tj.kortBeskrivelse}</p>
                  <span className="text-caption text-primary-600 group-hover:underline">Les mer →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Priser */}
        <section className="section-subtle section-py">
          <div className="container-site max-w-3xl mx-auto">
            <h2 className="font-display font-black text-display-lg text-secondary-950 mb-6">
              Rørlegger priser i {k.navn}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { label:"Timepris (dagtid)",         pris:"800–1 200 kr/t" },
                { label:"Timepris (kveld/helg)",     pris:"1 200–1 800 kr/t" },
                { label:"Akuttutrykning",             pris:"2 500–5 000 kr" },
                { label:"Baderomrenovering (total)", pris:"80 000–200 000 kr" },
              ].map(r => (
                <div key={r.label} className="price-box flex items-center justify-between">
                  <span className="text-body-sm text-secondary-600">{r.label}</span>
                  <span className="font-mono font-bold text-secondary-950 text-label">{r.pris}</span>
                </div>
              ))}
            </div>
            <Link href="/priser" className="btn-secondary">Se full prisoversikt <ChevronRight className="w-4 h-4" /></Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-white section-py">
          <div className="container-site max-w-3xl mx-auto">
            <FAQ items={faqItems} tittel={`Spørsmål om rørlegger i ${k.navn}`} />
          </div>
        </section>

        {/* CTA */}
        <section className="section-subtle section-py">
          <div className="container-site">
            <div className="cta-block">
              <h2 className="font-display font-black text-display-lg text-white mb-4">
                Finn rørlegger i {k.navn} nå
              </h2>
              <p className="text-body-lg text-white/80 mb-8 max-w-xl mx-auto">
                Gratis og uforpliktende tilbud fra autoriserte rørleggere innen 24 timer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt" className="btn bg-white text-primary-700 font-semibold px-8 py-4 rounded-8 hover:bg-primary-50 transition-all">
                  Bestill gratis tilbud
                </Link>
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
