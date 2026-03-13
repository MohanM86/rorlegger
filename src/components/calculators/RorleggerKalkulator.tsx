"use client";
import { useState } from "react";
import { Droplets, ChevronRight, Info } from "lucide-react";
import { cn, formatPrisIntervall, hasteMultiplier } from "@/lib/utils";
import Link from "next/link";
import type { Hastegrad } from "@/types";

const OPPDRAG_PRISER: Record<string,{min:number;max:number;enhet:string}> = {
  lekkasje:          {min:2500, max:12000, enhet:"per utrykning"},
  baderom:           {min:30000,max:200000,enhet:"per bad"},
  varmtvannsbereder: {min:6000, max:25000, enhet:"per installasjon"},
  kloakk:            {min:1800, max:80000, enhet:"per oppdrag"},
  frostskade:        {min:3000, max:40000, enhet:"per oppdrag"},
  gulvvarme:         {min:8000, max:60000, enhet:"per rom"},
  lekkasjesok:       {min:2000, max:15000, enhet:"per undersøkelse"},
  varmepumpe:        {min:15000,max:80000, enhet:"per installasjon"},
  annet:             {min:800,  max:4000,  enhet:"per time"},
};

const OPPDRAG_LABELS: Record<string,string> = {
  lekkasje:"Lekkasjereparasjon", baderom:"Baderomrenovering", varmtvannsbereder:"Varmtvannstank",
  kloakk:"Kloakk og avløp", frostskade:"Frostskade", gulvvarme:"Gulvvarme",
  lekkasjesok:"Lekkasjesøk", varmepumpe:"Varmepumpe VVS", annet:"Annet",
};

export default function RorleggerKalkulator({ className }: { className?: string }) {
  const [oppdrag,    setOppdrag]    = useState("");
  const [hastegrad,  setHastegrad]  = useState<Hastegrad>("planlagt");
  const [showResult, setShowResult] = useState(false);

  const base   = oppdrag ? OPPDRAG_PRISER[oppdrag] : null;
  const mult   = hasteMultiplier(hastegrad);
  const result = base ? {
    min:   Math.round(base.min * mult / 100) * 100,
    max:   Math.round(base.max * mult / 100) * 100,
    enhet: base.enhet,
  } : null;

  return (
    <div className={cn("calc-surface p-6 sm:p-8", className)}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-12 bg-primary-600 flex items-center justify-center shadow-primary">
          <Droplets className="w-5 h-5 text-white" aria-hidden />
        </div>
        <div>
          <h3 className="font-display font-bold text-heading-md text-white">Rørlegger priskalkulator</h3>
          <p className="text-caption text-neutral-400">Estimert pris på ditt oppdrag</p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-label font-semibold text-neutral-300 mb-1.5" htmlFor="kalk-oppdrag">Type oppdrag</label>
          <select id="kalk-oppdrag" value={oppdrag}
            onChange={e => { setOppdrag(e.target.value); setShowResult(false); }}
            className="w-full rounded-10 border-2 border-secondary-700 bg-secondary-900 px-4 py-3 text-body-md text-white focus:outline-none focus:border-primary-400 transition-colors appearance-none cursor-pointer">
            <option value="" disabled>Velg type oppdrag</option>
            {Object.entries(OPPDRAG_LABELS).map(([v,l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-label font-semibold text-neutral-300 mb-1.5">Hastegrad</label>
          <div className="grid grid-cols-3 gap-2.5">
            {([
              {v:"planlagt" as Hastegrad,   l:"Planlagt"},
              {v:"innen-uken" as Hastegrad, l:"Innen uken (+15%)"},
              {v:"akutt" as Hastegrad,      l:"Akutt (+40%)"},
            ]).map(({v,l}) => (
              <button key={v} type="button" onClick={() => { setHastegrad(v); setShowResult(false); }}
                className={cn("rounded-10 border-2 px-3 py-2.5 text-label transition-all",
                  hastegrad===v ? "border-primary-500 bg-primary-500/10 text-primary-400" : "border-secondary-700 text-neutral-400 hover:border-secondary-600")}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <button type="button" disabled={!oppdrag} onClick={() => setShowResult(true)}
          className={cn("btn-primary w-full justify-center", !oppdrag && "opacity-50 cursor-not-allowed shadow-none")}>
          <Droplets className="w-4 h-4" /> Beregn estimat
        </button>

        {showResult && result && (
          <div className="animate-fade-in space-y-3">
            <div className="calc-result">
              <p className="text-label text-primary-400/80 mb-1">Estimert kostnad</p>
              <div className="calc-price">{formatPrisIntervall(result.min, result.max)}</div>
              <p className="text-caption text-neutral-500 mt-1">{result.enhet} · inkl. arbeid</p>
            </div>
            {hastegrad !== "planlagt" && (
              <div className="flex items-start gap-2 bg-primary-500/10 border border-primary-500/30 rounded-10 p-3">
                <Info className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <p className="text-caption text-primary-300">Planlegg i god tid for å spare penger.</p>
              </div>
            )}
            <Link href={`/kontakt?type=${oppdrag}`} className="btn-primary w-full justify-center">
              Få gratis tilbud <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <p className="text-caption text-neutral-600 text-center">* Veiledende priser. Avhenger av din situasjon.</p>
      </div>
    </div>
  );
}
