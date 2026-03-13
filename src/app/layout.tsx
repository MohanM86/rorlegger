import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { buildLocalBusinessSchema } from "@/lib/utils";

const syne = Syne({
  subsets: ["latin"], variable: "--font-syne",
  weight: ["400","500","600","700","800"], display: "swap", adjustFontFallback: false,
});
const dmSans = DM_Sans({
  subsets: ["latin"], variable: "--font-dm-sans",
  weight: ["300","400","500","600","700"], display: "swap", adjustFontFallback: false,
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"], variable: "--font-jetbrains",
  weight: ["400","500","600","700"], display: "swap", adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rorlegger.io"),
  title: { default:"Rørlegger.io – Finn autorisert rørlegger i hele Norge", template:"%s | Rørlegger.io" },
  description:"Norges ledende plattform for å finne autoriserte rørleggere. Lekkasjer, baderom, varmtvannstank og akutt hjelp. Gratis tilbud innen 24 timer.",
  keywords:["rørlegger","autorisert rørlegger","rørlegger oslo","rørlegger bergen","lekkasje","akutt rørlegger","baderom renovering","varmtvannstank","finn rørlegger"],
  authors:[{name:"Rørlegger.io"}], creator:"Rørlegger.io",
  openGraph:{ type:"website", locale:"nb_NO", url:"https://rorlegger.io", siteName:"Rørlegger.io",
    title:"Rørlegger.io – Finn autorisert rørlegger i hele Norge",
    description:"Norges ledende plattform for autoriserte rørleggere. Gratis tilbud innen 24 timer." },
  twitter:{ card:"summary_large_image", title:"Rørlegger.io", description:"Gratis tilbud fra autoriserte rørleggere." },
  robots:{ index:true, follow:true, googleBot:{ index:true, follow:true,"max-image-preview":"large" } },
  alternates:{ canonical:"https://rorlegger.io" },
};

export const viewport: Viewport = {
  width:"device-width", initialScale:1,
  themeColor:[{color:"#0c2f52"}],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = buildLocalBusinessSchema();
  return (
    <html lang="nb" className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="bg-white font-sans antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-8">
          Hopp til innhold
        </a>
        {children}
      </body>
    </html>
  );
}
