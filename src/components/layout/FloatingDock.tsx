"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpIcon, MoonIcon, SunIcon } from "@/components/icons";
import { applyTheme, currentTheme, type Theme } from "@/lib/theme-client";
import { cn } from "@/lib/utils";

const SECRET_CLICKS = 5;
const SECRET_WINDOW_MS = 1500; // ketma-ket bosishlar orasidagi maksimal pauza

export function FloatingDock({ themeLabel, topLabel }: { themeLabel: string; topLabel: string }) {
  const router = useRouter();
  const [theme, setTheme] = useState<Theme>("light");
  const [showTop, setShowTop] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const clicks = useRef({ count: 0, last: 0 });

  useEffect(() => {
    setTheme(currentTheme());

    // scroll listener o'rniga IntersectionObserver — asosiy oqimni band qilmaydi
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setShowTop(!entry.isIntersecting), { rootMargin: "400px 0px 0px 0px" });
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  // Yashirin eshik: theme tugmasini ketma-ket 5 marta bosish → admin panel.
  const onThemeClick = () => {
    const now = performance.now();
    const c = clicks.current;
    c.count = now - c.last < SECRET_WINDOW_MS ? c.count + 1 : 1;
    c.last = now;

    if (c.count >= SECRET_CLICKS) {
      c.count = 0;
      router.push("/admin");
      return;
    }

    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next, buttonRef.current);
  };

  const btn =
    "grid size-11 place-items-center rounded-xl border border-border bg-surface/95 text-muted shadow-card backdrop-blur-md transition-[color,opacity,border-color] duration-200 hover:border-accent hover:text-accent";

  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 flex flex-col items-center gap-2 sm:bottom-7 sm:right-7">
      <button
        type="button"
        aria-label={topLabel}
        onClick={() => window.scrollTo({ top: 0 })}
        className={cn(btn, !showTop && "pointer-events-none translate-y-3 opacity-0")}
        tabIndex={showTop ? 0 : -1}
      >
        <ArrowUpIcon />
      </button>
      <button ref={buttonRef} type="button" aria-label={themeLabel} onClick={onThemeClick} className={btn}>
        {theme === "dark" ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  );
}
