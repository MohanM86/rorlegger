import type { MetadataRoute } from "next";
import { KOMMUNER, FYLKER } from "@/data/kommuner";
import { TJENESTER } from "@/data/tjenester";

const BASE = "https://rorlegger.io";
const NOW  = new Date().toISOString().split("T")[0];

const GUIDER = [
  "hva-koster-rorlegger","bytte-varmtvannstank-selv","tegn-pa-vannlekkasje",
  "forebygg-frostskader","baderom-renovering-guide","rorlegger-forsikring",
  "kloakk-problemer","gulvvarme-guide","varmepumpe-guide","rorlegger-tilbud",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,             lastModified: NOW, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/tjenester`,  lastModified: NOW, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/priser`,     lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/kalkulator`, lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/guider`,     lastModified: NOW, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/faq`,        lastModified: NOW, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/om-oss`,     lastModified: NOW, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/kontakt`,    lastModified: NOW, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/elektriker`, lastModified: NOW, changeFrequency: "monthly", priority: 0.7 },
  ];
  const tjenesterRoutes: MetadataRoute.Sitemap = TJENESTER.map(t => ({
    url: `${BASE}/tjenester/${t.slug}`, lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.85,
  }));
  const kommuneRoutes: MetadataRoute.Sitemap = KOMMUNER.map(k => ({
    url: `${BASE}/kommune/${k.slug}`, lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.75,
  }));
  const fylkeRoutes: MetadataRoute.Sitemap = FYLKER.map(f => ({
    url: `${BASE}/fylke/${f.slug}`, lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.7,
  }));
  const guideRoutes: MetadataRoute.Sitemap = GUIDER.map(g => ({
    url: `${BASE}/guider/${g}`, lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.65,
  }));
  return [...staticRoutes, ...tjenesterRoutes, ...kommuneRoutes, ...fylkeRoutes, ...guideRoutes];
}
