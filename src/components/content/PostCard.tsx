import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/i18n";
import type { PostCardView } from "@/features/posts/queries";
import { routes } from "@/lib/routes";
import { Cover } from "./Cover";
import { PostMeta } from "./PostMeta";

type Props = { post: PostCardView; locale: Locale; dict: Dictionary; index?: number; priority?: boolean };

export function PostCard({ post, locale, dict, priority }: Props) {
  return (
    <Link href={routes.post(locale, post.slug)} className="journal-entry group">
      <div className="journal-entry-copy">
        <PostMeta date={post.publishedAt} minutes={post.minutes} locale={locale} dict={dict} />
        <h3>{post.title}</h3>
        {post.excerpt && <p className="journal-entry-excerpt">{post.excerpt}</p>}
      </div>
      <div className="journal-entry-image">
        <Cover src={post.coverImage} alt={post.title} priority={priority} sizes="(min-width: 640px) 136px, 80px" className="transition-transform duration-500 group-hover:scale-105" />
      </div>
      <span className="journal-entry-arrow" aria-hidden>↗</span>
    </Link>
  );
}

type GridProps = { posts: PostCardView[]; locale: Locale; dict: Dictionary; priorityCount?: number };

export function PostGrid({ posts, locale, dict, priorityCount = 0 }: GridProps) {
  if (!posts.length) return <p className="py-16 text-muted">{dict.home.empty}</p>;
  return (
    <div className="journal-entries">
      {posts.map((post, i) => <PostCard key={post.id} post={post} locale={locale} dict={dict} index={i} priority={i < priorityCount} />)}
    </div>
  );
}
