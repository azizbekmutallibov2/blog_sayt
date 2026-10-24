"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export type JournalNavItem = { id: string; href: string; label: string };

const paths: Record<string, string> = {
  notes: "M5 3h14v18H5zM8 8h8M8 12h8M8 16h5",
  career: "M4 7h16v13H4zM9 7V4h6v3M4 12h16M10 12v3h4v-3",
  projects: "M3 4h7l2 3h9v13H3zM8 12l-2 2 2 2M16 12l2 2-2 2",
  certificates: "M12 3l3 2 4 1v5l-2 3 1 7-6-3-6 3 1-7-2-3V6l4-1z",
  about: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M4 21v-2a8 8 0 0 1 16 0v2",
  section: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
};

export function JournalNav({ items, label, home }: { items: JournalNavItem[]; label: string; home: string }) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const nav = navRef.current;
    const active = nav?.querySelector('[aria-current="page"]');
    if (!nav || !active || nav.scrollWidth <= nav.clientWidth) return;
    const item = active.getBoundingClientRect();
    const bounds = nav.getBoundingClientRect();
    if (item.left < bounds.left || item.right > bounds.right) {
      nav.scrollBy({ left: item.left - bounds.left - 20 });
    }
  }, [pathname]);
  return (
    <nav ref={navRef} className="journal-nav no-scrollbar" aria-label={label}>
      {items.map((item) => {
        const active = item.id === "notes"
          ? pathname === home || pathname.startsWith(`${home}/posts`) || pathname.startsWith(`${home}/blog/`)
          : pathname === item.href || (item.id !== "about" && pathname.startsWith(`${item.href}/`));
        return (
          <Link key={item.id} href={item.href} className="journal-nav-link" data-active={active} aria-current={active ? "page" : undefined}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d={paths[item.id] || paths.section} />
            </svg>
            <span>{item.label}</span>
            <span className="nav-active-dot" aria-hidden />
          </Link>
        );
      })}
    </nav>
  );
}
