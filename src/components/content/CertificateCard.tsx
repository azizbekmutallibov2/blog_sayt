import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/i18n";
import type { CertificateView } from "@/features/certificates/queries";
import { routes } from "@/lib/routes";
import { formatDate } from "@/lib/utils";

type Props = { certificate: CertificateView; locale: Locale; t: Dictionary["certificates"]; index: number };

/** Loyiha kartasi bilan bir xil tartib va balandlik; bosilsa batafsil sahifa ochiladi. */
export function CertificateCard({ certificate: c, locale, t, index }: Props) {
  return (
    <Link
      href={routes.certificate(locale, c.slug)}
      style={{ "--i": index } as React.CSSProperties}
      className="journal-certificate group flex h-full min-w-0 flex-col"
    >
      <div className="article-cover relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-2">
        <Image
          src={c.image}
          alt={c.title}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
        />
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <h2 className="line-clamp-2 min-h-[2.75em] text-xl font-semibold leading-snug tracking-[-0.035em] transition-colors group-hover:text-accent">{c.title}</h2>
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
          <dt className="text-muted">{t.issuedBy}</dt>
          <dd className="truncate font-medium">{c.issuer}</dd>
          <dt className="text-muted">{t.issuedOn}</dt>
          <dd className="font-medium">{formatDate(c.issuedAt, locale)}</dd>
        </dl>
        <p className="mt-3 line-clamp-3 min-h-[4.875em] text-sm leading-relaxed text-muted">{c.description}</p>
      </div>
    </Link>
  );
}
