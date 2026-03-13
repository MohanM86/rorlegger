import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Phone, ArrowRight, TrendingUp } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import LeadForm from "@/components/forms/LeadForm";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FAQ from "@/components/ui/FAQ";
import { getTjeneste, TJENESTER } from "@/data/tjenester";
import { buildServiceSchema, buildFAQSchema, formatPrisIntervall } from "@/lib/utils";

export async function generateStaticParams() {
  return TJENESTER.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTjeneste(slug);
  if (!t) return {};
  return {
    title: t.seoTitle,
    description: t.seoDesc,
    alternates: { canonical: `https://rorlegger.io/tjenester/${slug}` },
    openGraph: { title: t.seoTitle, description: t.seoDesc },
  };
}

export default async function TjenestePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tj = getTjeneste(slug);
  if (!tj) notFound();

  const relaterteArr = tj.relaterteSlug.map(s => TJENESTER.find(t => t.slug === s)).filter(Boolean);

  const serviceSchema  = buildServiceSchema({ navn:tj.tittel, slug:tj.slug, beskrivelse:tj.kortBeskrivelse, prisMin:tj.prisMin, prisMax:tj.prisMax });
  const faqSchema      = buildFAQSchema(tj.faq);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main id="main-content" className="pt-[calc(2.5rem+4rem)]">

        {/* Hero */}
        <section className="section-primary-gradient section-py-sm">
          <div className="container-site">
            <Breadcrumb items={[{navn:"Tjenester",href:"/tjenester"},{navn:tj.kortTittel}]} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6 items-start">
              <div className="text-white">
                <div className="text-4xl mb-3">{tj.ikkon}</div>
                <h1 className="font-display font-black text-display-xl text-white mb-4">{tj.tittel}</h1>
                {/* AEO short-answer */}
                <div className="bg-white/10 border border-white/20 rounded-12 p-4 mb-5">
                  <p className="text-caption text-accent-300 font-semibold mb-1">📌 Kort svar</p>
                  <p className="text-body-md text-white/90">
                    {tj.kortBeskrivelse} Typisk pris: {formatPrisIntervall(tj.prisMin, tj.prisMax)} {tj.prisenhet}.
                    Gratis tilbud innen 24 timer via Rørlegger.io.
                  </p>
                </div>
                <p className="text-body-lg text-white/80">{tj.intro}</p>
              </div>
              <div><LeadForm kilde={`tjeneste-${slug}`} defaultOppdrag={tj.kalkulator as never} /></div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-white section-py">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-10">
                {/* What is this */}
                <div>
                  <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-4">Hva innebærer {tj.kortTittel.toLowerCase()}?</h2>
                  <p className="text-body-md text-secondary-600 leading-relaxed">{tj.hvaErDette}</p>
                </div>

                {/* When */}
                <div>
                  <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-4">Når trenger du {tj.kortTittel.toLowerCase()}?</h2>
                  <ul className="space-y-3">
                    {tj.naarTrengerDu.map(s => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                        <span className="text-body-md text-secondary-700">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price factors */}
                <div>
                  <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-4">
                    <TrendingUp className="w-5 h-5 inline mr-2 text-primary-500" />
                    Hva påvirker prisen?
                  </h2>
                  <ul className="space-y-3">
                    {tj.prispaavirker.map(s => (
                      <li key={s} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary-400 flex-shrink-0 mt-2" />
                        <span className="text-body-md text-secondary-600">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* FAQ */}
                <div>
                  <FAQ items={tj.faq} tittel="Vanlige spørsmål" showSchema={false} />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-5">
                <div className="price-box">
                  <p className="text-label text-secondary-500 mb-1">Typisk pris</p>
                  <div className="price-value">{formatPrisIntervall(tj.prisMin, tj.prisMax)}</div>
                  <p className="text-caption text-secondary-400 mt-1">{tj.prisenhet}</p>
                </div>
                <div className="card p-5 space-y-3">
                  <h3 className="font-display font-bold text-heading-sm text-secondary-950">Bestill tilbud</h3>
                  <Link href="/kontakt" className="btn-primary w-full justify-center">Gratis tilbud</Link>
                  <a href="tel:+4780000000" className="btn-phone w-full justify-center"><Phone className="w-4 h-4"/>Ring 800 00 000</a>
                </div>
                {relaterteArr.length > 0 && (
                  <div className="card-flat p-5">
                    <h3 className="font-display font-bold text-heading-sm text-secondary-950 mb-4">Relaterte tjenester</h3>
                    <ul className="space-y-2">
                      {relaterteArr.map(r => r && (
                        <li key={r.slug}>
                          <Link href={`/tjenester/${r.slug}`} className="flex items-center gap-2 text-body-sm text-secondary-600 hover:text-primary-600 transition-colors">
                            <span>{r.ikkon}</span>{r.kortTittel}<ArrowRight className="w-3.5 h-3.5 ml-auto"/>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-subtle section-py">
          <div className="container-site">
            <div className="cta-block">
              <h2 className="font-display font-black text-display-lg text-white mb-4">Trenger du {tj.kortTittel.toLowerCase()}?</h2>
              <p className="text-body-lg text-white/80 mb-6 max-w-xl mx-auto">Gratis tilbud innen 24 timer fra autorisert rørlegger i ditt område.</p>
              <Link href="/kontakt" className="btn bg-white text-primary-700 font-semibold px-8 py-4 rounded-8 hover:bg-primary-50 transition-all">Bestill gratis tilbud</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
