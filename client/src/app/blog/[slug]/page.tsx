import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { BLOG_POSTS, type BlogCategory } from "@/lib/blog-posts";
import { COMPANY } from "@/lib/constants";
import { ArticleActions } from "./ArticleActions";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  const url = `${COMPANY.website}/blog/${post.slug}`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      siteName: COMPANY.name,
      locale: "en_CA",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [COMPANY.legalName],
      images: [{ url: `${COMPANY.website}/images/og-image.jpg` }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [`${COMPANY.website}/images/og-image.jpg`],
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const CATEGORY_STYLES: Record<BlogCategory, string> = {
  Maintenance: "bg-primary/10 text-primary-dark",
  "HRV/ERV": "bg-sky-100 text-sky-700",
  Seasonal: "bg-amber-100 text-amber-700",
  Education: "bg-indigo-100 text-indigo-700",
  Troubleshooting: "bg-rose-100 text-rose-700",
  Health: "bg-emerald-100 text-emerald-700",
  Pricing: "bg-violet-100 text-violet-700",
  Efficiency: "bg-lime-100 text-lime-800",
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = BLOG_POSTS
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.category === post.category ? -1 : 1))
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: COMPANY.legalName },
    publisher: {
      "@type": "Organization",
      name: COMPANY.legalName,
      logo: {
        "@type": "ImageObject",
        url: `${COMPANY.website}/logos/greenpump-care-logo.png`,
      },
    },
    mainEntityOfPage: `${COMPANY.website}/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <BreadcrumbSchema
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="py-16 lg:py-24">
        <div className="container max-w-[720px]">
          {/* Back to blog */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-primary transition-colors text-sm font-medium mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          {/* Category */}
          <div className="mb-5">
            <span
              className={cn(
                "inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.1em] px-3 py-1 rounded-pill",
                CATEGORY_STYLES[post.category]
              )}
            >
              {post.category}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[52px] font-semibold text-text leading-[1.1] tracking-[-0.02em] mb-5">
            {post.title}
          </h1>

          {/* Deck */}
          <p className="text-gray-500 text-lg sm:text-xl leading-relaxed mb-8">
            {post.deck}
          </p>

          {/* Meta line — dot separator */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 pb-10 mb-12 border-b border-gray-100 text-sm text-gray-500">
            <span className="font-semibold text-text">
              The GreenPump Care Team
            </span>
            <span className="text-gray-300">·</span>
            <span>{post.readTime}</span>
            <span className="text-gray-300">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>

          {/* Body */}
          <div>
            {post.body.map((section, i) => (
              <div key={i} className={i === 0 ? "" : "mt-12"}>
                <h2 className="font-heading text-2xl sm:text-[28px] font-semibold text-text tracking-[-0.01em] mb-4">
                  {section.heading}
                </h2>
                <div className="space-y-5 text-gray-700 text-[17px] leading-[1.75]">
                  {section.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>

                {/* Pullquote after first section */}
                {i === 0 && post.pullquote && (
                  <figure className="my-12 pl-6 border-l-2 border-primary">
                    <blockquote className="font-heading text-xl sm:text-2xl font-semibold text-text leading-snug tracking-tight">
                      {post.pullquote.text}
                    </blockquote>
                    <figcaption className="mt-3 text-sm text-gray-500">
                      {post.pullquote.attribution}
                    </figcaption>
                  </figure>
                )}
              </div>
            ))}

            {/* FAQs */}
            <h2 className="font-heading text-2xl sm:text-[28px] font-semibold text-text tracking-[-0.01em] mt-14 mb-6">
              Common questions
            </h2>
            <dl className="space-y-7">
              {post.faqs.map((f) => (
                <div key={f.question}>
                  <dt className="font-heading text-lg font-semibold text-text mb-2">
                    {f.question}
                  </dt>
                  <dd className="text-gray-700 text-base leading-[1.75]">
                    {f.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Inline CTA */}
          <div className="mt-16 pt-10 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-3 uppercase tracking-[0.15em] font-semibold">
              Ready for a deep clean?
            </p>
            <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-text tracking-tight mb-4 max-w-lg">
              Put this into practice in your home.
            </h3>
            <p className="text-gray-500 text-base mb-6 max-w-xl">
              Book online in two minutes. Free estimates, no obligation, evening
              and weekend slots available.
            </p>
            <ArticleActions />
          </div>

          {/* Related posts */}
          <div className="mt-20 pt-10 border-t border-gray-100">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-6">
              Keep reading
            </p>
            <ul className="divide-y divide-gray-100">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="group flex items-start justify-between gap-6 py-5 hover:text-primary transition-colors"
                  >
                    <div className="flex-1">
                      <div className="mb-1.5">
                        <span
                          className={cn(
                            "inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.1em] px-2.5 py-0.5 rounded-pill",
                            CATEGORY_STYLES[r.category]
                          )}
                        >
                          {r.category}
                        </span>
                      </div>
                      <p className="font-heading text-lg font-semibold text-text group-hover:text-primary transition-colors">
                        {r.title}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        {r.readTime} · {formatDate(r.date)}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 mt-1 shrink-0 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all articles
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
