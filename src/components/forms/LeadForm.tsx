"use client";
import { useState } from "react";
import { CheckCircle, ChevronRight, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OppdragType, Hastegrad, LeadFormData } from "@/types";

const OPPDRAG_OPTIONS: { value: OppdragType; label: string; ikkon: string }[] = [
  { value:"lekkasje",         label:"Lekkasje",       ikkon:"💧" },
  { value:"baderom",          label:"Baderom",         ikkon:"🛁" },
  { value:"varmtvannsbereder",label:"Varmtvannstank",  ikkon:"🌡️" },
  { value:"kloakk",           label:"Kloakk/avløp",   ikkon:"🔧" },
  { value:"frostskade",       label:"Frostskade",      ikkon:"❄️" },
  { value:"akutt",            label:"Akutt hjelp",     ikkon:"🚨" },
  { value:"gulvvarme",        label:"Gulvvarme",       ikkon:"🌊" },
  { value:"annet",            label:"Annet",           ikkon:"⚙️" },
];

export default function LeadForm({ kilde = "ukjent", defaultOppdrag }: { kilde?: string; defaultOppdrag?: OppdragType }) {
  const [step,    setStep]    = useState<0|1|2>(0);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [data,    setData]    = useState<LeadFormData>({
    oppdragType: defaultOppdrag ?? "" as OppdragType,
    hastegrad: "planlagt", navn: "", telefon: "", postnummer: "", epost: "",
    beskrivelse: "", tidspunkt: "", samtykke: false, kilde,
  });
  const set = (f: keyof LeadFormData, v: string | boolean) => setData(d => ({ ...d, [f]: v }));

  const handleSubmit = async () => {
    if (!data.samtykke) { setError("Du må godta vilkårene."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/lead", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data) });
      if (res.ok) setSuccess(true);
      else setError("Noe gikk galt. Prøv igjen eller ring oss.");
    } catch { setError("Feil: Sjekk internett og prøv igjen."); }
    finally { setLoading(false); }
  };

  if (success) return (
    <div className="hero-form-card text-center py-10">
      <div className="w-16 h-16 rounded-full bg-success-50 border-4 border-success-500 flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-success-600" />
      </div>
      <h3 className="font-display font-bold text-heading-xl text-secondary-950 mb-2">Forespørsel mottatt!</h3>
      <p className="text-body-md text-secondary-600">En autorisert rørlegger kontakter deg innen <strong>24 timer</strong>.</p>
    </div>
  );

  const canStep1 = !!data.oppdragType;
  const canStep2 = !!data.navn && !!data.telefon && !!data.postnummer;

  return (
    <div className="bg-white rounded-20 shadow-card-xl border border-neutral-200 p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-1">Bestill gratis tilbud</h2>
        <p className="text-body-sm text-secondary-500">Autorisert rørlegger kontakter deg innen 24 timer</p>
      </div>

      {/* Step dots */}
      <div className="flex items-center gap-2 mb-6">
        {[{l:"Oppdrag"},{l:"Kontakt"},{l:"Detaljer"}].map((s,idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className={cn("step-circle text-caption", step>idx?"step-circle-done":step===idx?"step-circle-active":"step-circle-inactive")}>
              {step>idx ? <CheckCircle className="w-4 h-4" /> : idx+1}
            </div>
            <span className={cn("text-caption hidden sm:block", step>=idx?"text-secondary-700":"text-neutral-400")}>{s.l}</span>
            {idx<2 && <div className={cn("flex-1 h-px min-w-[20px]", step>idx?"bg-primary-500":"bg-neutral-200")} />}
          </div>
        ))}
      </div>

      {/* Step 0 */}
      {step===0 && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <label className="label">Type oppdrag</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {OPPDRAG_OPTIONS.map(opt => (
                <button key={opt.value} type="button" onClick={() => set("oppdragType",opt.value)}
                  className={cn("rounded-10 border-2 p-3 text-center transition-all hover:border-primary-400",
                    data.oppdragType===opt.value ? "border-primary-500 bg-primary-50" : "border-neutral-200")}>
                  <div className="text-xl mb-1">{opt.ikkon}</div>
                  <div className="text-caption font-medium text-secondary-700">{opt.label}</div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label">Hastegrad</label>
            <div className="grid grid-cols-3 gap-2.5">
              {([
                {v:"planlagt" as Hastegrad,  l:"Planlagt",      s:"Innen 2 uker"},
                {v:"innen-uken" as Hastegrad,l:"Innen uken",    s:"Innen 7 dager"},
                {v:"akutt" as Hastegrad,     l:"🚨 Akutt",      s:"Haster nå"},
              ]).map(({v,l,s}) => (
                <button key={v} type="button" onClick={() => set("hastegrad",v)}
                  className={cn("rounded-10 border-2 p-3 text-left transition-all",
                    data.hastegrad===v
                      ? v==="akutt" ? "border-error-500 bg-error-50" : "border-primary-500 bg-primary-50"
                      : "border-neutral-200 hover:border-neutral-300")}>
                  <div className="text-label font-semibold text-secondary-800">{l}</div>
                  <div className="text-caption text-secondary-500">{s}</div>
                </button>
              ))}
            </div>
          </div>
          <button type="button" disabled={!canStep1} onClick={() => setStep(1)}
            className={cn("btn-primary w-full justify-center", !canStep1 && "opacity-50 cursor-not-allowed shadow-none")}>
            Fortsett <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 1 */}
      {step===1 && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label label-required" htmlFor="navn">Navn</label>
              <input id="navn" type="text" className="input" placeholder="Ola Nordmann" value={data.navn} onChange={e=>set("navn",e.target.value)} autoComplete="name" />
            </div>
            <div>
              <label className="label label-required" htmlFor="telefon">Telefon</label>
              <input id="telefon" type="tel" className="input" placeholder="900 00 000" value={data.telefon} onChange={e=>set("telefon",e.target.value)} autoComplete="tel" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label label-required" htmlFor="postnr">Postnummer</label>
              <input id="postnr" type="text" className="input" placeholder="0150" maxLength={4} value={data.postnummer} onChange={e=>set("postnummer",e.target.value)} autoComplete="postal-code" />
            </div>
            <div>
              <label className="label" htmlFor="epost">E-post</label>
              <input id="epost" type="email" className="input" placeholder="ola@eksempel.no" value={data.epost} onChange={e=>set("epost",e.target.value)} autoComplete="email" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(0)} className="btn-ghost">← Tilbake</button>
            <button type="button" disabled={!canStep2} onClick={() => setStep(2)}
              className={cn("btn-primary flex-1 justify-center", !canStep2 && "opacity-50 cursor-not-allowed shadow-none")}>
              Fortsett <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step===2 && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <label className="label" htmlFor="beskrivelse">Beskriv oppdraget</label>
            <textarea id="beskrivelse" className="input min-h-[90px] resize-none" placeholder="Forklar kort hva som skal gjøres..." value={data.beskrivelse} onChange={e=>set("beskrivelse",e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="tidspunkt">Ønsket tidspunkt</label>
            <input id="tidspunkt" type="text" className="input" placeholder="F.eks. hverdager etter kl. 16" value={data.tidspunkt} onChange={e=>set("tidspunkt",e.target.value)} />
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <div className={cn("mt-0.5 w-5 h-5 rounded-6 border-2 flex items-center justify-center transition-all flex-shrink-0",
              data.samtykke ? "bg-primary-600 border-primary-600" : "border-neutral-300")}
              onClick={() => set("samtykke", !data.samtykke)}>
              {data.samtykke && <CheckCircle className="w-3 h-3 text-white" />}
            </div>
            <span className="text-body-sm text-secondary-600">Jeg godtar at Rørlegger.io deler min informasjon med aktuelle rørleggere for tilbud.</span>
          </label>
          {error && (
            <div className="flex items-center gap-2 bg-error-50 border border-error-200 rounded-10 p-3">
              <AlertCircle className="w-4 h-4 text-error-600 flex-shrink-0" />
              <p className="text-body-sm text-error-700">{error}</p>
            </div>
          )}
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(1)} className="btn-ghost">← Tilbake</button>
            <button type="button" disabled={loading || !data.samtykke} onClick={handleSubmit}
              className={cn("btn-primary flex-1 justify-center", (loading || !data.samtykke) && "opacity-60 cursor-not-allowed shadow-none")}>
              {loading ? "Sender..." : "Send forespørsel"}
            </button>
          </div>
          <p className="text-caption text-secondary-400 text-center">🔒 Gratis og uforpliktende. Dine data er trygge.</p>
        </div>
      )}
    </div>
  );
}
