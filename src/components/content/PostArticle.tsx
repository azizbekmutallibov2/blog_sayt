import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/i18n";
import type { PostView } from "@/features/posts/queries";
import { Container } from "@/components/layout/Container";
import { ArrowLeftIcon } from "@/components/icons";
import { BlockRenderer } from "./BlockRenderer";
import { Cover } from "./Cover";
import { PostMeta } from "./PostMeta";

type Props = { post: PostView; locale: Locale; dict: Dictionary; backHref: string };

export function PostArticle({ post, locale, dict, backHref }: Props) {
  return (
    <article className="pb-10">
      <Container size="prose" className="pt-8 sm:pt-14">
        <Link href={backHref} className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-fg">
          <ArrowLeftIcon /> {dict.post.back}
        </Link>
        <p className="mt-9 text-sm font-semibold text-accent">{post.sectionTitle}</p>
        <h1 className="mt-3 break-words text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.15] tracking-[-0.055em]">{post.title}</h1>
        {post.excerpt && <p className="mt-4 text-lg leading-relaxed text-muted">{post.excerpt}</p>}
        <PostMeta date={post.publishedAt} minutes={post.minutes} locale={locale} dict={dict} className="mt-5 text-sm text-muted" />
      </Container>

      {post.coverImage && (
        // Muqova matn ustuni bilan bir xil kenglikda
        <Container size="prose" className="mt-8 sm:mt-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-surface-2">
            <Cover src={post.coverImage} alt={post.title} priority sizes="(min-width: 768px) 720px, 100vw" />
          </div>
        </Container>
      )}

      <Container size="prose" className="mt-10">
        <BlockRenderer blocks={post.blocks} />
      </Container>
    </article>
  );
}
