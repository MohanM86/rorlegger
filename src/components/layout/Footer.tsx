import Link from "next/link";
import { Droplets, Phone, Mail, MapPin, Shield, Star, Clock } from "lucide-react";

const FOOTER_TJENESTER = [
  { href:"/tjenester/akutt-rorlegger",        label:"Akutt rørlegger" },
  { href:"/tjenester/baderom-renovering",     label:"Baderomrenovering" },
  { href:"/tjenester/varmtvannstank",         label:"Varmtvannstank" },
  { href:"/tjenester/kloakk-og-avlop",        label:"Kloakk og avløp" },
  { href:"/tjenester/frostskade-ror",         label:"Frostskade" },
  { href:"/tjenester/gulvvarme-installasjon", label:"Gulvvarme" },
  { href:"/tjenester/rorlegger-lekkasje",     label:"Lekkasjesøk" },
  { href:"/tjenester/varmepumpe-vann",        label:"Varmepumpe VVS" },
];

const FOOTER_BYER = [
  { href:"/kommune/oslo",        label:"Rørlegger Oslo" },
  { href:"/kommune/bergen",      label:"Rørlegger Bergen" },
  { href:"/kommune/trondheim",   label:"Rørlegger Trondheim" },
  { href:"/kommune/stavanger",   label:"Rørlegger Stavanger" },
  { href:"/kommune/baerum",      label:"Rørlegger Bærum" },
  { href:"/kommune/drammen",     label:"Rørlegger Drammen" },
  { href:"/fylke/vestland",      label:"Rørlegger Vestland" },
  { href:"/elektriker",          label:"Alle kommuner →" },
];

const FOOTER_INFO = [
  { href:"/om-oss",    label:"Om Rørlegger.io" },
  { href:"/priser",    label:"Priser" },
  { href:"/kalkulator",label:"Priskalkulator" },
  { href:"/guider",    label:"Guider" },
  { href:"/faq",       label:"Vanlige spørsmål" },
  { href:"/kontakt",   label:"Kontakt oss" },
];

export default function Footer() {
  return (
    <footer className="bg-secondary-950 text-neutral-300" aria-label="Sidefot">
      {/* Trust bar */}
      <div className="border-b border-secondary-800">
        <div className="container-site py-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { Icon: Shield, tekst: "Alle rørleggere er autoriserte og sertifiserte" },
              { Icon: Clock,  tekst: "Svar innen 24 timer – akutt hjelp tilgjengelig" },
              { Icon: Star,   tekst: "4,9/5 snittkarakter fra 3 400+ kunder" },
            ].map(({ Icon, tekst }) => (
              <div key={tekst} className="flex items-center gap-3 text-label text-neutral-400">
                <Icon className="w-4 h-4 text-primary-400 flex-shrink-0" aria-hidden />
                {tekst}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="container-site py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-5" aria-label="Rørlegger.io hjem">
              <div className="w-9 h-9 rounded-10 bg-primary-600 flex items-center justify-center shadow-primary">
                <Droplets className="w-5 h-5 text-white" aria-hidden />
              </div>
              <div className="leading-none">
                <span className="font-display font-black text-white text-[1.125rem]">Rørlegger</span>
                <span className="font-display font-bold text-primary-400 text-[0.625rem] tracking-widest uppercase">.io</span>
              </div>
            </Link>
            <p className="text-body-sm text-neutral-500 mb-5">
              Norges ledende plattform for autoriserte rørleggere. Vi kobler deg med riktig fagmann – raskt og gratis.
            </p>
            <div className="space-y-2.5">
              <a href="tel:+4780000000" className="flex items-center gap-2 text-label text-neutral-400 hover:text-primary-400 transition-colors">
                <Phone className="w-3.5 h-3.5" aria-hidden /> 800 00 000
              </a>
              <a href="mailto:kontakt@rorlegger.io" className="flex items-center gap-2 text-label text-neutral-400 hover:text-primary-400 transition-colors">
                <Mail className="w-3.5 h-3.5" aria-hidden /> kontakt@rorlegger.io
              </a>
              <div className="flex items-center gap-2 text-label text-neutral-400">
                <MapPin className="w-3.5 h-3.5" aria-hidden /> Hele Norge – 356 kommuner
              </div>
            </div>
          </div>

          {/* Tjenester */}
          <div>
            <h3 className="font-display font-bold text-label text-neutral-200 uppercase tracking-widest mb-4">Tjenester</h3>
            <ul className="space-y-2.5">
              {FOOTER_TJENESTER.map(({ href, label }) => (
                <li key={href}><Link href={href} className="text-body-sm text-neutral-500 hover:text-primary-400 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Byer */}
          <div>
            <h3 className="font-display font-bold text-label text-neutral-200 uppercase tracking-widest mb-4">Finn rørlegger</h3>
            <ul className="space-y-2.5">
              {FOOTER_BYER.map(({ href, label }) => (
                <li key={href}><Link href={href} className="text-body-sm text-neutral-500 hover:text-primary-400 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Info + CTA */}
          <div>
            <h3 className="font-display font-bold text-label text-neutral-200 uppercase tracking-widest mb-4">Informasjon</h3>
            <ul className="space-y-2.5 mb-6">
              {FOOTER_INFO.map(({ href, label }) => (
                <li key={href}><Link href={href} className="text-body-sm text-neutral-500 hover:text-primary-400 transition-colors">{label}</Link></li>
              ))}
            </ul>
            <Link href="/kontakt" className="btn-primary w-full justify-center text-[0.875rem]">Bestill gratis tilbud</Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-secondary-800">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-caption text-neutral-600">
          <p>© {new Date().getFullYear()} Rørlegger.io – Alle rettigheter forbeholdt</p>
          <div className="flex items-center gap-4">
            <Link href="/personvern" className="hover:text-neutral-400 transition-colors">Personvern</Link>
            <Link href="/vilkar"     className="hover:text-neutral-400 transition-colors">Vilkår</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
