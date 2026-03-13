import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import Breadcrumb from "@/components/ui/Breadcrumb";
import RorleggerKalkulator from "@/components/calculators/RorleggerKalkulator";

export const metadata: Metadata = {
  title: "Rørlegger priskalkulator 2025 | Rørlegger.io",
  description: "Beregn estimert pris på rørleggerarbeidet ditt. Gratis kalkulator for lekkasjer, baderom, varmtvannstank og mer.",
  alternates: { canonical: "https://rorlegger.io/kalkulator" },
};

export default function KalkulatorPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-[calc(2.5rem+4rem)]">
        <section className="section-primary-gradient section-py-sm">
          <div className="container-site">
            <Breadcrumb items={[{ navn:"Kalkulator" }]} />
            <div className="mt-6 text-white max-w-2xl">
              <h1 className="font-display font-black text-display-xl text-white mb-4">Rørlegger priskalkulator</h1>
              <p className="text-body-lg text-white/80">Få et prisestimat på ditt rørleggeroppdrag. Velg type og hastegrad.</p>
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
