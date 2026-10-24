import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/i18n";
import { routes } from "@/lib/routes";
import type { SectionView } from "@/features/sections/queries";
import { MoreMenu } from "./MoreMenu";
import { JournalNav, type JournalNavItem } from "./JournalNav";

type Props = { locale: Locale; dict: Dictionary; authorName: string; sections: SectionView[] };

export function Header({ locale, dict, authorName, sections }: Props) {
  const initials = authorName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("");
  const items: JournalNavItem[] = [
    { id: "notes", href: routes.home(locale), label: dict.nav.notes },
    ...sections.filter((s) => s.inNav !== "HIDDEN" && s.kind !== "BLOG").map((s) => ({
      id: s.kind === "IT" ? "career" : s.id,
      href: routes.section(locale, s.slug, s.kind),
      label: s.title,
    })),
    { id: "projects", href: routes.projects(locale), label: dict.nav.projects },
    { id: "certificates", href: routes.certificates(locale), label: dict.nav.certificates },
    { id: "about", href: routes.about(locale), label: dict.nav.about },
  ];

  return (
    <header className="journal-sidebar">
      <div className="journal-identity-row">
        <Link href={routes.home(locale)} className="journal-identity">
          <span className="journal-monogram" aria-hidden>{initials}</span>
          <span className="journal-author">{authorName}<small>{dict.nav.personal}</small></span>
        </Link>
        <div className="journal-language">
          <MoreMenu label={locale.toUpperCase()} items={[]} locale={locale} languageLabel={dict.common.language} />
        </div>
      </div>
      <JournalNav items={items} label={dict.nav.menu} home={routes.home(locale)} />
      <div className="journal-sidebar-note" aria-hidden>
        <span className="journal-note-symbol">✳</span>
        <p>{dict.home.description}</p>
      </div>
    </header>
  );
}
