import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Clock, Phone, MessageSquare, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { TJENESTER } from "@/data/tjenester";

export const metadata: Metadata = {
  title: "Takk for din forespørsel | Rørlegger.io",
  description: "Vi har mottatt din forespørsel og en rørlegger vil kontakte deg innen 24 timer.",
  robots: { index: false },
};

const STEG = [
  { ikkon: Clock,          tittel: "Innen 24 timer",   tekst: "En autorisert rørlegger i ditt område kontakter deg med tilbud." },
  { ikkon: MessageSquare,  tittel: "Du mottar tilbud",  tekst: "Konkret pris og tidspunkt – alt skriftlig og uforpliktende." },
  { ikkon: CheckCircle,    tittel: "Jobben gjøres",     tekst: "Godkjenner du tilbudet, avtales tidspunkt og arbeidet utføres." },
];

export default function TakkPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-[calc(2.5rem+4rem)]">
        <section className="section-primary-gradient section-py">
          <div className="container-site text-center">
            <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" aria-label="Suksess" />
            </div>
            <h1 className="font-display font-black text-display-xl text-white mb-4">Forespørsel mottatt!</h1>
            <p className="text-body-lg text-white/80 max-w-xl mx-auto mb-8">
              Takk for din henvendelse. En autorisert rørlegger i ditt område vil kontakte deg innen <strong>24 timer</strong>.
            </p>
            <div className="badge bg-white/10 text-white border-white/20 mx-auto">
              <Phone className="w-3.5 h-3.5" />
              Haster det? Ring 800 00 000
            </div>
          </div>
        </section>

        {/* Hva skjer nå */}
        <section className="section-subtle section-py">
          <div className="container-site max-w-3xl mx-auto">
            <h2 className="font-display font-black text-display-lg text-secondary-950 text-center mb-10">Hva skjer nå?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {STEG.map(({ ikkon: Icon, tittel, tekst }, idx) => (
                <div key={tittel} className="card p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="font-mono font-black text-[1.5rem] text-primary-200 mb-2">0{idx + 1}</div>
                  <h3 className="font-display font-bold text-heading-sm text-secondary-950 mb-2">{tittel}</h3>
                  <p className="text-body-sm text-secondary-500">{tekst}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mersalg: populære tjenester */}
        <section className="section-white section-py">
          <div className="container-site">
            <h2 className="font-display font-bold text-heading-xl text-secondary-950 text-center mb-8">
              Mens du venter – nyttig å vite
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {TJENESTER.slice(0, 3).map(tj => (
                <Link key={tj.slug} href={`/tjenester/${tj.slug}`} className="card p-4 group flex items-start gap-3">
                  <span className="text-2xl">{tj.ikkon}</span>
                  <div>
                    <h3 className="font-display font-bold text-heading-sm text-secondary-900 mb-1 group-hover:text-primary-600 transition-colors">{tj.kortTittel}</h3>
                    <p className="text-body-sm text-secondary-500 clamp-2">{tj.kortBeskrivelse}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/guider" className="btn-secondary">
                Les våre guider <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
