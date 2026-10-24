import Link from "next/link";
import { toLocale, getDictionary } from "@/i18n";
import { HOME_POSTS } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { countPublishedPosts, listPublishedPosts } from "@/features/posts/queries";
import { getSectionByKind } from "@/features/sections/queries";
import { Container } from "@/components/layout/Container";
import { PostGrid } from "@/components/content/PostCard";
import { FeaturedPosts } from "@/components/content/FeaturedPosts";

export const revalidate = 3600;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = toLocale((await params).locale);
  const dict = getDictionary(locale);
  const blog = await getSectionByKind("BLOG", locale);
  const [posts, total] = blog
    ? await Promise.all([listPublishedPosts({ locale, sectionId: blog.id, take: HOME_POSTS }), countPublishedPosts(blog.id)])
    : [[], 0];

  return (
    <Container>
      <section className="journal-intro">
        <h1>{dict.home.intro}</h1>
        <div className="journal-intro-note">
          <span className="journal-intro-symbol" aria-hidden>✳</span>
          <p>{blog?.description || dict.home.description}</p>
        </div>
      </section>
      <div className="journal-section-heading">
        <h2>{dict.home.recent}</h2>
        {total > 0 && <span className="journal-count">{total}</span>}
      </div>
      <FeaturedPosts posts={posts.slice(0, 1)} locale={locale} dict={dict} />
      {posts.length > 1 && (
        <div className="mt-4 sm:mt-6">
          <PostGrid posts={posts.slice(1)} locale={locale} dict={dict} />
        </div>
      )}
      {posts.length === 0 && <PostGrid posts={[]} locale={locale} dict={dict} />}
      {total > HOME_POSTS && (
        <div className="mt-8 flex justify-start">
          <Link href={routes.posts(locale)} className="journal-button">
            {dict.home.readMore}<span aria-hidden>↗</span>
          </Link>
        </div>
      )}
    </Container>
  );
}
