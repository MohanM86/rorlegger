import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import LeadForm from "@/components/forms/LeadForm";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FAQ from "@/components/ui/FAQ";
import { getFylke, getKommunerByFylke, getAllFylkeSlugs } from "@/data/kommuner";

export async function generateStaticParams() {
  return getAllFylkeSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const f = getFylke(slug);
  if (!f) return {};
  return {
    title: f.seoTitle,
    description: f.seoDesc,
    alternates: { canonical: `https://rorlegger.io/fylke/${slug}` },
  };
}

export default async function FylkePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = getFylke(slug);
  if (!f) notFound();
  const kommuner = getKommunerByFylke(slug);

  const faqItems = [
    { sporsmal:`Hva koster rørlegger i ${f.navn}?`,              svar:`Timepris i ${f.navn} er typisk 800–1 400 kr. Akuttutrykninger koster mer.` },
    { sporsmal:`Finnes det autoriserte rørleggere i alle kommuner i ${f.navn}?`, svar:`Via Rørlegger.io dekker vi hele ${f.navn} med autoriserte fagfolk.` },
    { sporsmal:`Hvordan bestiller jeg rørlegger i ${f.navn}?`,   svar:"Fyll ut skjemaet ovenfor eller ring oss. Du hører fra en rørlegger innen 24 timer." },
  ];

  return (
    <>
      <Header />
      <main id="main-content" className="pt-[calc(2.5rem+4rem)]">
        <section className="section-primary-gradient section-py-sm">
          <div className="container-site">
            <Breadcrumb items={[{navn:"Finn rørlegger",href:"/elektriker"},{navn:f.navn}]} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6 items-start">
              <div className="text-white">
                <h1 className="font-display font-black text-display-xl text-white mb-4">Rørlegger {f.navn}</h1>
                <div className="bg-white/10 border border-white/20 rounded-12 p-4 mb-5">
                  <p className="text-caption text-accent-300 font-semibold mb-1">📌 Rask svar</p>
                  <p className="text-body-md text-white/90">
                    Finn autorisert rørlegger i {f.navn}. Vi dekker alle {f.kommuneCount} kommuner.
                    Gratis tilbud innen 24 timer.
                  </p>
                </div>
                <p className="text-body-lg text-white/80">{f.beskrivelse}</p>
              </div>
              <div><LeadForm kilde={`fylke-${slug}`} /></div>
            </div>
          </div>
        </section>

        {kommuner.length > 0 && (
          <section className="section-white section-py">
            <div className="container-site">
              <h2 className="font-display font-black text-display-lg text-secondary-950 mb-6">
                Kommuner i {f.navn}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {kommuner.map(k => (
                  <Link key={k.slug} href={`/kommune/${k.slug}`} className="card-flat p-4 flex items-center gap-2 hover:border-primary-300 hover:bg-primary-50 transition-all group">
                    <MapPin className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" />
                    <span className="text-label font-semibold text-secondary-700 group-hover:text-primary-700">Rørlegger {k.navn}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section-subtle section-py">
          <div className="container-site max-w-3xl mx-auto">
            <FAQ items={faqItems} tittel={`Vanlige spørsmål – rørlegger i ${f.navn}`} />
          </div>
        </section>

        <section className="section-white section-py">
          <div className="container-site">
            <div className="cta-block">
              <h2 className="font-display font-black text-display-lg text-white mb-4">Bestill rørlegger i {f.navn}</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt" className="btn bg-white text-primary-700 font-semibold px-8 py-4 rounded-8 hover:bg-primary-50 transition-all">Gratis tilbud</Link>
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
