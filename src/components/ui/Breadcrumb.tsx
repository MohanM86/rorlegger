import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import type { BreadcrumbItem } from "@/types";
import { buildBreadcrumbSchema } from "@/lib/utils";

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(items)) }} />
      <nav className="breadcrumb" aria-label="Brødsmule-navigasjon">
        <Link href="/" className="flex items-center gap-1 hover:text-secondary-600 transition-colors">
          <Home className="w-3 h-3" aria-hidden /><span>Hjem</span>
        </Link>
        {items.map((item, idx) => (
          <span key={idx} className="flex items-center gap-2">
            <ChevronRight className="w-3 h-3 text-neutral-300" aria-hidden />
            {item.href
              ? <Link href={item.href} className="hover:text-secondary-600 transition-colors">{item.navn}</Link>
              : <span className="text-secondary-600">{item.navn}</span>}
          </span>
        ))}
      </nav>
    </>
  );
}
