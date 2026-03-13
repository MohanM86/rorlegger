"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { FAQItem } from "@/types";
import { buildFAQSchema } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Props { items: FAQItem[]; tittel?: string; showSchema?: boolean; dark?: boolean; }

export default function FAQ({ items, tittel, showSchema = true, dark = false }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      {showSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(items)) }} />}
      {tittel && <h2 className={cn("font-display font-bold text-heading-xl mb-6", dark ? "text-white" : "text-secondary-950")}>{tittel}</h2>}
      <div className="space-y-3" role="list">
        {items.map((item, idx) => (
          <div key={idx} className={cn("rounded-12 border overflow-hidden", dark ? "bg-secondary-900 border-secondary-700" : "bg-white border-neutral-200")} role="listitem">
            <button
              className={cn("w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-display font-semibold text-heading-sm transition-colors",
                dark ? "text-neutral-100 hover:bg-secondary-800" : "text-secondary-900 hover:bg-secondary-50")}
              onClick={() => setOpen(open === idx ? null : idx)}
              aria-expanded={open === idx}
            >
              <span>{item.sporsmal}</span>
              <span className="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                {open === idx
                  ? <Minus className="w-3.5 h-3.5 text-primary-600" aria-hidden />
                  : <Plus  className="w-3.5 h-3.5 text-primary-600" aria-hidden />}
              </span>
            </button>
            {open === idx && (
              <div className={cn("px-5 pb-5 text-body-md leading-relaxed", dark ? "text-neutral-400" : "text-secondary-600")}>
                {item.svar}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
