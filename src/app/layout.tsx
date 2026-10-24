import type { Metadata, Viewport } from "next";
import { LOCALES, THEME_STORAGE_KEY } from "@/lib/constants";
import "@fontsource-variable/manrope";
import "./globals.css";


export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: { default: "Blog", template: "%s" },
};

export const viewport: Viewport = {
  themeColor: "#f2eef7",
};

// Hydrate'dan oldin ishlaydi: theme va til <html> ga darhol qo'yiladi → miltillash yo'q.
const bootScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t!=='light'&&t!=='dark')t='light';d.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t==='dark'?'#151619':'#f2eef7';var l=location.pathname.split('/')[1];if(${JSON.stringify(
  LOCALES,
)}.indexOf(l)>-1)d.lang=l;}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
