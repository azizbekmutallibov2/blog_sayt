"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { COOKIE, LOCALES, type Locale } from "@/lib/constants";
import { swapLocale } from "@/lib/routes";
import { ChevronDownIcon } from "@/components/icons";
import { useDismiss } from "@/components/ui/useDismiss";
import { cn } from "@/lib/utils";

export type MoreItem = { href: string; label: string };

type Props = { label: string; items: MoreItem[]; locale: Locale; languageLabel: string };

function rememberLocale(l: Locale) {
  document.cookie = `${COOKIE.locale}=${l};path=/;max-age=31536000;samesite=lax`;
  document.documentElement.lang = l;
}

export function MoreMenu({ label, items, locale, languageLabel }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const close = useCallback(() => setOpen(false), []);

  useDismiss(ref, open, close);
  useEffect(close, [pathname, close]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={languageLabel}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className={cn("flex min-h-11 items-center gap-1.5 rounded-lg px-3 py-3 text-muted transition-colors hover:bg-surface-2 hover:text-fg sm:px-4", open && "bg-surface-2 text-fg")}
      >
        {label}
        <ChevronDownIcon className={cn("transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <div
          role="menu"
          className="animate-pop-in absolute right-0 top-full z-50 mt-3 w-60 max-w-[calc(100vw-2.5rem)] origin-top-right rounded-2xl border border-border bg-surface p-2 shadow-[0_16px_56px_-16px_rgba(15,23,42,0.2)]"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              role="menuitem"
              href={item.href}
              className={cn(
                "flex min-h-11 items-center justify-between rounded-lg px-3.5 py-3 text-sm font-medium transition-colors hover:bg-surface-2",
                pathname === item.href && "text-accent",
              )}
            >
              {item.label}
            </Link>
          ))}

          <div className="mx-2 my-1.5 h-px bg-border" />
          <div role="group" aria-label={languageLabel} className="flex gap-1 p-1">
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={swapLocale(pathname, l)}
                onClick={() => rememberLocale(l)}
                aria-current={l === locale ? "true" : undefined}
                className={cn(
                  "flex-1 rounded-lg py-3 text-center text-xs font-bold uppercase transition-colors",
                  l === locale ? "bg-accent text-accent-fg" : "text-muted hover:bg-surface-2 hover:text-fg",
                )}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
