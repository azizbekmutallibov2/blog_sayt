import type { SocialLink } from "@prisma/client";
import type { Dictionary } from "@/i18n";
import { BRAND_COLOR, SocialIcon } from "@/components/icons";
import { Container } from "./Container";

type Props = { dict: Dictionary; links: SocialLink[] };

export function Footer({ dict, links }: Props) {
  return (
    <footer className="journal-footer pb-24 pt-10 sm:pb-12 sm:pt-12">
      <Container className="flex justify-center">
        {links.length > 0 && (
          <ul aria-label={dict.footer.follow} className="flex flex-wrap items-center justify-center gap-4">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  style={{
                    "--brand": BRAND_COLOR[link.platform] ?? "var(--accent)",
                    "--brand-fg": link.platform === "github" ? "var(--bg)" : "#ffffff",
                  } as React.CSSProperties}
                  className="grid size-12 place-items-center rounded-xl bg-[var(--brand)] text-[var(--brand-fg)] transition-opacity hover:opacity-80"
                >
                  <SocialIcon platform={link.platform} size={23} />
                </a>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </footer>
  );
}
