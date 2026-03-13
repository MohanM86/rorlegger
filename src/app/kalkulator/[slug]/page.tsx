import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import Breadcrumb from "@/components/ui/Breadcrumb";
import RorleggerKalkulator from "@/components/calculators/RorleggerKalkulator";

const KALKULATORER: Record<string,{tittel:string;seoTitle:string;seoDesc:string;ingress:string}> = {
  "rorlegger-pris": {
    tittel:   "Rørlegger priskalkulator",
    seoTitle: "Rørlegger priskalkulator 2025 – Beregn pris",
    seoDesc:  "Beregn estimert pris på ditt rørleggeroppdrag. Gratis kalkulator for alle typer VVS-arbeid.",
    ingress:  "Velg type oppdrag og hastegrad for å få et prisestimat. Husk at dette er veiledende – få et nøyaktig tilbud ved å kontakte oss.",
  },
  "lekkasje-pris": {
    tittel:   "Kalkulator – Pris lekkasjereparasjon",
    seoTitle: "Hva koster lekkasjereparasjon? Kalkulator",
    seoDesc:  "Beregn pris på lekkasjereparasjon med vår gratis kalkulator. Typisk 2 500–12 000 kr avhengig av omfang.",
    ingress:  "Lekkasjer varierer mye i omfang og kostnad. Bruk kalkulatoren for et estimat, men innhent alltid skriftlig tilbud.",
  },
  "baderom-pris": {
    tittel:   "Kalkulator – Pris baderomrenovering",
    seoTitle: "Hva koster baderomrenovering? Kalkulator",
    seoDesc:  "Beregn pris på baderomrenovering. Typisk 80 000–200 000 kr. Gratis kalkulator og tilbud.",
    ingress:  "Prisen på baderomrenovering avhenger av størrelse, valg av utstyr og omfang. Kalkulatoren gir et veiledende estimat.",
  },
};

export async function generateStaticParams() {
  return Object.keys(KALKULATORER).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const k = KALKULATORER[slug];
  if (!k) return {};
  return { title: k.seoTitle, description: k.seoDesc, alternates: { canonical: `https://rorlegger.io/kalkulator/${slug}` } };
}

export default async function KalkulatorSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const k = KALKULATORER[slug];
  if (!k) notFound();

  return (
    <>
      <Header />
      <main id="main-content" className="pt-[calc(2.5rem+4rem)]">
        <section className="section-primary-gradient section-py-sm">
          <div className="container-site">
            <Breadcrumb items={[{navn:"Kalkulator",href:"/kalkulator"},{navn:k.tittel}]} />
            <div className="mt-6 text-white max-w-2xl">
              <h1 className="font-display font-black text-display-xl text-white mb-4">{k.tittel}</h1>
              <p className="text-body-lg text-white/80">{k.ingress}</p>
            </div>
          </div>
        </section>
        <section className="section-subtle section-py">
          <div className="container-site max-w-2xl mx-auto">
            <RorleggerKalkulator />
            <p className="text-body-sm text-secondary-500 text-center mt-6">
              Vil du ha nøyaktig pris?{" "}
              <Link href="/kontakt" className="text-primary-600 hover:underline font-semibold">Bestill gratis tilbud</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
