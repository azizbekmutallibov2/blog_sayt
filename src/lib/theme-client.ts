import { THEME_STORAGE_KEY } from "@/lib/constants";

export type Theme = "light" | "dark";

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/** Theme'ni qo'llaydi; imkon bo'lsa `origin` tugmasidan aylana bo'lib yoyiladi (View Transitions + clip-path). */
export function applyTheme(next: Theme, origin?: HTMLElement | null) {
  const root = document.documentElement;
  const commit = () => {
    root.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#151619" : "#f2eef7");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
  };

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduce || !origin) return commit();

  const r = origin.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  root.style.setProperty("--vt-x", `${x}px`);
  root.style.setProperty("--vt-y", `${y}px`);
  root.style.setProperty("--vt-r", `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px`);
  document.startViewTransition(commit);
}
