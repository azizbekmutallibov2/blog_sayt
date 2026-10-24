import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/i18n";
import type { PostCardView } from "@/features/posts/queries";
import { routes } from "@/lib/routes";
import { Cover } from "./Cover";
import { PostMeta } from "./PostMeta";

type Props = { posts: PostCardView[]; locale: Locale; dict: Dictionary };

/** One lead story: copy and image share a single composition. */
export function FeaturedPosts({ posts, locale, dict }: Props) {
  if (!posts.length) return null;
  return (
    <div className="journal-features">
      {posts.map((post) => (
        <Link key={post.id} href={routes.post(locale, post.slug)} className="journal-feature group">
          <div className="journal-feature-copy">
            <PostMeta date={post.publishedAt} minutes={post.minutes} locale={locale} dict={dict} className="text-xs font-medium text-muted" />
            <h3>{post.title}</h3>
            {post.excerpt && <p className="journal-feature-excerpt">{post.excerpt}</p>}
            <span className="journal-feature-cta">{dict.home.read}<span aria-hidden>↗</span></span>
          </div>
          <div className="journal-feature-image">
            <Cover src={post.coverImage} alt={post.title} priority sizes="(min-width: 1024px) 40vw, 100vw" className="transition-transform duration-500 group-hover:scale-[1.025]" />
          </div>
        </Link>
      ))}
    </div>
  );
}
