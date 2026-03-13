import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Clock, Star, CheckCircle, Phone, ChevronRight, Droplets, Award, Users, MapPin, Wrench, ArrowRight, AlertTriangle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import LeadForm from "@/components/forms/LeadForm";
import FAQ from "@/components/ui/FAQ";
import { TJENESTER } from "@/data/tjenester";
import { KOMMUNER } from "@/data/kommuner";
import { buildLocalBusinessSchema } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Rørlegger.io – Finn autorisert rørlegger i hele Norge",
  description: "Norges ledende plattform for å finne autoriserte rørleggere. Lekkasjer, baderom, varmtvannstank og akutt hjelp. Gratis og uforpliktende tilbud innen 24 timer.",
  alternates: { canonical: "https://rorlegger.io" },
};

const STATS = [
  { verdi: "3 400+", label: "Fornøyde kunder" },
  { verdi: "4,9/5",  label: "Snittkarakter" },
  { verdi: "356",    label: "Kommuner dekket" },
  { verdi: "24t",    label: "Svar-garanti" },
];

const STEG = [
  { num: "01", tittel: "Beskriv oppdraget",     tekst: "Fortell oss hva som skal gjøres – lekkasje, baderom, varmtvannstank eller noe annet." },
  { num: "02", tittel: "Vi matcher deg",         tekst: "Vi finner nærmeste tilgjengelige autoriserte rørlegger i ditt område." },
  { num: "03", tittel: "Få gratis tilbud",       tekst: "Rørlegger kontakter deg innen 24 timer med konkret pris og tidspunkt." },
  { num: "04", tittel: "Jobben blir gjort",      tekst: "Autorisert fagmann utfører arbeidet og du betaler direkte til rørlegger." },
];

const TESTIMONIALS = [
  { navn:"Kari Hansen",    sted:"Oslo",      tekst:"Ringte om vannlekkasje. Rørlegger var her innen 2 timer. Utrolig rask og profesjonell service!",    rating:5, tjeneste:"Akutt lekkasje" },
  { navn:"Per Olsen",      sted:"Bergen",    tekst:"Fikk tre tilbud på baderomrenovering. Valgte det beste og er svært fornøyd med resultatet.",        rating:5, tjeneste:"Baderomrenovering" },
  { navn:"Anne Larsen",    sted:"Trondheim", tekst:"Varmtvannstanken slutta å fungere fredag. Ny ble montert mandag. Effektivt og rimelig.",            rating:5, tjeneste:"Varmtvannstank" },
  { navn:"Ole Johansen",   sted:"Stavanger", tekst:"Kloakken var tett og begynte å lukte. Rask og ryddig jobb. Vil anbefale Rørlegger.io til alle.",   rating:5, tjeneste:"Kloakk og avløp" },
];

const FAQ_ITEMS = [
  { sporsmal:"Hva koster det å bruke Rørlegger.io?",            svar:"Tjenesten er helt gratis for deg som privatperson eller bedrift. Vi formidler kontakt med autoriserte rørleggere uten ekstra kostnader." },
  { sporsmal:"Hvor raskt kan jeg få hjelp?",                    svar:"Vi sikter på kontakt innen 24 timer for planlagte oppdrag. Akutte lekkasjer og kriseoppdrag prioriteres – vi jobber for respons innen 30–60 min." },
  { sporsmal:"Er alle rørleggerne autoriserte?",                svar:"Ja. Vi samarbeider kun med autoriserte rørleggere med gyldig mesterbrev og faglig ansvarlig. Du er alltid i trygge hender." },
  { sporsmal:"Kan jeg be om tilbud fra flere rørleggere?",      svar:"Absolutt. Vi anbefaler å innhente 2–3 tilbud for å sammenligne pris og tilgjengelighet. Vår tjeneste gjør dette enkelt." },
  { sporsmal:"Hvem betaler rørleggeren?",                       svar:"Du betaler direkte til rørleggeren etter utført arbeid. Rørlegger.io tar ingen provisjon fra deg – kun en formidlingsavgift fra fagmannen." },
  { sporsmal:"Hva om jeg ikke er fornøyd?",                     svar:"Alle oppdrag er forsikret gjennom rørleggerens autorisasjon. Ta kontakt med oss om det oppstår problemer – vi hjelper med å løse det." },
];

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Rørlegger.io – Finn autorisert rørlegger i hele Norge",
    url: "https://rorlegger.io",
    description: "Norges ledende plattform for å finne autoriserte rørleggere.",
    mainEntity: buildLocalBusinessSchema(),
  };

  const topKommuner = KOMMUNER.slice(0, 12);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <main id="main-content" className="pt-[calc(2.5rem+4rem)]">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="section-primary-gradient hero-pattern section-py" aria-labelledby="hero-heading">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left: copy */}
              <div className="text-white">
                <div className="badge bg-white/10 text-white border-white/20 mb-5">
                  <Shield className="w-3.5 h-3.5" aria-hidden />
                  <span>Kun autoriserte rørleggere</span>
                </div>
                <h1 id="hero-heading" className="font-display font-black text-display-xl sm:text-[3rem] lg:text-[3.5rem] leading-[1.05] tracking-tight mb-5">
                  Finn autorisert<br />
                  <span className="text-accent-300">rørlegger</span> i<br />
                  hele Norge
                </h1>
                <p className="text-body-lg text-white/80 mb-8 max-w-lg">
                  Vi kobler deg med nærmeste sertifiserte rørlegger. Lekkasjer, baderom, varmtvannstank og alt annet VVS – gratis tilbud innen 24 timer.
                </p>

                {/* Trust pills */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {["✓ 100% gratis","✓ Autoriserte fagfolk","✓ Svar innen 24t","✓ Hele Norge"].map(t => (
                    <span key={t} className="bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-caption text-white/90">{t}</span>
                  ))}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {STATS.map(s => (
                    <div key={s.label} className="text-center">
                      <div className="font-display font-black text-[1.75rem] text-accent-300">{s.verdi}</div>
                      <div className="text-caption text-white/60">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: form */}
              <div className="lg:max-w-md w-full mx-auto lg:mx-0">
                <LeadForm kilde="hero" />
              </div>
            </div>
          </div>
        </section>

        {/* ── EMERGENCY STRIP ──────────────────────────────────── */}
        <div className="bg-error-600 text-white py-4" role="alert">
          <div className="container-site flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" aria-hidden />
              <p className="font-display font-bold text-heading-sm">Akutt vannlekkasje? Ikke vent – kontakt oss nå!</p>
            </div>
            <a href="tel:+4780000000" className="flex items-center gap-2 bg-white text-error-600 font-display font-bold px-5 py-2 rounded-8 hover:-translate-y-0.5 transition-transform">
              <Phone className="w-4 h-4" aria-hidden /> Ring 800 00 000
            </a>
          </div>
        </div>

        {/* ── TRUST BAR ────────────────────────────────────────── */}
        <section className="section-subtle section-py-sm" aria-label="Tillitsindikatorer">
          <div className="container-site">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { Icon: Shield, tittel: "Autoriserte fagfolk",  tekst: "Kun rørleggere med gyldig mesterbrev" },
                { Icon: Clock,  tittel: "Svar innen 24 timer",  tekst: "Rask respons for alle oppdragstyper" },
                { Icon: Star,   tittel: "4,9/5 karakter",       tekst: "Snitt fra 3 400+ kundevurderinger" },
                { Icon: MapPin, tittel: "Hele Norge dekket",    tekst: "356 kommuner – lokale rørleggere" },
              ].map(({ Icon, tittel, tekst }) => (
                <div key={tittel} className="trust-box">
                  <div className="trust-icon-wrap"><Icon className="w-4 h-4 text-primary-600" aria-hidden /></div>
                  <div>
                    <p className="font-display font-semibold text-label text-secondary-900">{tittel}</p>
                    <p className="text-caption text-secondary-500 mt-0.5">{tekst}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────── */}
        <section className="section-white section-py" aria-labelledby="tjenester-heading">
          <div className="container-site">
            <div className="text-center mb-12">
              <div className="badge badge-primary mb-3"><Wrench className="w-3.5 h-3.5" aria-hidden /> Tjenester</div>
              <h2 id="tjenester-heading" className="font-display font-black text-display-lg text-secondary-950 mb-4">
                Alle typer rørleggeroppdrag
              </h2>
              <p className="text-body-lg text-secondary-600 max-w-2xl mx-auto">
                Fra akutte lekkasjer til planlagte baderomrenoveringer – vi finner riktig rørlegger for jobben.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TJENESTER.map(tj => (
                <Link key={tj.slug} href={`/tjenester/${tj.slug}`}
                  className="card p-5 group flex flex-col">
                  <div className="text-3xl mb-3">{tj.ikkon}</div>
                  <h3 className="font-display font-bold text-heading-sm text-secondary-900 mb-2">{tj.kortTittel}</h3>
                  <p className="text-body-sm text-secondary-500 clamp-2 flex-1 mb-4">{tj.kortBeskrivelse}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-caption text-secondary-400">{tj.prisMin.toLocaleString("nb-NO")}–{tj.prisMax.toLocaleString("nb-NO")} kr</span>
                    <span className="text-primary-600 group-hover:translate-x-1 transition-transform text-caption font-semibold">Se mer →</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/tjenester" className="btn-secondary">Se alle tjenester <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────── */}
        <section className="section-gradient section-py" aria-labelledby="slik-fungerer-heading">
          <div className="container-site">
            <div className="text-center mb-12">
              <div className="badge badge-primary mb-3"><CheckCircle className="w-3.5 h-3.5" /> Slik fungerer det</div>
              <h2 id="slik-fungerer-heading" className="font-display font-black text-display-lg text-secondary-950 mb-4">
                Gratis tilbud på 4 enkle steg
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEG.map((s, idx) => (
                <div key={s.num} className="relative">
                  <div className="card p-6">
                    <div className="font-mono font-black text-[2.5rem] text-primary-100 mb-3">{s.num}</div>
                    <h3 className="font-display font-bold text-heading-sm text-secondary-900 mb-2">{s.tittel}</h3>
                    <p className="text-body-sm text-secondary-500">{s.tekst}</p>
                  </div>
                  {idx < 3 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3 z-10 -translate-y-1/2 w-6 h-6 items-center justify-center text-primary-400">
                      <ChevronRight className="w-5 h-5" aria-hidden />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────── */}
        <section className="section-white section-py" aria-labelledby="anmeldelser-heading">
          <div className="container-site">
            <div className="text-center mb-12">
              <div className="badge badge-primary mb-3"><Star className="w-3.5 h-3.5" /> Kundeanmeldelser</div>
              <h2 id="anmeldelser-heading" className="font-display font-black text-display-lg text-secondary-950 mb-2">
                Hva kundene sier
              </h2>
              <p className="text-body-lg text-secondary-500">4,9/5 snittkarakter fra 3 400+ kunder</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TESTIMONIALS.map(t => (
                <div key={t.navn} className="card p-5 flex flex-col">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({length:t.rating}).map((_,i)=>(
                      <Star key={i} className="w-4 h-4 fill-warning-500 text-warning-500" aria-hidden />
                    ))}
                  </div>
                  <p className="text-body-sm text-secondary-700 italic flex-1 mb-4">&ldquo;{t.tekst}&rdquo;</p>
                  <div>
                    <p className="font-display font-semibold text-label text-secondary-900">{t.navn}</p>
                    <p className="text-caption text-secondary-500">{t.sted} · {t.tjeneste}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CITY LINKS ───────────────────────────────────────── */}
        <section className="section-subtle section-py" aria-labelledby="byer-heading">
          <div className="container-site">
            <div className="text-center mb-10">
              <div className="badge badge-primary mb-3"><MapPin className="w-3.5 h-3.5" /> Finn rørlegger nær deg</div>
              <h2 id="byer-heading" className="font-display font-black text-display-lg text-secondary-950 mb-4">
                Dekker hele Norge
              </h2>
              <p className="text-body-lg text-secondary-500">Autoriserte rørleggere i alle norske kommuner</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
              {topKommuner.map(k => (
                <Link key={k.slug} href={`/kommune/${k.slug}`}
                  className="card-flat p-4 flex items-center gap-2 hover:border-primary-300 hover:bg-primary-50 transition-all group">
                  <MapPin className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" aria-hidden />
                  <span className="text-label font-semibold text-secondary-700 group-hover:text-primary-700">Rørlegger {k.navn}</span>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link href="/elektriker" className="btn-secondary">
                Se alle 356 kommuner <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section className="section-white section-py" aria-labelledby="faq-heading">
          <div className="container-site max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 id="faq-heading" className="font-display font-black text-display-lg text-secondary-950 mb-4">
                Vanlige spørsmål
              </h2>
            </div>
            <FAQ items={FAQ_ITEMS} />
            <div className="text-center mt-8">
              <Link href="/faq" className="btn-ghost">Se alle spørsmål <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </section>

        {/* ── CTA BLOCK ────────────────────────────────────────── */}
        <section className="section-subtle section-py" aria-labelledby="cta-heading">
          <div className="container-site">
            <div className="cta-block">
              <div className="w-14 h-14 rounded-20 bg-white/20 flex items-center justify-center mx-auto mb-5">
                <Droplets className="w-7 h-7 text-white" aria-hidden />
              </div>
              <h2 id="cta-heading" className="font-display font-black text-display-lg text-white mb-4">
                Klar for å finne din rørlegger?
              </h2>
              <p className="text-body-lg text-white/80 mb-8 max-w-xl mx-auto">
                Beskriv oppdraget ditt og få gratis tilbud fra autoriserte rørleggere i ditt område – innen 24 timer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt" className="btn bg-white text-primary-700 font-semibold px-8 py-4 rounded-8 hover:bg-primary-50 shadow-card-lg hover:-translate-y-0.5 transition-all">
                  Bestill gratis tilbud
                </Link>
                <a href="tel:+4780000000" className="btn border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-8 hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4" aria-hidden /> Ring 800 00 000
                </a>
              </div>
              <p className="text-white/60 text-caption mt-5">
                <Award className="w-3.5 h-3.5 inline mr-1" />
                100% gratis · Ingen bindende kontrakt · Autoriserte fagfolk
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
