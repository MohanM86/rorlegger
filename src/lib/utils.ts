import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { FAQItem, Hastegrad } from "@/types";

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function formatPris(kr: number) { return new Intl.NumberFormat("nb-NO",{style:"currency",currency:"NOK",maximumFractionDigits:0}).format(kr); }
export function formatPrisIntervall(min: number, max: number) { return `${min.toLocaleString("nb-NO")}–${max.toLocaleString("nb-NO")} kr`; }
export function toSlug(s: string) { return s.toLowerCase().replace(/æ/g,"ae").replace(/ø/g,"o").replace(/å/g,"a").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""); }
export function hasteMultiplier(h: Hastegrad) { return h==="akutt"?1.4:h==="innen-uken"?1.15:1; }
export function formatDato(iso: string) { return new Date(iso).toLocaleDateString("nb-NO",{year:"numeric",month:"long",day:"numeric"}); }

export function buildFAQSchema(items: FAQItem[]) {
  return { "@context":"https://schema.org","@type":"FAQPage", mainEntity: items.map(i=>({ "@type":"Question", name:i.sporsmal, acceptedAnswer:{"@type":"Answer",text:i.svar} })) };
}
export function buildBreadcrumbSchema(items: {navn:string;href?:string}[]) {
  return { "@context":"https://schema.org","@type":"BreadcrumbList", itemListElement:[
    {"@type":"ListItem",position:1,name:"Hjem",item:"https://rorlegger.io"},
    ...items.map((it,idx)=>({ "@type":"ListItem",position:idx+2,name:it.navn,...(it.href?{item:`https://rorlegger.io${it.href}`}:{}) }))
  ]};
}
export function buildLocalBusinessSchema() {
  return { "@context":"https://schema.org","@type":"ProfessionalService", name:"Rørlegger.io", url:"https://rorlegger.io",
    description:"Norges ledende plattform for å finne autoriserte rørleggere i hele landet.",
    areaServed:{"@type":"Country",name:"Norway"},
    aggregateRating:{"@type":"AggregateRating",ratingValue:"4.9",reviewCount:"3400",bestRating:"5"} };
}
export function buildServiceSchema({navn,slug,beskrivelse,prisMin,prisMax}:{navn:string;slug:string;beskrivelse:string;prisMin:number;prisMax:number}) {
  return { "@context":"https://schema.org","@type":"Service", name:navn, url:`https://rorlegger.io/tjenester/${slug}`,
    description:beskrivelse, provider:{"@type":"Organization",name:"Rørlegger.io"},
    areaServed:{"@type":"Country",name:"Norway"},
    offers:{"@type":"AggregateOffer",priceCurrency:"NOK",lowPrice:prisMin,highPrice:prisMax} };
}
