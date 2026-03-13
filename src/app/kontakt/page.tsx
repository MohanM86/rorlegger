import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Shield } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import Breadcrumb from "@/components/ui/Breadcrumb";
import LeadForm from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Kontakt oss – Bestill rørlegger | Rørlegger.io",
  description: "Kontakt Rørlegger.io for å bestille autorisert rørlegger. Gratis og uforpliktende tilbud innen 24 timer.",
  alternates: { canonical: "https://rorlegger.io/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-[calc(2.5rem+4rem)]">
        <section className="section-primary-gradient section-py-sm">
          <div className="container-site">
            <Breadcrumb items={[{ navn:"Kontakt" }]} />
            <div className="mt-6 text-white max-w-2xl">
              <h1 className="font-display font-black text-display-xl text-white mb-4">Bestill rørlegger</h1>
              <p className="text-body-lg text-white/80">Fyll ut skjemaet og få gratis tilbud fra autorisert rørlegger innen 24 timer.</p>
            </div>
          </div>
        </section>

        <section className="section-subtle section-py">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Form */}
              <div className="lg:col-span-2">
                <LeadForm kilde="kontakt-side" />
              </div>

              {/* Sidebar info */}
              <div className="space-y-5">
                <div className="card p-5 space-y-4">
                  <h2 className="font-display font-bold text-heading-sm text-secondary-950">Kontaktinformasjon</h2>
                  <div className="space-y-3">
                    <a href="tel:+4780000000" className="flex items-center gap-3 text-body-sm text-secondary-700 hover:text-primary-600 transition-colors">
                      <div className="trust-icon-wrap"><Phone className="w-4 h-4 text-primary-600" /></div>
                      800 00 000
                    </a>
                    <a href="mailto:kontakt@rorlegger.io" className="flex items-center gap-3 text-body-sm text-secondary-700 hover:text-primary-600 transition-colors">
                      <div className="trust-icon-wrap"><Mail className="w-4 h-4 text-primary-600" /></div>
                      kontakt@rorlegger.io
                    </a>
                    <div className="flex items-center gap-3 text-body-sm text-secondary-700">
                      <div className="trust-icon-wrap"><MapPin className="w-4 h-4 text-primary-600" /></div>
                      Hele Norge – 356 kommuner
                    </div>
                  </div>
                </div>

                <div className="card p-5 space-y-3">
                  <h2 className="font-display font-bold text-heading-sm text-secondary-950">Åpningstider</h2>
                  {[
                    { dag:"Mandag – fredag", tid:"08:00 – 20:00" },
                    { dag:"Lørdag",          tid:"09:00 – 17:00" },
                    { dag:"Søndag",          tid:"10:00 – 16:00" },
                    { dag:"Akutt lekkasje",  tid:"24/7 hele året" },
                  ].map(r => (
                    <div key={r.dag} className="flex items-center justify-between text-body-sm">
                      <span className="text-secondary-600">{r.dag}</span>
                      <span className={`font-semibold ${r.dag==="Akutt lekkasje"?"text-error-600":"text-secondary-900"}`}>{r.tid}</span>
                    </div>
                  ))}
                </div>

                <div className="card-primary p-5 space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-primary-600" />
                    <h3 className="font-display font-bold text-heading-sm text-secondary-950">Garantier</h3>
                  </div>
                  {["Gratis tilbud – ingen skjulte kostnader","Svar innen 24 timer","Kun autoriserte fagfolk","Fornøydgaranti"].map(g => (
                    <div key={g} className="flex items-center gap-2 text-body-sm text-secondary-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                      {g}
                    </div>
                  ))}
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
