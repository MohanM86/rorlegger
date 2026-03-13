import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FAQ from "@/components/ui/FAQ";

export const metadata: Metadata = {
  title: "Vanlige spørsmål om rørlegger | Rørlegger.io",
  description: "Svar på vanlige spørsmål om rørleggerarbeid, priser, forsikring og mer. Finn svaret du leter etter.",
  alternates: { canonical: "https://rorlegger.io/faq" },
};

const SEKSJONER = [
  {
    tittel:"Om Rørlegger.io",
    faq:[
      {sporsmal:"Hva er Rørlegger.io?",              svar:"Rørlegger.io er Norges ledende plattform for å finne autoriserte rørleggere. Vi kobler privatpersoner og bedrifter med sertifiserte fagfolk i hele landet."},
      {sporsmal:"Koster det noe å bruke tjenesten?", svar:"Nei, det er helt gratis for deg. Vi finansierer plattformen gjennom en formidlingsavgift fra rørleggerne."},
      {sporsmal:"Er rørleggerne autoriserte?",       svar:"Ja. Vi samarbeider kun med autoriserte rørleggere med gyldig mesterbrev og faglig ansvarlig i henhold til norsk lov."},
    ],
  },
  {
    tittel:"Priser og betaling",
    faq:[
      {sporsmal:"Hva er timepris for rørlegger?",     svar:"Dagtid (08–16) koster typisk 800–1 200 kr/t. Kveld og helg: 1 200–1 800 kr/t. Akuttutrykning: 2 500–5 000 kr ekstra."},
      {sporsmal:"Hvem betaler rørleggeren?",          svar:"Du betaler direkte til rørleggeren etter utført arbeid. Rørlegger.io tar ingen betaling fra deg."},
      {sporsmal:"Hva bør et tilbud inneholde?",      svar:"Et seriøst tilbud inkluderer arbeidskostnad, materialpriser, reisetid og mva. Be alltid om skriftlig tilbud."},
    ],
  },
  {
    tittel:"Akutt og lekkasje",
    faq:[
      {sporsmal:"Hva gjør jeg ved vannlekkasje?",    svar:"Steng stoppekranen umiddelbart. Dokumenter skaden med bilder. Ring forsikringen og bestill akutt rørlegger via Rørlegger.io."},
      {sporsmal:"Hvor raskt kan rørlegger komme?",   svar:"Vi sikter på kontakt innen 30–60 minutter for akutte oppdrag. Planlagte oppdrag: svar innen 24 timer."},
      {sporsmal:"Dekker forsikringen lekkasje?",     svar:"Ja, de fleste innbo- og husforsikringer dekker vannlekkasjer og skader. Meld fra umiddelbart etter hendelsen."},
    ],
  },
  {
    tittel:"Rørleggerarbeid og regler",
    faq:[
      {sporsmal:"Trenger jeg alltid autorisert rørlegger?", svar:"Ja. All VVS-installasjon og tilkobling til vann og avløp krever autorisert rørlegger i Norge. Ufaglært arbeid ugyldiggjør forsikringen."},
      {sporsmal:"Hva er et faglig ansvarlig?",              svar:"En person med fagbrev og erfaring som tar ansvar for at arbeidet utføres korrekt. Alle autoriserte firmaer har dette."},
      {sporsmal:"Trenger jeg byggetillatelse?",             svar:"For enkel oppussing – nei. For tilbygg, flytting av sluk eller kloakktilkobling – ta kontakt med kommunen."},
    ],
  },
];

export default function FAQPage() {
  const allFaq = SEKSJONER.flatMap(s => s.faq);
  const schema = { "@context":"https://schema.org","@type":"FAQPage",
    mainEntity: allFaq.map(i => ({"@type":"Question",name:i.sporsmal,acceptedAnswer:{"@type":"Answer",text:i.svar}}))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <main id="main-content" className="pt-[calc(2.5rem+4rem)]">
        <section className="section-primary-gradient section-py-sm">
          <div className="container-site">
            <Breadcrumb items={[{ navn:"Vanlige spørsmål" }]} />
            <div className="mt-6 text-white max-w-2xl">
              <h1 className="font-display font-black text-display-xl text-white mb-4">Vanlige spørsmål</h1>
              <p className="text-body-lg text-white/80">Svar på det folk lurer mest på om rørleggerarbeid, priser og forsikring.</p>
            </div>
          </div>
        </section>

        <section className="section-white section-py">
          <div className="container-site max-w-3xl mx-auto space-y-12">
            {SEKSJONER.map(s => (
              <div key={s.tittel}>
                <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-6">{s.tittel}</h2>
                <FAQ items={s.faq} showSchema={false} />
              </div>
            ))}
          </div>
        </section>

        <section className="section-subtle section-py">
          <div className="container-site">
            <div className="cta-block">
              <h2 className="font-display font-black text-display-lg text-white mb-4">Fant du ikke svaret?</h2>
              <p className="text-body-lg text-white/80 mb-6 max-w-xl mx-auto">Ring oss eller send en forespørsel – vi hjelper deg.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt" className="btn bg-white text-primary-700 font-semibold px-8 py-4 rounded-8 hover:bg-primary-50 transition-all">Kontakt oss</Link>
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
