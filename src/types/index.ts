export interface Fylke {
  slug: string; navn: string; kommuneCount: number;
  beskrivelse: string; seoTitle: string; seoDesc: string;
}
export interface Kommune {
  slug: string; navn: string; fylkeSlug: string; fylkeNavn: string;
  seoTitle: string; seoDesc: string; beskrivelse: string;
}
export type ServiceKategori = "akutt" | "renovering" | "varme" | "vann" | "kontroll";
export interface Tjeneste {
  id: string; slug: string; tittel: string; kortTittel: string;
  kortBeskrivelse: string; kategori: ServiceKategori;
  prisMin: number; prisMax: number; prisenhet: string;
  intro: string; hvaErDette: string;
  naarTrengerDu: string[]; prispaavirker: string[];
  faq: FAQItem[]; seoTitle: string; seoDesc: string;
  relaterteSlug: string[]; kalkulator?: string; ikkon: string;
}
export interface TjenesteKategori { id: ServiceKategori; navn: string; }
export interface FAQItem { sporsmal: string; svar: string; }
export interface Guide { slug: string; tittel: string; kategori: string; lesetid: number; }
export type OppdragType = "lekkasje"|"kloakk"|"baderom"|"varmtvannsbereder"|"frostskade"|"gulvvarme"|"lekkasjesok"|"varmepumpe"|"generelt"|"akutt"|"annet";
export type Hastegrad = "planlagt"|"innen-uken"|"akutt";
export interface LeadFormData {
  oppdragType: OppdragType; hastegrad: Hastegrad;
  navn: string; telefon: string; postnummer: string; epost: string;
  beskrivelse: string; tidspunkt: string; samtykke: boolean; kilde: string;
}
export interface BreadcrumbItem { navn: string; href?: string; }
export interface StatItem { verdi: string; label: string; }
