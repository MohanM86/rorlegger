# Rørlegger.io

Norges ledende plattform for å finne autoriserte rørleggere. Bygget med Next.js 15, TypeScript og Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 15.5.12 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (navy/blue premium design system)
- **Fonts:** Syne (display), DM Sans (body), JetBrains Mono
- **Deployment:** Vercel (auto-deploy via GitHub)

## Kom i gang

```bash
npm install
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000)

## Mappestruktur

```
src/
  app/             # Next.js App Router sider
    api/lead/      # Lead API-rute
    kommune/[slug] # Kommunesider (17 sider)
    fylke/[slug]   # Fylkessider (11 sider)
    tjenester/     # Tjenestesider (8 sider)
    kalkulator/    # Kalkulatorsider
    guider/        # Guidesider (10 sider)
    faq/           # FAQ-side
    priser/        # Priser-side
    kontakt/       # Kontaktside
    om-oss/        # Om oss
    takk/          # Takkeside
    elektriker/    # Nasjonal kommuneoversikt
  components/
    layout/        # Header, Footer, StickyMobileCTA
    ui/            # Breadcrumb, FAQ
    forms/         # LeadForm (3-stegs)
    calculators/   # RorleggerKalkulator
  data/
    kommuner.ts    # 17 kommuner + 11 fylker (utvid til 356)
    tjenester.ts   # 8 tjenester med full innhold
  lib/
    utils.ts       # Hjelpefunksjoner + schema builders
  types/
    index.ts       # TypeScript-typer
  styles/
    globals.css    # Full design system
public/
  llms.txt         # AI-crawler manifest
  entity-index.json# Strukturert entitetsdata
  manifest.webmanifest # PWA manifest
```

## Miljøvariabler

Opprett `.env.local`:

```env
# E-post (Resend)
RESEND_API_KEY=re_xxxx
FROM_EMAIL=noreply@rorlegger.io
TO_EMAIL=leads@rorlegger.io

# Analyse (valgfritt)
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

## Koble til Resend for lead-e-post

Installer:
```bash
npm install resend
```

Oppdater `src/app/api/lead/route.ts`:

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// I POST-handleren:
await resend.emails.send({
  from: process.env.FROM_EMAIL!,
  to:   process.env.TO_EMAIL!,
  subject: `Ny rørlegger-lead: ${oppdragType} – ${navn} (${postnummer})`,
  html: `
    <h2>Ny forespørsel fra Rørlegger.io</h2>
    <p><strong>Navn:</strong> ${navn}</p>
    <p><strong>Telefon:</strong> ${telefon}</p>
    <p><strong>Postnummer:</strong> ${postnummer}</p>
    <p><strong>E-post:</strong> ${epost || "ikke oppgitt"}</p>
    <p><strong>Oppdrag:</strong> ${oppdragType}</p>
    <p><strong>Hastegrad:</strong> ${hastegrad}</p>
    <p><strong>Beskrivelse:</strong> ${beskrivelse || "ingen"}</p>
    <p><strong>Tidspunkt:</strong> ${tidspunkt || "fleksibel"}</p>
    <p><strong>Kilde:</strong> ${kilde}</p>
  `,
});
```

## Utvide kommunedata

`src/data/kommuner.ts` inneholder 17 kommuner. Utvid til alle 356 ved å legge til i `KOMMUNER`-arrayet:

```typescript
{ slug:"drammen", navn:"Drammen", fylkeSlug:"viken", fylkeNavn:"Viken",
  seoTitle:"Rørlegger Drammen – Finn rørlegger",
  seoDesc:"Finn autorisert rørlegger i Drammen. Gratis tilbud.",
  beskrivelse:"Drammen er..." },
```

## Legg til GA4

I `src/app/layout.tsx`, legg til i `<head>`:

```tsx
<script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`} />
<script dangerouslySetInnerHTML={{ __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
` }} />
```

## Deploy til Vercel

1. Push kode til GitHub
2. Koble GitHub-repo til Vercel
3. Sett miljøvariabler i Vercel Dashboard
4. Vercel auto-deployer ved push til `main`

Domene: `rorlegger.io` → Settings → Domains i Vercel

## SEO-strategi

- **Lokale sider:** `/kommune/[slug]` for alle 356 kommuner
- **Fylkessider:** `/fylke/[slug]` for alle 11 fylker
- **Tjenestesider:** `/tjenester/[slug]` med full FAQ og schema
- **Innholdssider:** `/guider/[slug]` for long-tail søk
- **AEO-bokser:** Short-answer boks øverst på alle landingssider
- **Schema:** LocalBusiness, Service, FAQPage, BreadcrumbList, Article
- **AI-crawler:** `llms.txt`, `entity-index.json`, åpen `robots.txt` for GPTBot/ClaudeBot/PerplexityBot

## Neste steg etter deploy

1. Koble lead API til Resend
2. Legg til alle 356 kommuner i `kommuner.ts`
3. Skriv innhold i `getGuideContent()` i `guider/[slug]/page.tsx`
4. Legg til GA4 i `layout.tsx`
5. Verifiser i Google Search Console
6. Sett opp Vercel Analytics
