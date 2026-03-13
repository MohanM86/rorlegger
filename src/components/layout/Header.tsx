"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Droplets, Phone, Menu, X, ChevronDown, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_TJENESTER = [
  { href:"/tjenester/akutt-rorlegger",        label:"🚨 Akutt rørlegger" },
  { href:"/tjenester/baderom-renovering",     label:"🛁 Baderomrenovering" },
  { href:"/tjenester/varmtvannstank",         label:"🌡️ Varmtvannstank" },
  { href:"/tjenester/kloakk-og-avlop",        label:"🔧 Kloakk og avløp" },
  { href:"/tjenester/frostskade-ror",         label:"❄️ Frostskade" },
  { href:"/tjenester/gulvvarme-installasjon", label:"🌊 Gulvvarme" },
  { href:"/tjenester/rorlegger-lekkasje",     label:"🔍 Lekkasjesøk" },
  { href:"/tjenester/varmepumpe-vann",        label:"♻️ Varmepumpe VVS" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-white/95 backdrop-blur-md shadow-card border-b border-neutral-200" : "bg-white border-b border-neutral-100"
    )}>
      {/* Emergency bar */}
      <div className="bg-error-600 text-white py-2 text-center text-caption font-semibold">
        <span className="inline-flex items-center gap-1.5">
          <AlertTriangle className="w-3 h-3" aria-hidden />
          Akutt lekkasje? Ring <a href="tel:+4780000000" className="underline font-bold">800 00 000</a> – vi hjelper deg nå
        </span>
      </div>

      <div className="container-site">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="Rørlegger.io hjem">
            <div className="w-9 h-9 rounded-10 bg-primary-600 flex items-center justify-center shadow-primary">
              <Droplets className="w-5 h-5 text-white" aria-hidden />
            </div>
            <div className="leading-none">
              <span className="font-display font-black text-secondary-950 text-[1.125rem] tracking-tight">Rørlegger</span>
              <span className="font-display font-bold text-primary-500 text-[0.625rem] tracking-widest uppercase">.io</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Primærnavigasjon">
            {[
              { href:"/tjenester",  label:"Tjenester",  drop:true  },
              { href:"/priser",     label:"Priser",     drop:false },
              { href:"/kalkulator", label:"Kalkulator", drop:false },
              { href:"/guider",     label:"Guider",     drop:false },
              { href:"/om-oss",     label:"Om oss",     drop:false },
            ].map(({ href, label, drop }) => drop ? (
              <div key={href} className="relative">
                <button className="text-label font-semibold text-secondary-600 hover:text-primary-600 transition-colors flex items-center gap-1"
                  onClick={() => setDropOpen(v => !v)} aria-expanded={dropOpen}>
                  {label}
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", dropOpen && "rotate-180")} aria-hidden />
                </button>
                {dropOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-neutral-200 rounded-12 shadow-card-xl overflow-hidden py-2">
                    {NAV_TJENESTER.map(t => (
                      <Link key={t.href} href={t.href} className="block px-4 py-2.5 text-label text-secondary-600 hover:bg-primary-50 hover:text-primary-700 transition-colors" onClick={() => setDropOpen(false)}>
                        {t.label}
                      </Link>
                    ))}
                    <div className="border-t border-neutral-100 mt-2 pt-2">
                      <Link href="/tjenester" className="block px-4 py-2.5 text-label text-primary-600 font-semibold hover:bg-primary-50 transition-colors" onClick={() => setDropOpen(false)}>
                        Se alle tjenester →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={href} href={href} className="text-label font-semibold text-secondary-600 hover:text-primary-600 transition-colors">{label}</Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+4780000000" className="flex items-center gap-2 text-label text-secondary-500 hover:text-primary-600 transition-colors">
              <Phone className="w-3.5 h-3.5" aria-hidden /> 800 00 000
            </a>
            <Link href="/kontakt" className="btn-primary text-[0.875rem] px-5 py-2.5">
              Gratis tilbud
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden p-2 text-secondary-600 hover:text-secondary-900"
            onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-100">
          <nav className="container-site py-4 space-y-1" aria-label="Mobilnavigasjon">
            {["/tjenester","Tjenester","/priser","Priser","/kalkulator","Kalkulator","/guider","Guider","/om-oss","Om oss"].reduce<{href:string;label:string}[]>((acc,_,i,arr)=>i%2===0?[...acc,{href:arr[i] as string,label:arr[i+1] as string}]:acc,[]).map(({href,label})=>(
              <Link key={href} href={href} className="block py-3 text-body-md font-display font-semibold text-secondary-800 hover:text-primary-600 border-b border-neutral-100 last:border-0 transition-colors" onClick={()=>setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Link href="/kontakt" className="btn-primary w-full justify-center" onClick={()=>setMenuOpen(false)}>Bestill gratis tilbud</Link>
              <a href="tel:+4780000000" className="btn-phone w-full justify-center" onClick={()=>setMenuOpen(false)}>
                <Phone className="w-4 h-4" aria-hidden /> Ring 800 00 000
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
